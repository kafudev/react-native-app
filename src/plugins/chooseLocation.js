/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  Platform,
  Dimensions,
} from 'react-native';
import {AMapSdk, MapView, MapType} from 'react-native-amap3d';

import Modal from './Modal';

const {width, height} = Dimensions.get('screen');
const App = ({navigation}) => {
  const refMap = useRef(null);
  useEffect(() => {
    AMapSdk.init(
      Platform.select({
        android: '29882043e0d079ba281d6444c8c57551',
        ios: 'ed9779f4378a3e32bf282934ea92c20e',
      }),
    );
    AMapSdk.getVersion().then(version => {
      console.log('AMapSdk', version);
    });
    return () => {
      refMap.current = null;
    };
  }, []);

  return (
    <View
      style={{
        width: width,
        height: height / 2,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginTop: 44,
      }}>
      <MapView
        ref={refMap}
        mapType={MapType.Standard}
        compassEnabled={false}
        zoomControlsEnabled={true}
        myLocationButtonEnabled={true}
        rotateGesturesEnabled={false}
        tiltGesturesEnabled={false}
        initialCameraPosition={{
          // target: {
          //   latitude: 39.91095,
          //   longitude: 116.37296,
          // },
          zoom: 14,
        }}
        onLoad={() => console.log('onLoad')}
        onPress={e => console.log('onPress', e)}
        // onCameraIdle={e => console.log('onCameraIdle', e)}
        onLocation={e => console.log('onLocation', e)}
      />
      <Button title="关闭地图选择" onPress={() => Modal.close()} />
    </View>
  );
};

export default App;
