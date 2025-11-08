import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';

export const setStorageValue = async (key = '', value = '') => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const setStorageObject = async (key = '', value = {}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getStorageValue = async (key = '') => {
  try {
    console.log('Getting storage value for key:', key);
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
    return null;
  }
};

export const getStorageObject = async (key = '') => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    return null;
  }
};

export const removeStorageValue = async (key = '') => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    return Promise.resolve();
  } catch (e) {
    // clear error
  }
};

/**
 * Kullanıcı adı ve şifreyi cihazın güvenli hafızasına (Keychain/Keystore) kaydeder.
 * Biyometrik koruma gibi ek seçenekler de sunulabilir.
 * @param {string} username - Kaydedilecek kullanıcı adı veya token anahtarı.
 * @param {string} password - Kaydedilecek şifre veya token.
 * @param {object} options - react-native-keychain kütüphanesinin kabul ettiği ek ayarlar.
 * @returns {Promise<boolean>} - İşlem başarılı olursa true, olmazsa false döner.
 */
export const setGenericPassword = async (
  username,
  password,
  options = {
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    authenticationPrompt: {
      title: 'Kimliğinizi Kaydedin',
      // subtitle: 'Güvenli Giriş',
      description:
        'Devam etmek için lütfen parmak izinizi veya yüzünüzü kullanın.',
      cancel: 'İptal',
    },
  },
) => {
  const biometryType = await Keychain.getSupportedBiometryType();
  if (!biometryType) {
    options = {};

    return Promise.resolve(false);
  }
  await Keychain.setGenericPassword(username, password, options);
  return Promise.resolve(true);
};

/**
 * Cihazın güvenli hafızasından kullanıcı adı ve şifreyi okur.
 * Eğer biyometrik koruma ile kaydedildiyse, bu fonksiyon parmak izi/yüz tanıma ekranını tetikler.
 * @param {object} options - react-native-keychain kütüphanesinin kabul ettiği ek ayarlar.
 * @returns {Promise<object|null>} - Başarılı olursa { username, password } nesnesini,
 * kayıt bulunamazsa veya hata olursa null döner.
 */
export const getGenericPassword = async (
  options = {
    authenticationPrompt: {
      title: 'Kimliğinizi Doğrulayın',
      // subtitle: 'Güvenli Giriş',
      description:
        'Devam etmek için lütfen parmak izinizi veya yüzünüzü kullanın.',
      cancel: 'İptal',
    },
  },
) => {
  try {
    const biometryType = await Keychain.getSupportedBiometryType();
    if (!biometryType) {
      return null;
    }

    // Bu satır biyometrik ekranı tetikler.
    const credentials = await Keychain.getGenericPassword(options);

    if (credentials) {
      console.log('[KeychainService] Credentials loaded successfully.');
      return credentials;
    } else {
      // Bu durum, daha önce hiç veri kaydedilmediğinde oluşur.
      console.log('[KeychainService] No credentials stored.');
      return null;
    }
  } catch (error) {
    // Bu blok, kullanıcı doğrulamayı iptal ettiğinde veya başarısız olduğunda çalışır.
    console.error(
      '[KeychainService] Biometric authentication failed or was cancelled. Deleting credentials for security.',
      error,
    );

    // Güvenlik için kayıtlı veriyi tamamen uçur!
    await resetGenericPassword();
    await removeStorageValue('KEYCHAIN_AUTO_LOGIN_TYPE');

    // İşlem başarısız olduğu için null dön.
    return null;
  }
};
/**
 * Cihazın güvenli hafızasındaki tüm kullanıcı adı ve şifre bilgilerini temizler.
 * Genellikle "Çıkış Yap" işlemlerinde kullanılır.
 * @returns {Promise<boolean>} - İşlem başarılı olursa true, olmazsa false döner.
 */
export const resetGenericPassword = async () => {
  try {
    const biometryType = await Keychain.getSupportedBiometryType();
    if (!biometryType) {
      return false;
    }
    await Keychain.resetGenericPassword();
    return true;
  } catch (error) {
    console.error('Error resetting keychain:', error);
    return false;
  }
};

export default {
  setStorageValue,
  setStorageObject,
  getStorageValue,
  getStorageObject,
  removeStorageValue,
  clearStorage,
  setGenericPassword,
  getGenericPassword,
  resetGenericPassword,
  keys: {
    USER: 'USER', // object olarak tutulacak
    TOKEN: 'TOKEN', // string olarak tutulacak
    REFRESH_TOKEN: 'REFRESH_TOKEN', // string olarak tutulacak
    FCM_TOKEN: 'FCM_TOKEN', // string olarak tutulacak
    BASE_URL: 'BASE_URL', // string olarak tutulacak
    OTP_TIMER_LAST_BACKGROUND_TIME_KEY: 'OTP_TIMER_LAST_BACKGROUND_TIME_KEY', // string olarak tutulacak
    OTP_TIMER_REMAINING_AT_BACKGROUND_KEY:
      'OTP_TIMER_REMAINING_AT_BACKGROUND_KEY', // string olarak tutulacak
    NOTIFICATION_PERMISSION_STATUS: 'NOTIFICATION_PERMISSION_STATUS', // string olarak tutulacak
    KEYCHAIN_AUTO_LOGIN: 'KEYCHAIN_AUTO_LOGIN', // object olarak tutulacak {username, password}
    KEYCHAIN_AUTO_LOGIN_TYPE: 'KEYCHAIN_AUTO_LOGIN_TYPE', // string olarak tutulacak {NORMAL, BIOMETRIC
  },
};
