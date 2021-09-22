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
import {NavigationContainer} from '@react-navigation/native';

import Router from '../router';

const App = () => {
  setTimeout(() => {
    NativeModules.RNBootSplash.hide(true); // 隐藏启动屏
  }, 1500);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer independent={true}>
        <Router />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
