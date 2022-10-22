/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  NativeModules,
  View,
  Dimensions,
} from 'react-native';
import Modal, {ModalProvider} from './Modal';
import ChooseLocation from './chooseLocation';
import ChoosePoi from './choosePoi';
StatusBar.setBackgroundColor('rgba(0,0,0,0.3)');
// StatusBar.setTranslucent(true);
// StatusBar.setHidden(false);

const App = () => {
  return (
    <SafeAreaView>
      <ModalProvider>
        <View style={{marginTop: 200}}>
          <Button
            title="chooseLocation"
            onPress={() => {
              console.log('chooseLocation');
              Modal.open(<ChooseLocation />, {
                enableTouchThrough: false,
                containerStyle: {
                  justifyContent: 'flex-start',
                },
              });
            }}
          />
          <View style={{marginTop: 20}}>
            <Button
              title="choosePoi"
              onPress={() => {
                console.log('choosePoi');
                Modal.open(<ChoosePoi />, {
                  enableTouchThrough: true,
                });
              }}
            />
          </View>
        </View>
      </ModalProvider>
    </SafeAreaView>
  );
};

export default App;
