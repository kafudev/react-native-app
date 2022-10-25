/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useContext, useEffect} from 'react';
import {
  DeviceEventEmitter,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  Modal,
  View,
  Dimensions,
} from 'react-native';

const OverlayProvider = (props = {content: null}) => {
  // console.log('OverlayProvider props', props);
  const [content, setContent] = useState(props.content);

  useEffect(() => {
    DeviceEventEmitter.addListener('overlayOpen', _props => {
      console.log('addListener overlayOpen', _props);
      setContent(_props.content);
    });
    DeviceEventEmitter.addListener('overlayClose', _props => {
      console.log('addListener overlayClose', _props);
      setContent(null);
    });
  }, []);

  return (
    <>
      {props.children}
      {content}
    </>
  );
};

export {OverlayProvider};

function Overlay(props) {
  return <>{props.children}</>;
}

Overlay.open = (content, props = {}) => {
  DeviceEventEmitter.emit('overlayOpen', {content, ...props});
  console.log('overlay open');
};
Overlay.close = () => {
  DeviceEventEmitter.emit('overlayClose', {});
  console.log('overlay close');
};
export default Overlay;
