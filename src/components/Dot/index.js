import React from 'react';
import View from '../View';

const Dot = ({isActive = false, opacity = 1}) => {
  return (
    <View
      position="absolute"
      width={20}
      height={20}
      opacity={opacity}
      top={16}
      left={16}
      bgColor="neutral2"
      borderWidth={1}
      borderColor={'primary6'}
      padding={4}
      borderRadius={200}
      center
      alignCenter>
      {isActive && (
        <View width={12} height={12} bgColor="primary6" borderRadius={200} />
      )}
    </View>
  );
};

export default Dot;
