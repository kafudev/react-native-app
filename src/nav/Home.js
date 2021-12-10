/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useState, useMemo, useRef} from 'react';
import {
  ScrollView,
  View,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  DeviceEventEmitter,
  NativeModules,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import * as RootNavigation from './navigate';

import {Header} from 'react-native/Libraries/NewAppScreen';

const App = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate('Index1')}
          title="Drawer"
          color="#f60"
        />
      ),
    });
  }, [navigation]);

  // const {expand} = useBottomSheet();
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const {dismiss, dismissAll} = useBottomSheetModal();

  const [isOpen, setIsOpen] = useState(false);

  // variables
  const snapPoints = useMemo(() => ['25%', '30%', '40%'], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <Button
        onPress={() => {
          RootNavigation.navigate('Two', {
            title: 'Two页面 From Home',
          });
        }}
        title="跳转到Two"
      />
      <View style={{marginTop: 5}} />
      <Button
        onPress={() => {
          if (isOpen) {
            bottomSheetRef.current.close();
            setIsOpen(false);
          } else {
            setIsOpen(true);
          }
        }}
        title={isOpen ? '关闭sheet' : '打开sheet'}
      />
      <View style={{marginTop: 5}} />
      <Button
        onPress={() => {
          bottomSheetModalRef.current?.present();
        }}
        title={'打开sheetModal'}
      />
      <View style={{marginTop: 2}} />
      <Button
        onPress={() => {
          dismissAll();
        }}
        title={'关闭sheetModal'}
      />
      <View style={{marginTop: 2}} />
      <Button
          title="触发Event"
          onPress={() => {
            console.log('emit from packPage')
            NativeModules,Pack.emit('main', {
              from: 'pack page'
            });
          }}
        />
      {isOpen ? (
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          // detached={true}
          // bottomInset={46}
          snapPoints={snapPoints}
          style={styles.sheetContainer}
          onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheet>
      ) : null}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        // detached={true}
        // bottomInset={46}
        snapPoints={snapPoints}
        style={styles.sheetContainer}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
  },
  sheetContainer: {
    // add horizontal space
    // marginHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
