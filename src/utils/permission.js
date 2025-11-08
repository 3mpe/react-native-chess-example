import {Platform} from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

// kamere, konum, depolama, mikrofon, telefon, kişiler, takvim, sms, galeri, bildirim, writeExternalStorage

export const Permissions = {
  CAMERA: 'camera',
  LOCATION: 'location',
  STORAGE: 'storage',
  MICROPHONE: 'microphone',
  PHONE: 'phone',
  CONTACTS: 'contacts',
  CALENDAR: 'calendar',
  SMS: 'sms',
  GALLERY: 'gallery',
  NOTIFICATION: 'notification',
  WRITE_EXTERNAL_STORAGE: 'writeExternalStorage',
};

// Result sabitleri
export const PermissionResults = {
  UNAVAILABLE: RESULTS.UNAVAILABLE,
  DENIED: RESULTS.DENIED,
  LIMITED: RESULTS.LIMITED,
  GRANTED: RESULTS.GRANTED,
  BLOCKED: RESULTS.BLOCKED,
};

// İzin eşlemeleri
const permissionMapping = {
  camera: {
    android: PERMISSIONS.ANDROID.CAMERA,
    ios: PERMISSIONS.IOS.CAMERA,
  },
  location: {
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  },
  storage: {
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  },
  microphone: {
    android: PERMISSIONS.ANDROID.RECORD_AUDIO,
    ios: PERMISSIONS.IOS.MICROPHONE,
  },
  phone: {
    android: PERMISSIONS.ANDROID.READ_PHONE_STATE,
    ios: null, // iOS için eşdeğer izin yok
  },
  contacts: {
    android: PERMISSIONS.ANDROID.READ_CONTACTS,
    ios: PERMISSIONS.IOS.CONTACTS,
  },
  calendar: {
    android: PERMISSIONS.ANDROID.READ_CALENDAR,
    ios: PERMISSIONS.IOS.CALENDARS,
  },
  sms: {
    android: PERMISSIONS.ANDROID.READ_SMS,
    ios: null, // iOS için eşdeğer izin yok
  },
  gallery: {
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  },
  notification: {
    android: PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
    ios: PERMISSIONS.IOS.NOTIFICATIONS,
  },
  writeExternalStorage: {
    android: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
  },
  // Diğer izinler burada
};

export const checkNotificationsPermission = async () => {
  const notificationStatus = await checkNotifications();

  switch (notificationStatus.status) {
    case RESULTS.DENIED:
      const requestResult = await requestNotifications(['alert', 'sound']);
      return requestResult.status;
    case RESULTS.GRANTED:
    case RESULTS.UNAVAILABLE:
    case RESULTS.BLOCKED:
    default:
      return notificationStatus.status;
  }
};

export const checkAndRequestPermission = async permission => {
  const platform = Platform.OS;

  if (permission === Permissions.NOTIFICATION) {
    return await checkNotificationsPermission();
  }

  const mappedPermission = permissionMapping[permission][platform];
  if (!mappedPermission) {
    throw new Error('Invalid permission');
  }

  const result = await check(mappedPermission);

  switch (result) {
    case RESULTS.DENIED:
      // Kullanıcı izni henüz vermemiş, izin istenebilir
      const requestResult = await request(mappedPermission);
      return requestResult;
    case RESULTS.UNAVAILABLE:
    case RESULTS.LIMITED:
    case RESULTS.GRANTED:
    case RESULTS.BLOCKED:
    default:
      return result;
  }
};

export const checkAndRequestMultiplePermissions = async permissions => {
  const permissionResults = {};
  for (const permission of permissions) {
    permissionResults[permission] = await checkAndRequestPermission(permission);
  }
  return permissionResults;
};

export const canUse = permissionResult => {
  return Permissions.can;
};

export default {
  Permissions,
  PermissionResults,
  checkAndRequestPermission,
  checkAndRequestMultiplePermissions,
};
