/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  NativeModules,
  Text,
  Button,
} from 'react-native';

import {Header} from 'react-native/Libraries/NewAppScreen';

const App = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    console.log('TwoPage navigation', navigation);
    navigation.setOptions({
      title: 'My info',
      headerRight: () => (
        <Button
          onPress={() => navigation.push('Index2')}
          title="TopTab"
          color="#f60"
        />
      ),
    });
  }, [navigation]);

  React.useLayoutEffect(() => {
    console.log('TwoPage route', route);
    if (route.params && route.params.title) {
      navigation.setOptions({
        title: route.params.title,
      });
    }
  }, [navigation, route]);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Header />
      <Button
        onPress={() => {
          navigation.push('Third');
        }}
        title="跳转到Third"
      />
      <View style={{marginTop: 5}} />
      <Button
        onPress={() => {
          NativeModules.Common.toast('android toast', 1000);
        }}
        title={'显示toast'}
      />
      <View style={{marginTop: 5}} />
      <Button
        onPress={() => {
          NativeModules.Common.showDevMenu();
        }}
        title={'打开开发目录'}
      />
      <View style={{marginTop: 5}} />
      <Button
        onPress={() => {
          NativeModules.Common.reloadJs();
        }}
        title={'重新加载JS'}
      />
      <View style={{marginTop: 5}} />
      <Button
        onPress={() => {
          navigation.navigate('Web', {
            url: 'https://www.baidu.com/',
          });
        }}
        title={'打开webview'}
      />
    </ScrollView>
  );
};

export default App;
