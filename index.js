/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, NativeModules} from 'react-native';
// import App from './App';
// import App from './src/nav/App';
// import App from './src/ble/ble';
// import App from './src/expo/AppLoad';
import App from './src/plugins/App';
import {name as appName} from './app.json';

NativeModules.RNBootSplash.hide(true); // 隐藏启动屏
setTimeout(() => {
  NativeModules.RNBootSplash.hide(true); // 隐藏启动屏
}, 1500);

AppRegistry.registerComponent(appName, () => App);
