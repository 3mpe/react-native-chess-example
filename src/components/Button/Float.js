import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styled';
import {View, Image} from '../';

const FloatButton = ({children, ...rest}) => {
  const style = styles();
  return (
    <TouchableOpacity style={style.floatButton} activeOpacity={0.8} {...rest}>
      <View>
        <Image name="floatPlus" />
        {children}
      </View>
    </TouchableOpacity>
  );
};
export default FloatButton;
