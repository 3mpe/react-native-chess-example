/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {View} from '../';
import {useSafeAreaInsets, themeToken} from './../../utils';

const HeaderBackground = ({bgColor}) => {
  const insets = useSafeAreaInsets();
  const isAndroid = Platform.OS === 'android';
  const preparedColor = themeToken.colors[bgColor] || bgColor;

  isAndroid && StatusBar.setBackgroundColor('#000');
  return (
    <>
      <View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            height: insets.top,
          },
        ]}
        bgColor={preparedColor} // status bar rengi ile aynı olmalıdır
      />
    </>
  );
};
export default HeaderBackground;
