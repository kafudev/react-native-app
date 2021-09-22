/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import type {Node} from 'react';
import {name as appName} from './app.json';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  NativeModules,
  View,
  Image,
  TextInput,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import RNQRGenerator from 'rn-qr-generator';

import RNFS from 'react-native-fs';
import {launchImageLibrary} from 'react-native-image-picker';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  let [img, setImg] = useState(null);

  const rr = useRef(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  setTimeout(() => {
    NativeModules.RNBootSplash.hide(true); // 隐藏启动屏
  }, 1500);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <Button
          title="显示toast"
          onPress={() => {
            NativeModules.Common &&
              NativeModules.Common.toast('显示toast内容', 0);
            // rr.current.focus();
            launchImageLibrary({includeBase64: true}, r => {
              // console.log('launchImageLibrary r', r);
              let path = '';
              let image = '';
              if (r.assets && r.assets[0].uri) {
                path = r.assets[0].uri;
                image = r.assets[0];
                RNQRGenerator.detect({
                  uri: path,
                  base64: image.base64,
                })
                  .then(res => {
                    console.log('RNQRGenerator detect result', res);
                    // 设置图片
                    RNQRGenerator.generate({
                      value: res.values[0],
                      height: 180,
                      width: 180,
                    })
                      .then(response => {
                        const {uri, width, height, base64} = response;
                        console.log('create QR code', response),
                          setImg({uri: uri});
                      })
                      .catch(error =>
                        console.log('create QR code error', error),
                      );
                  })
                  .catch(err => {
                    console.log('RNQRGenerator detect error', err);
                  });
                return;
              } else {
                return;
              }
            });
          }}
        />
        <Image
          source={img}
          style={{width: 200, height: 200, backgroundColor: '#f60'}}
        />
        <TextInput ref={rr} keyboardType={'number-pad'} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit {appName} <Text style={styles.highlight}>App.js</Text> to
            change this screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
