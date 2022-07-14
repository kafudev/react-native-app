/**
 * @format
 */
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import {AppRegistry, NativeModules} from 'react-native';
// import App from './App';
import App from './src/nav/App';
// import App from './src/ble/ble';
import {name as appName} from './app.json';

setTimeout(() => {
  NativeModules.RNBootSplash.hide(true); // 隐藏启动屏
}, 1500);

AppRegistry.registerComponent(appName, () => App);
