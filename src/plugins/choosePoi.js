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
  View,
  StatusBar,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
import Modal from './Modal';

const App = ({navigation}) => {
  return (
    <View>
      <Button
        onPress={() => {
          // navigation.navigate('Index');
          // alert('choosePoi');
          Modal.close();
        }}
        title="choosePoi"
      />
    </View>
  );
};

export default App;
