import React, {useEffect, useMemo} from 'react';
import {Image as RNImage} from 'react-native';
import {ImageAssets, checkImageUrl} from './../../utils';
import {themeToken} from './../../utils';
import {Loading, View} from './../index';
import ImageBackground from './ImageBackground';
import styles from './styled';

const Image = ({
  name,
  source = null,
  style,
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  resizeMode,
  resizeMethod,

  tintColor,
  defaultLoading = true,
  wrapView = true,
  ...rest
}) => {
  const [loading, setLoading] = React.useState(defaultLoading);
  const [error, setError] = React.useState(false);
  const styled = styles();

  let imageName = null;

  if (source && source.uri) imageName = source;
  else imageName = ImageAssets[name];

  const preparedTintColor = themeToken.colors[tintColor] || tintColor;

  useEffect(() => {
    const url = typeof imageName === 'object' ? imageName.uri : imageName;

    if (source === null || typeof url !== 'string') {
      setLoading(false);
      setError(false);
      return;
    }

    checkImageUrl(url).then(res => {
      setLoading(false);
      setError(res.isError);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageName]);

  const prepareImage = useMemo(() => {
    if (imageName === null && !(source && source.uri)) {
      return null;
    }

    if (loading) {
      return (
        <View center alignCenter style={style} height={height} width={width}>
          <Loading loading={loading} style={styled.loader} />
        </View>
      );
    }

    const width = rest.width || styled.image.width || null;
    const height = rest.height || styled.image.height || null;

    const imageStyle = {
      ...styled.image,
      ...style,
    };

    if (rest.width || styled.image.width) {
      imageStyle.width = width;
    }
    if (rest.height || styled.image.height) {
      imageStyle.height = height;
    }

    if (resizeMode) {
      imageStyle.resizeMode = resizeMode;
    }
    if (resizeMethod) {
      imageStyle.resizeMethod = resizeMethod;
    }
    return (
      <RNImage
        resizeMode="stretch"
        resizeMethod="resize"
        {...rest}
        tintColor={preparedTintColor}
        source={imageName ?? null}
        style={imageStyle}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
    );
  }, [
    imageName,
    source,
    loading,
    rest,
    styled.image,
    styled.loader,
    style,
    resizeMode,
    resizeMethod,
    preparedTintColor,
  ]);

  const WrapperComponent = wrapView ? View : React.Fragment;
  return (
    <WrapperComponent
      style={styled.imageContainer}
      padding={padding}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      margin={margin}
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}>
      {prepareImage}
    </WrapperComponent>
  );
};

Image.Background = ImageBackground;

Image.prototypes = {
  ...RNImage.prototype,
};

export default Image;
