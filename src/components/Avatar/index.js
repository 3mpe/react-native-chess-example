import React, {useEffect, useMemo, useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {View, Image, Button, Typography} from './../';
import style from './styled';
import {checkImageUrl, ImagePicker, Permission, Permissions} from '../../utils';

const Avatar = ({
  source,
  containerProps,
  width = 96,
  height = 96,
  onPressEditButton,
  showEditButton = true,
  nameSurname,
  size = 'h6',
  isBirthday = false,
  ...rest
}) => {
  const [pImage, setImage] = useState(source?.uri || null);
  const styled = style();

  useEffect(() => {
    setImage(source?.uri);
  }, [source]);

  // useEffect(() => {
  //   checkImageUrl(pImage).then(({isError}) => {
  //     if (isError) setImage(null);
  //     // setLoading(false);
  //   });
  // }, [pImage]);

  const handleEditOnPress = () => {
    if (!showEditButton && typeof onPressEditButton === 'function') {
      onPressEditButton();
      return;
    }

    Permission.checkAndRequestPermission(Permissions.GALLERY).then(() => {
      openImagePicker();
    });
  };

  const renderImage = useMemo(() => {
    if (!pImage && nameSurname) {
      const text = nameSurname?.split(' ');
      if (text?.length > 1) {
        return (
          <View width={width} height={height} center alignCenter>
            <Typography variant={size} color="neutral2">
              {text[0][0]}
              {text[text.length - 1][0]}
            </Typography>
          </View>
        );
      }
    }

    return (
      <Image
        // eslint-disable-next-line react-native/no-inline-styles
        style={{width, height, borderRadius: 200, objectFit: 'cover'}}
        source={{
          uri: pImage,
        }}
      />
    );
  }, [pImage, nameSurname, width, height, size]);

  const openImagePicker = () => {
    ImagePicker.openPicker({
      width,
      height,
      cropping: true,
      cropperChooseText: 'Seç',
      cropperCancelText: 'İptal',
      cropperToolbarTitle: 'Kırp',
      cropperCircleOverlay: true,
      cropperStatusBarColor: 'black',
      cropperToolbarColor: 'black',
      cropperToolbarWidgetColor: 'white',
      cropperActiveWidgetColor: 'white',
    }).then(async image => {
      // Resim dosyasını FormData nesnesine ekleyin
      const data = new FormData();
      data.append('photo', {
        uri: image.path,
        type: image.mime,
        name: image.filename || `filename.${image.mime.split('/')[1]}`,
      });

      const imageChange =
        typeof onPressEditButton === 'function'
          ? await onPressEditButton(data, image)
          : false;
      if (imageChange) setImage(`file://${image.path}`);
    });
  };

  const Wrapper =
    typeof onPressEditButton === 'function' ? TouchableWithoutFeedback : View;
  return (
    <Wrapper
      onPress={
        typeof onPressEditButton === 'function' ? handleEditOnPress : () => {}
      }>
      <View position="relative">
        <View
          ifCond={!isBirthday}
          position="absolute"
          top={-30}
          right={-10}
          zIndex={-1}>
          <Image name={'birthday'} />
        </View>
        <View
          position="relative"
          style={[styled.imageContainer]}
          padding={4}
          marginLeft={16}
          marginRight={16}
          borderRadius={width || 500}
          width={width || 80}
          height={height || 80}
          {...containerProps}>
          {typeof onPressEditButton === 'function' && showEditButton && (
            <View style={styled.editImageContainer}>
              <Button onPress={handleEditOnPress}>
                <Image name="pencil" />
              </Button>
            </View>
          )}

          {renderImage}
        </View>
      </View>
    </Wrapper>
  );
};
export default Avatar;
