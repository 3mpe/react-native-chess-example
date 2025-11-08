/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// react-navigation'dan gelen InteractionManager'ın kullanımdan kaldırıldığına dair uyarıyı gizle.
// Bu, kütüphanenin gelecekteki bir sürümünde düzeltilecektir.
LogBox.ignoreLogs([
  // Bu uyarının farklı versiyonlarını gizlemek için iki farklı string ekliyoruz.
  'InteractionManager has been deprecated.',
  'InteractionManager has been deprecated and will be removed in a future release. Please refactor long tasks into smaller ones, and use `requestIdleCallback` instead.',
]);

AppRegistry.registerComponent(appName, () => App);
