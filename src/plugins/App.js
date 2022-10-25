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
import {Modal, Sheet, OverlayProvider} from 'taro-rn-plus';
// import OverlayProvider from './Overlay';
// import Modal from './Modal';
// import Sheet from './Sheet';

StatusBar.setBackgroundColor('rgba(0,0,0,0.3)');
// StatusBar.setTranslucent(true);
// StatusBar.setHidden(false);

const App = () => {
  return (
    <SafeAreaView>
      <OverlayProvider>
        <View style={{marginTop: 200}}>
          <Button
            title="chooseLocation"
            onPress={() => {
              console.log('chooseLocation');
              Modal.open(<View style={{width:200,height:200,backgroundColor:'#f60'}}/>, {
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
                Modal.open(<View  style={{width:200,height:200,backgroundColor:'blue'}}/>, {
                  enableTouchThrough: true,
                });
              }}
            />
          </View>
          <View style={{marginTop: 20}}>
            <Button
              title="sheet"
              onPress={() => {
                console.log('sheet');
                Sheet.open(<View />, {
                  enableTouchThrough: true,
                });
              }}
            />
          </View>
        </View>
      </OverlayProvider>
    </SafeAreaView>
  );
};

export default App;
