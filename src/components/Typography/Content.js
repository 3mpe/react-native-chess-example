import React from 'react';
import {WebView} from './../../utils';

const Content = ({htmlContent, ...rest}) => {
  return (
    <WebView originWhitelist={['*']} source={{html: htmlContent}} {...rest} />
  );
};

export default Content;
