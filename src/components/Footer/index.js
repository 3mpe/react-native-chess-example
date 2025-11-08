/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {View, Typography, Image, Button} from './../';

const Footer = ({activeIndex, onChange}) => {
  const insets = useSafeAreaInsets();
  const handleChangeFooter = index => {
    onChange(index);
  };

  const getColor = useCallback(
    tabIndex => {
      return activeIndex === tabIndex ? 'primary6' : 'default7';
    },
    [activeIndex],
  );

  return (
    <View
      row
      around
      paddingTop={8}
      paddingBottom={insets.bottom + Platform.select({ios: 20, android: 30})}
      marginBottom={-40}
      style={{
        backgroundColor: 'white',

        // --- iOS için Gölge Ayarları ---
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 20,

        // --- Android için Gölge Ayarı ---
        elevation: 8,
      }}>
      <Button onPress={() => handleChangeFooter(0)}>
        <View flex center alignCenter>
          <Image name="home" paddingBottom={3} tintColor={getColor(0)} />
          <Typography variant="p4" color={getColor(0)}>
            Ana Sayfa
          </Typography>
        </View>
      </Button>
      {/* <Button onPress={() => handleChangeFooter(1)}>
        <View flex center alignCenter>
          <Image
            name="wall"
            tintColor={activeIndex === 1 ? 'primary6' : 'default7'}
          />
          <Typography
            variant="p4"
            color={activeIndex === 1 ? 'primary6' : 'default7'}>
            Duvar
          </Typography>
        </View>
      </Button> */}

      <Button onPress={() => handleChangeFooter(2)}>
        {/* <View alignCenter center marginTop={-20}> */}
        <View alignCenter center>
          <Image name="qr2" marginBottom={4} tintColor={getColor(2)} />
          <Typography variant="p4" color={getColor(2)}>
            QR Kod
          </Typography>
        </View>
      </Button>

      <Button onPress={() => handleChangeFooter(3)}>
        <View flex center alignCenter>
          <Image name="activity" tintColor={getColor(3)} />
          <Typography variant="p4" color={getColor(3)}>
            Etkinliklerim
          </Typography>
        </View>
      </Button>
      <Button onPress={() => handleChangeFooter(4)}>
        <View flex center alignCenter>
          <Image name="profile2" paddingBottom={4} tintColor={getColor(4)} />
          <Typography variant="p4" color={getColor(4)}>
            Profil
          </Typography>
        </View>
      </Button>
    </View>
  );
};

export default Footer;
