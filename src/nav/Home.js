/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {Header} from 'react-native/Libraries/NewAppScreen';

const App = ({navigation}) => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Header />
      <Button
        onPress={() => {
          navigation.push('Two');
        }}
        title="跳转到Two"
      />
    </ScrollView>
  );
};

export default App;
