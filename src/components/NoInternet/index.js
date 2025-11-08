import React, {useState, useEffect} from 'react';
import {View, Typography} from './../';
import {NetInfo} from '../../utils';

const NoInternetScreen = () => {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    // NetInfo kullanarak bağlantı durumunu izleme
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (isConnected) {
    return null;
  }
  return (
    <View paddingTop={20} bgColor="danger8" center alignCenter>
      <Typography variant="s3" marginTop={30} marginBottom={8} color="neutral2">
        İnternet bağlantısı yok
      </Typography>
    </View>
  );
};
export default NoInternetScreen;
