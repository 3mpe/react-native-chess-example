import PropTypes from 'prop-types';
import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loading = ({loading, ...rest}) => {
  if (!loading) {
    return null;
  }
  return <ActivityIndicator {...rest} />;
};

Loading.propTypes = {
  loading: PropTypes.bool,
};

export default Loading;
