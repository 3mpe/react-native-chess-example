import React from 'react';
import {View, Typography} from './../';
import style from './styled';
const Tag = ({text, ...rest}) => {
  const styled = style();
  return (
    <View row>
      <View
        paddingTop={4}
        paddingBottom={4}
        paddingLeft={12}
        paddingRight={12}
        style={styled.container}>
        <Typography variant="p4" semibold style={styled.text}>
          {text}
        </Typography>
      </View>
    </View>
  );
};
export default Tag;
