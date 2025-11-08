import React from 'react';
import Typography from './index';
import View from '../View';

const HeaderTitle = ({ title, color = 'default10', bgColor = 'surface1' }) => (
  <View bgColor={bgColor} padding={16} borderTopRadius={8}>
    <Typography variant="s3" semibold color={color}>
      {title}
    </Typography>
  </View>
);

export default HeaderTitle;
