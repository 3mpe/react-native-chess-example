import React from 'react';
import {Typography, View, Button} from './../';
import styles from './styled';

const Radio = ({
  onPress,
  selected,
  label,
  wrapperProps = {},
  variant = 'p3',
  color = 'default10',
}) => {
  const styled = styles({selected});

  return (
    <View marginTop={12} {...wrapperProps}>
      <Button onPress={onPress}>
        <View row start alignCenter>
          <View style={styled.circleContainer}>
            {selected && <View style={styled.circle} bgColor="primary5" />}
          </View>
          <Typography variant={variant} color={color} marginLeft={8}>
            {label}
          </Typography>
        </View>
      </Button>
    </View>
  );
};

export default Radio;
