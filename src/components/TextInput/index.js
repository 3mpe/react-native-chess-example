import PropTypes from 'prop-types';
import React from 'react';
import {TextInput as RNTextInput} from 'react-native';
import MaskedTextInput from './maskedTextInput';
import styled from './styled';
import {View, Image, Button} from '../../components';
import colors from '../../utils/colors';
import InputHOC from '../Form/inputHOC';

const TextInput = ({
  label,
  prefix,
  surfix,
  onPressSurfix = () => {},
  onPressPrefix = () => {},
  inputRef,
  style,
  inputStyle,

  textColor = 'neutral1',
  ...rest
}) => {
  const styles = styled();
  const textColorStyle =
    typeof textColor === 'object' ? textColor : {color: colors[textColor]};

  return (
    <View style={[styles.container, style]}>
      {prefix && (
        <View width={24}>
          <Button onPress={onPressPrefix}>
            {typeof prefix === 'string' ? (
              <Image name={prefix} width={24} style={styles.prefixIcon} />
            ) : (
              prefix
            )}
          </Button>
        </View>
      )}
      <View flex={1}>
        <RNTextInput
          autoCorrect={false}
          autoCompleteType="off"
          textContentType="none"
          ref={inputRef || null}
          style={[styles.input, textColorStyle, inputStyle]}
          returnKeyType="next"
          placeholderTextColor={textColorStyle.color}
          {...rest}
        />
      </View>
      {surfix && (
        <View width={24}>
          <Button onPress={onPressSurfix}>
            {typeof surfix === 'string' ? (
              <Image name={surfix} width={24} style={styles.surfixIcon} />
            ) : (
              surfix
            )}
          </Button>
        </View>
      )}
    </View>
  );
};

TextInput.prototypes = {
  ...RNTextInput.propTypes,
  label: PropTypes.string,
  prefix: PropTypes.string,
  surfix: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

TextInput.Mask = InputHOC(MaskedTextInput);
export default InputHOC(TextInput);
