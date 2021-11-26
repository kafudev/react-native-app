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
  Dimensions,
} from 'react-native';

import {WebView} from 'react-native-webview';

const {width, height} = Dimensions.get('screen');
const App = ({navigation, route}) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [canGoBack, setCanGoBack] = useState(false);
  const webRef = useRef(null);

  console.log('canGoBack1', canGoBack);
  React.useLayoutEffect(() => {
    console.log('canGoBack2', canGoBack);
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            webRef.current.reload();
          }}
          title="刷新"
          color="#f60"
        />
      ),
    });
    navigation.addListener('beforeRemove', e => {
      console.log('beforeRemove canGoBack', canGoBack);
      if (!canGoBack || title == 'about:blank') {
        console.log('beforeRemove2 canGoBack', canGoBack);
        navigation.removeListener('beforeRemove');
        // navigation.goBack();
        return;
      }
      webRef.current.goBack();
      e.preventDefault();
      return;
    });

    if (title) {
      navigation.setOptions({
        title: title,
      });
    }

    return () => {
      navigation.removeListener('beforeRemove');
    };
  }, [navigation, canGoBack, title]);

  React.useLayoutEffect(() => {
    console.log('WebPage route', route);
    if (route.params && route.params.url) {
      setUrl(route.params.url);
      navigation.setOptions({
        title: route.params.url,
      });
    }
  }, [navigation, route]);

  return (
    <WebView
      ref={webRef}
      source={url ? {uri: url} : null}
      allowUniversalAccessFromFileURLs={true}
      automaticallyAdjustContentInsets={false}
      mixedContentMode="always"
      allowFileAccess={true}
      geolocationEnabled={true}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowsFullscreenVideo={true}
      decelerationRate="normal"
      thirdPartyCookiesEnabled={true}
      scalesPageToFit={false}
      useWebKit={true}
      sharedCookiesEnabled={true}
      cacheEnabled={true}
      allowsLinkPreview={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      onNavigationStateChange={navState => {
        console.log('onNavigationStateChange', navState);
        setCanGoBack(navState.canGoBack);
        setTitle(navState.title);
      }}
      onLoadProgress={e => {
        console.log('onLoadProgress', e.nativeEvent.progress, e.nativeEvent);
        if (e.nativeEvent.progress === 1) {
          setCanGoBack(e.nativeEvent.canGoBack);
          setTitle(e.nativeEvent.title);
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: '#f60',
  },
});

export default App;
