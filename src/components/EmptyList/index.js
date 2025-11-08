import React from 'react';
import {Platform} from 'react-native';
import {View, Typography, Image} from '../';

const EmptyList = ({text, subtext, icon, ...rest}) => {
  if (!text && !subtext) return null;

  const formattedText = text ? text.replace(/\\n/g, '\n') : '';
  const formattedSubtext = subtext ? subtext.replace(/\\n/g, '\n') : '';
  return (
    <View
      column
      center
      alignCenter
      {...rest}
      marginRight={Platform.select({ios: 16, android: 30})}
      marginLeft={Platform.select({ios: 16, android: 30})}>
      {icon && <Image name={icon} />}
      <Typography variant="s3" semibold textCenter marginTop={16}>
        {formattedText}
      </Typography>
      <Typography variant="s4" font="Ubuntu_Regular" marginTop={8} textCenter>
        {formattedSubtext}
      </Typography>
    </View>
  );
};

export default EmptyList;
