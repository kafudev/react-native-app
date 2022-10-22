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

const {width, height} = Dimensions.get('screen');

import {ModalContext} from './modalContext';

const ModalProvider = (props = {show: false, content: null}) => {
  // console.log('ModalProvider props', props);
  const [show, setShow] = useState(false);
  const [content, setContent] = useState(props.content);
  const [modalProps, setModalProps] = useState({...props});

  useEffect(() => {
    DeviceEventEmitter.addListener('modalOpen', _props => {
      console.log('addListener modalOpen', _props);
      setContent(_props.content);
      setShow(_props.show);
      setModalProps(_props);
    });
    DeviceEventEmitter.addListener('modalClose', _props => {
      console.log('addListener modalClose', _props);
      if (_props) {
        setModalProps(_props);
      }
      setShow(false);
      setContent(null);
    });
  }, []);

  return (
    <ModalContext.Provider value={{...props}}>
      {props.children}
      <BaseModal
        opacity={0.35}
        enableTouchThrough={true}
        pressBehavior="close"
        setShow={() => {
          setShow(false);
        }}
        {...modalProps}
        show={show}
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyle={{
          ...modalProps.containerStyle,
        }}>
        {content}
      </BaseModal>
    </ModalContext.Provider>
  );
};

export {ModalContext, ModalProvider};

const BaseModal = (
  props = {
    opacity: 0.35,
    show: false,
    setShow: () => {},
    enableTouchThrough: false,
    pressBehavior: 'none', // 'none' | 'close' | 'through' | () => {}
  },
) => {
  // const context = useContext(ModalContext);
  // console.log('BaseModal context', context);

  const [target, setTarget] = useState(null);
  const [isNow, setIsNow] = useState(false);
  const [modalProps, setModalProps] = useState({...props});

  useEffect(() => {
    console.log('useEffect props', props);
    setModalProps({...props});
  }, [props]);

  return (
    <Modal
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade"
      presentationStyle="overFullScreen"
      {...modalProps}
      visible={modalProps.show}
      onRequestClose={() => {
        if (modalProps.onRequestClose) {
          return modalProps.onRequestClose();
        }
        modalProps.setShow(false);
      }}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          backgroundColor: `rgba(0,0,0,${modalProps.opacity})`,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          ...(modalProps.containerStyle || {}),
        }}
        importantForAccessibility="no-hide-descendants"
        onStartShouldSetResponder={() => {
          if (modalProps.enableTouchThrough) {
            return true;
          }
          return false;
        }}
        onStartShouldSetResponderCapture={() => {
          return false;
        }}
        onMoveShouldSetResponder={() => {
          return false;
        }}
        onMoveShouldSetResponderCapture={() => {
          return false;
        }}
        onResponderTerminationRequest={() => {
          if (isNow === false) {
            return true;
          }
          return false;
        }}
        onLayout={e => {
          console.log(
            'TouchableHighlight onLayout',
            e.nativeEvent.target,
            e.nativeEvent,
          );
          const _target = e.nativeEvent.target;
          setTarget(_target);
        }}
        pointerEvents={'auto'}
        onResponderRelease={e => {
          console.log('Main onResponderRelease nativeEvent', e.nativeEvent);
          // 遮罩点击
          if (e.nativeEvent.target === target) {
            setIsNow(true);
            if (modalProps.enableTouchThrough) {
              if (typeof modalProps.pressBehavior === 'function') {
                return modalProps.pressBehavior();
              }
              modalProps.pressBehavior === 'close' && modalProps.setShow(false);
              e.stopPropagation();
              e.preventDefault();
              return true;
            }
          } else {
            // 释放点击事件
            setIsNow(false);
          }
        }}>
        <View
          pointerEvents="box-none"
          onStartShouldSetResponder={() => {
            return true;
          }}
          onStartShouldSetResponderCapture={() => {
            return false;
          }}
          // onMoveShouldSetResponder={() => {
          //   return true;
          // }}
          // onMoveShouldSetResponderCapture={() => {
          //   return false;
          // }}
          // onResponderTerminationRequest={() => {
          //   return true;
          // }}
          // onResponderRelease={e => {
          //   console.log('View onResponderRelease nativeEvent', e.nativeEvent);
          // }}
        >
          {modalProps.children}
        </View>
      </View>
    </Modal>
  );
};

BaseModal.open = (content, props = {}) => {
  DeviceEventEmitter.emit('modalOpen', {content, ...props, show: true});
  console.log('modal open');
};
BaseModal.close = () => {
  DeviceEventEmitter.emit('modalClose', {show: false});
  console.log('modal close');
};
export default BaseModal;
