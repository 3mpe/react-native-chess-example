import React from 'react';
import {Typography, View} from './../';
const FormItem = ({children, label, labelColor, ...rest}) => {
  return (
    <View {...rest}>
      {label && (
        <Typography
          variant="p3"
          marginBottom={10}
          marginTop={4}
          marginRight={8}
          marginLeft={16}
          color={labelColor}>
          {label}
        </Typography>
      )}
      {children}
    </View>
  );
};

export default FormItem;
