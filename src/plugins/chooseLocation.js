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
        android: 'c52c7169e6df23490e3114330098aaac',
        ios: '186d3464209b74effa4d8391f441f14d',
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
      }}>
      <MapView
        ref={refMap}
        mapType={MapType.Standard}
        compassEnabled={false}
        zoomControlsEnabled={false}
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
