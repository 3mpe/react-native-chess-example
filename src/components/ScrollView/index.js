import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

const CustomScrollView = ({children, ...rest}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} {...rest}>
      {children}
    </ScrollView>
  );
};

CustomScrollView.propTypes = {
  ...ScrollView.propTypes,
};
export default CustomScrollView;
