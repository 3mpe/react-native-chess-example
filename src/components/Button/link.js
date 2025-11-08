import React from 'react';
import {Linking} from 'react-native';
import {Button, View} from '..';
const defaultLink = 'mailto:someone@example.com?subject=Subject&body=Body';

const Link = ({url = defaultLink, children, ...rest}) => {
  const handlePress = () => {
    Linking.openURL(url);
  };

  return (
    <View {...rest}>
      <Button onPress={handlePress}>{children}</Button>
    </View>
  );
};

export default Link;
