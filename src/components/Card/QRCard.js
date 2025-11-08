import React, {useRef} from 'react';
import {Animated} from 'react-native';
import {Avatar, Button, Image, Typography, View} from './../';
import {QRCode, RoutesNames, useNavigation} from './../../utils';
import styles from './styled';

const QRCard = ({
  closeIcon = true,
  showQRCode = true,
  showQRCodeImage = false,
  qrCodeData,
  onPressClose = () => {},
  userInfo = [],
  name,
  surname,
  department,
  image,
  company,
  hideExtraInfo = false,

  //  Avatar üzerinde ki edit butonuna basıldığında çalışacak fonksiyon
  onPressEditButton,
}) => {
  const navigation = useNavigation();
  const styled = styles();
  const pan = useRef(new Animated.ValueXY()).current;
  // PanResponder oluştur
  // const panResponder = useRef(
  //   PanResponder.create({
  //     onMoveShouldSetPanResponder: (e, gesture) => true,

  //     onPanResponderMove: (e, gesture) => {
  //       const newX = pan.x._value + gesture.dx;
  //       // Hareketi güncelle
  //       if (gesture.dx > 10) {
  //         // Sağa doğru hareket edildiğinde bir işlem yapılabilir
  //       } else if (gesture.dx < -10) {
  //         // Sola doğru hareket edildiğinde bir işlem yapılabilir
  //       }

  //       // Hareketi sıfırla
  //       Animated.spring(pan, {
  //         toValue: {x: 0, y: 0},
  //         useNativeDriver: false,
  //       }).start();
  //     },
  //   }),
  // ).current;
  const handleRedirectProfile = () => {
    // anasayfa üzerinde ki profile gidecek.
    navigation.navigate(RoutesNames.HomeWithBottomTabs, {
      redirectName: RoutesNames.Profile,
    });
    onPressClose();
  };
  return (
    <View style={styled.container} marginTop={40}>
      <View
        center
        alignCenter
        padding={16}
        style={styled.headerWrapper}
        borderRadius={hideExtraInfo ? 16 : undefined}
        margin={0}>
        {closeIcon && (
          <View style={styled.closeIcon}>
            <Button onPress={onPressClose}>
              <Image name="close" />
            </Button>
          </View>
        )}
        <View marginTop={-50}>
          <Avatar
            width={86}
            height={86}
            onPressEditButton={onPressEditButton}
            source={{uri: image}}
            nameSurname={name + ' ' + surname}
          />
        </View>
        <Typography
          variant="s2"
          semibold
          marginBottom={4}
          marginTop={16}
          textCenter>
          {name} {surname}
        </Typography>
        <Typography variant="s4" marginBottom={4} center textCenter>
          {department}
        </Typography>
        <Typography
          variant="s4"
          marginBottom={showQRCodeImage ? 0 : 4}
          textCenter>
          {company}
        </Typography>
      </View>
      {!hideExtraInfo && (
        <Animated.View
          style={[styles.qrWrapper, {transform: [{translateX: pan.x}]}]}
          // {...panResponder.panHandlers}
        >
          <View marginTop={showQRCodeImage ? 0 : 16}>
            {showQRCode && (
              <View height={150} center alignCenter>
                {showQRCodeImage ? (
                  <Image width={172} height={172} source={{uri: qrCodeData}} />
                ) : (
                  <QRCode
                    value={qrCodeData}
                    size={172}
                    color="black"
                    backgroundColor="white"
                  />
                )}
              </View>
            )}
            <View
              paddingTop={showQRCodeImage ? 0 : 16}
              paddingLeft={showQRCodeImage ? 0 : 16}
              paddingBottom={16}
              width={300}>
              {userInfo.length === 0 && (
                <Button onPress={handleRedirectProfile}>
                  <View center alignCenter row>
                    <Typography
                      variant="s4"
                      semibold
                      color="primary6"
                      wrapView={true}>
                      Profil Görüntüle
                    </Typography>
                    <Image name="rightArrow" marginRight={-8} />
                  </View>
                </Button>
              )}
              {userInfo &&
                userInfo.map((item, index) =>
                  item.value ? (
                    <View start marginTop={index === 0 ? -16 : 4} key={index}>
                      <Typography flex variant="p2" marginBottom={4}>
                        {item.label}
                      </Typography>

                      {typeof item.value === 'string' ? (
                        <Typography
                          alignCenter
                          variant="p2"
                          semibold={!item.closeSemibold}>
                          {item.value}
                        </Typography>
                      ) : (
                        item.value
                      )}

                      {index < userInfo.length - 1 && (
                        <View
                          width={'100%'}
                          height={2}
                          borderBottomWidth={1}
                          borderColor="default4"
                          marginTop={0}
                          paddingBottom={8}
                          marginBottom={8}
                        />
                      )}
                    </View>
                  ) : null,
                )}
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default QRCard;
