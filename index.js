import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

LogBox.ignoreLogs([
  'InteractionManager has been deprecated.',
  'InteractionManager has been deprecated and will be removed in a future release. Please refactor long tasks into smaller ones, and use `requestIdleCallback` instead.',
]);

AppRegistry.registerComponent(appName, () => App);
