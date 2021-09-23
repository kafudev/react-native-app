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

const App = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    console.log('TwoPage navigation', navigation);
    navigation.setOptions({
      title: 'My home',
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
    </ScrollView>
  );
};

export default App;
