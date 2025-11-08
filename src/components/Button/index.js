import React from 'react';
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import FloatButton from './Float';
import Link from './link';
import styles from './styled';
import Loading from '../Loading';

const Button = ({
  children,
  disabled,
  loading,
  ifCond,
  feedback = true,
  ...rest
}) => {
  const style = styles();

  if (ifCond) return null;
  const ButtonWrapper = feedback ? TouchableOpacity : TouchableWithoutFeedback;
  return (
    <ButtonWrapper
      style={[style.button, (disabled || loading) && style.disabledButton]}
      activeOpacity={!rest.onPress ? 1 : 0.8}
      disabled={disabled || loading}
      {...rest}>
      {loading ? <Loading loading /> : children}
    </ButtonWrapper>
  );
};
Button.Link = Link;
Button.Float = FloatButton;

Button.propTypes = {
  ...TouchableOpacity.propTypes,
};
export default Button;
