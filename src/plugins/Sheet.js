/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState, useEffect, useCallback, useMemo} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  Modal,
  BackHandler,
  Dimensions,
} from 'react-native';
import BottomSheet, {
  BottomSheetModal,
  useBottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

import Overlay from './Overlay';

const {width, height} = Dimensions.get('screen');

const BaseSheet = (props = {}) => {
  const [sheetProps, setSheetProps] = useState({...props});
  const [backHandler, setBackHandler] = useState(null);

  useEffect(() => {
    console.log('useEffect props', props);
    setSheetProps({...props});
  }, [props]);

  useEffect(() => {
    if (!backHandler) {
      const _backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          console.log('hardwareBackPress');
          bottomSheetRef.current?.close();
          BaseSheet.close();
          return true;
        },
      );
      setBackHandler(_backHandler);
    }

    return () => {
      if (backHandler) {
        backHandler.remove();
      }
      console.log('remove hardwareBackPress');
    };
  }, [backHandler]);

  // ref
  const bottomSheetRef = useRef(null);
  // 面板可伸缩的高度
  const snapPoints = useMemo(() => ['40%', '50%'], []);
  // callbacks
  const handleSheetChanges = useCallback(
    index => {
      console.log('handleSheetChanges', index);
      if (index === -1) {
        if (backHandler) {
          backHandler.remove();
        }
        BaseSheet.close();
      }
    },
    [backHandler],
  );

  // 打开底部弹窗
  // bottomSheetRef.current?.present();

  // 关闭底部弹窗
  // bottomSheetRef.current?.close();

  // renders
  const renderBackdrop = React.useCallback(
    _props => (
      <BottomSheetBackdrop
        opacity={0.35}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior={'close'}
        // eslint-disable-next-line react-native/no-inline-styles
        {..._props}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      {...sheetProps}>
      {sheetProps.children}
    </BottomSheet>
  );
};
BaseSheet.open = (content, props = {opacity: 1}) => {
  const renderChildren = () => {
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          margin: 0,
          position: 'absolute',
          zIndex: 99999,
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          flex: 1,
          width: width,
          height: height,
          backgroundColor: 'rgba(0,0,0,0)',
          justifyContent: 'flex-end',
          ...(props.containerStyle || {}),
        }}>
        <BaseSheet
          {...props}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            position: 'absolute',
            zIndex: 99999,
            ...(props.style || {}),
          }}>
          {content}
        </BaseSheet>
      </View>
    );
  };
  Overlay.open(renderChildren, props);
};
BaseSheet.close = () => {
  Overlay.close();
};
export default BaseSheet;
