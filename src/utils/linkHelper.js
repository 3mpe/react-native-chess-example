import {Alert, Linking} from 'react-native';

const openWhatsApp = phoneNumber => {
  let url = `whatsapp://send?phone=${phoneNumber}`;

  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        Alert.alert(
          'Uyarı',
          'Whatsapp uygulaması yüklü değil. Uygulamayı yüklereyek devam edebilirsiniz.',
        );
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.error('An error occurred', err));
};

const openLink = url => {
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        Alert.alert('Uyarı', 'Bağlantı açılamıyor: ' + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.error('An error occurred', err));
};

const openMail = email => {
  const url = `mailto:${email}`;
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        Alert.alert('Uyarı', 'E-posta uygulaması açılamıyor: ' + url);
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.error('An error occurred', err));
};

export default {
  openWhatsApp,
  openLink,
  openMail,
};
