import React, {useState} from 'react';
import {ImageBackground as RNImageBackground, StyleSheet} from 'react-native';
import {ImageAssets, themeToken} from '../../utils';
import {View} from './../'; // Kendi özel View component'in

const ImageBackground = ({source, name, tintColor, children, ...rest}) => {
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumu
  const [hasError, setHasError] = useState(false); // Hata durumu

  const handleLoadStart = () => setIsLoading(true);
  const handleLoadEnd = () => setIsLoading(false);
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const imageName =
    (source && (source.uri || ImageAssets[source] || source)) ||
    ImageAssets[name] ||
    ImageAssets.error;

  const preparedTintColor = themeToken.colors[tintColor] || tintColor;
  const {containerProps, style, ...imageBackgroundProps} = rest;

  const finalStyle = [styles.base, style];

  // Hata durumunda, resmi gösterme, sadece içeriği göster.
  // Bu, uygulamanın çökmesini engeller ve içeriğin görünür kalmasını sağlar.
  if (hasError) {
    return (
      <View style={[finalStyle, styles.errorContainer]}>
        <View {...containerProps}>{children}</View>
      </View>
    );
  }

  return (
    <RNImageBackground
      source={imageName}
      tintColor={preparedTintColor}
      style={finalStyle}
      onLoadStart={handleLoadStart}
      onLoadEnd={handleLoadEnd}
      onError={handleError}
      // 'containerProps' ve 'style' dışındaki diğer tüm prop'ları aktar
      {...imageBackgroundProps}
      resizeMode={rest.resizeMode || 'cover'}>
      {isLoading && <View style={styles.loaderOverlay} />}

      <View {...containerProps}>{children}</View>
    </RNImageBackground>
  );
};

const styles = StyleSheet.create({
  base: {
    // Orijinal component'teki varsayılan davranış korundu
    flexGrow: 1,
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: '#e0e0e0',
  },
});

export default ImageBackground;
