/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
} from 'react-native';

import {Header} from 'react-native/Libraries/NewAppScreen';

const App = ({navigation}) => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Header />
      <Button
        onPress={() => {
          navigation.push('Third');
        }}
        title="跳转到Third"
      />
    </ScrollView>
  );
};

export default App;
