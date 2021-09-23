/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import type {Node} from 'react';
import {name as appName} from './app.json';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  NativeModules,
  View,
  Image,
  TextInput,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import Vconsole from '@kafudev/react-native-vconsole';
import {
  useFlipper,
  useReduxDevToolsExtension,
} from '@react-navigation/devtools';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {navigationRef} from './navigate';

import Router from '../router';

const App = () => {
  setTimeout(() => {
    NativeModules.RNBootSplash.hide(true); // 隐藏启动屏
  }, 1500);

  useFlipper(navigationRef);
  useReduxDevToolsExtension(navigationRef);

  return (
    <SafeAreaProvider>
      <BottomSheetModalProvider>
        <StatusBar barStyle={'dark-content'} backgroundColor="#fff" />
        <NavigationContainer independent={true} ref={navigationRef}>
          <Router />
          {global.__DEV__ ? <Vconsole /> : null}
        </NavigationContainer>
      </BottomSheetModalProvider>
    </SafeAreaProvider>
  );
};

export default App;
