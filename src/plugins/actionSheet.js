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
import Overlay from './Overlay';

const App = ({navigation}) => {
  return (
    <View>
      <Text>弹窗主体内容</Text>
      <Text>-----</Text>
      <Button
        onPress={() => {
          Overlay.close();
        }}
        title="关闭弹窗"
      />
    </View>
  );
};

export default App;
