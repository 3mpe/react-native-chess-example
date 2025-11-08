import {
  Permissions,
  PermissionResults,
  checkAndRequestPermission,
  messaging,
  Storage,
  navigate,
  RoutesNames,
  Notifee,
} from './';

export const initNotification = async () => {
  const result = await checkAndRequestPermission(Permissions.NOTIFICATION);

  if (result === PermissionResults.GRANTED) {
    getFCMToken(); // FCM token'ını al ve Storage'a kaydet
    onMessageReceived(); // Gelen mesajları dinle
    // await messaging().removeAllDeliveredNotifications(); // Tüm teslim edilen bildirimleri kaldır
  }
  // else if (result === PermissionResults.DENIED) {
  //   console.log('Bildirim izni reddedildi.');
  // } else {
  //   console.log('Bildirim izni durumu: diğer', result);

  //   if (result === PermissionResults.BLOCKED) {
  //     console.log('Bildirim izni engellendi.');
  //   } else if (result === PermissionResults.LIMITED) {
  //     console.log('Bildirim izni sınırlı.');
  //   } else if (result === PermissionResults.UNAVAILABLE) {
  //     console.log('Bu özellik cihazda kullanılamıyor.');
  //   } else {
  //     // Henüz kullanıcı izni vermedi, ve popup ekranda gösterildi
  //     console.log('Bilinmeyen bildirim izni durumu.');
  //   }
  // }
  return result;
};

const getFCMToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      await Storage.setStorageValue(Storage.keys.FCM_TOKEN, fcmToken);
      return fcmToken;
    }
  } catch (error) {
    console.error('FCM Token alınamadı:', error);
  }
};

const onMessageReceived = () => {
  // 1. Uygulama kapalıyken gelen bildirimi yakala (Killed State)
  messaging().getInitialNotification().then(handleRedirectNotification);

  // 2. Uygulama açıkken gelen bildirimler (Foreground State)
  messaging().onMessage(async remoteMessage => {
    console.log('FCM Mesajı alındı (Foreground): ', remoteMessage);
    // Uygulama açıkken Notify geldiginde ekranda gostermek icin
    await onDisplayNotification(remoteMessage);
  });

  // 3. Arka planda iken bildirime tıklanınca (Background State)
  messaging().onNotificationOpenedApp(handleRedirectNotification);
};

const handleRedirectNotification = async remoteMessage => {
  // remoteMessage null veya undefined ise hiçbir şey yapma
  if (!remoteMessage) {
    return;
  }

  if (remoteMessage?.data?.redirectLink !== 'true') return;

  if (remoteMessage?.data?.activityGuid) {
    navigate(RoutesNames.ActivityDetail, {
      activity: {activityGuid: remoteMessage.data.activityGuid},
    });
  } else if (remoteMessage?.data?.routesName) {
    navigate(remoteMessage.data.RoutesName, remoteMessage.data);
  } else {
    navigate(RoutesNames.Notifications);
  }
};

const clearNotifications = async () => {
  await messaging().removeAllDeliveredNotifications();
};

// Android 8.0+ için bir bildirim kanalı oluşturmak zorunludur.
async function createNotificationChannel() {
  const channelId = await Notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: 4, //AndroidImportance.HIGH, // Bildirimin sesli ve pop-up olarak görünmesini sağlar
  });

  return channelId;
}

// Gelen Firebase mesajını Notifee ile ekranda gösterecek fonksiyon
async function onDisplayNotification(remoteMessage) {
  const channelId = await createNotificationChannel();

  await Notifee.displayNotification({
    title: remoteMessage.notification?.title,
    body: remoteMessage.notification?.body,
    data: remoteMessage.data, // Firebase'den gelen datayı Notifee bildirimine ekliyoruz
    android: {
      channelId,
      // İsteğe bağlı: Küçük bir ikon ekleyebilirsiniz (android/app/src/main/res/mipmap... içinde olmalı)
      // smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default', // Tıklanma eylemi için bir ID
      },
    },
  });
}

export default {
  initNotification,
  getFCMToken,
  handleRedirectNotification,
  clearNotifications,
};
