import PropTypes from 'prop-types';
import React from 'react';
import {useSafeAreaInsets} from './../../utils';
import HeaderBackground from './HeaderBackground';
import {View} from '../';

const SafeAreaView = ({
  children,
  bgColor,
  hideHeaderBackground = true,
  ...props
}) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      {!hideHeaderBackground && (
        <SafeAreaView.HeaderBackground bgColor={bgColor} />
      )}
      <View
        {...props}
        flex={1}
        bgColor={bgColor}
        style={{paddingTop: insets.top}}>
        {children}
      </View>
    </>
  );
};

SafeAreaView.HeaderBackground = HeaderBackground; // This is the line that makes the difference

SafeAreaView.propTypes = {
  bgColor: PropTypes.string,
  hideHeaderBackground: PropTypes.bool,
  children: PropTypes.node,
};
export default SafeAreaView;
