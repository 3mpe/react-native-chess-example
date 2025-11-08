export { ScaledSheet, s, vs } from 'react-native-size-matters';
export {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
export {
  NavigationContainer,
  useNavigation,
  useRoute,
  createNavigationContainerRef,
  useFocusEffect,
} from '@react-navigation/native';
export { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
export * from '@react-navigation/elements';
export { RoutesNames } from '../navigation/routes';
export { default as SplashScreen } from 'react-native-splash-screen';
export {
  check as permissionChecko,
  request as PRermissionRequest,
  RESULTS,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
export { default as QRCode } from 'react-native-qrcode-svg';
export { default as Camera } from 'react-native-camera';
export { default as DocumentScanner } from 'react-native-document-scanner-plugin';
export { default as ImagePicker } from 'react-native-image-crop-picker'; // Resim seçme ve düzenleme için eklendi.
export { default as AsyncStorage } from '@react-native-async-storage/async-storage'; // Uygulama verilerini saklamak için eklendi.
export { default as NetInfo } from '@react-native-community/netinfo'; // İnternet bağlantısını kontrol etmek için eklendi.
export { WebView } from 'react-native-webview'; // Web sayfası açmak için eklendi.
export { default as Modal } from 'react-native-modal'; // Modal ekranlar için eklendi.
export { default as Svg } from 'react-native-svg'; // SVG dosyalarını kullanmak için eklendi.
export {
  FormProvider,
  useForm,
  Controller as FormController,
  useFormContext,
  useController,
} from 'react-hook-form'; // Form işlemleri için eklendi.
export { default as useValidation } from './useValidation'; // form işlemleri için eklendi.
export { default as Swiper } from 'react-native-swiper';
export {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
export { Swipeable } from 'react-native-gesture-handler';
export { default as messaging } from '@react-native-firebase/messaging';
export {
  Dropdown,
  MultiSelect,
  SelectCountry,
  IDropdownRef,
  IMultiSelectRef,
} from 'react-native-element-dropdown';
export { default as Pdf } from 'react-native-pdf';
export { default as VersionCheck } from 'react-native-version-check';

export {
  navigate,
  navigateRest,
  getCurrentRouteName,
} from './../navigation/navigationHelper';
export { default as i18n } from './i18n';
export { default as ImageAssets, checkImageUrl } from './imageAssets';
export { default as themeToken } from './themeToken';
export { default as EnvConfig } from './envConfig';
export { default as Storage } from './storage';
export {
  default as Permission,
  checkAndRequestPermission,
  checkAndRequestMultiplePermissions,
  Permissions,
  PermissionResults,
} from './permission';
export { errorHandler } from './service-handler';
export {
  calculateTimeDifference,
  dateFormat,
  nowDate,
  nowDateExtendedWithDay,
} from './dateHelper';
export { default as linkHelper } from './linkHelper';
export { default as format } from './format';
export { default as debounce } from './debounce';
export { default as AndroidOtpListener } from './AndroidOtpListener';
export { default as notificationHelper } from './notificationHelper';
export { default as Notifee } from '@notifee/react-native';
