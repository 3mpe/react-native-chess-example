/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {NotificationService} from '../../../services';
import {notificationHelper, useNavigation} from '../../../utils';
import {View, Typography, Button, Image} from '../../index'; // 'Image' importunuzu kontrol edin, Image.Background ayrı bir component olabilir mi?

const HeaderHomePage = ({children}) => {
  const navigation = useNavigation();
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      await getNotificationCount();
    }

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    fetchData();

    // return () => {
    //   unsubscribe();
    // };
  }, [navigation]);

  const getNotificationCount = async () => {
    const {data, isSuccessful} = await NotificationService.all();
    if (isSuccessful) {
      const count = data.unReadNotifications.length;
      setNotificationCount(count);
      notificationHelper.clearNotifications();
    }
  };

  return (
    // Header'ı mutlak konumlandırıyoruz ki alttaki içerik onun altından geçebilsin
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}>
      <View>
        <Image.Background
          containerProps={{height: 168}}
          name="homePageHeaderBg"
          center
          alignCenter
          resizeMode="stretch"
          style={{backgroundColor: 'transparent'}}>
          <View marginTop={-32} paddingTop={42}>
            <View row alignCenter between paddingLeft={16} paddingRight={16}>
              <View width={24} height={24} />
              <View>
                <Typography variant="s3" semibold color="neutral2">
                  Ana Sayfa
                </Typography>
              </View>
              <View relative marginLeft={-24} width={48} center alignCenter>
                <Button
                  onPress={() => {
                    navigation.navigate('Notifications');
                  }}>
                  <Image
                    name="notificationHome"
                    width={24}
                    height={24}
                    tintColor={'neutral2'}
                  />

                  {notificationCount > 0 && (
                    <View
                      width={8}
                      height={8}
                      bgColor="secondary6"
                      position="absolute"
                      top={0}
                      left={14}
                      zIndex={99}
                      borderRadius={12}
                    />
                  )}
                </Button>
              </View>
            </View>
            {children}
          </View>
        </Image.Background>
      </View>
    </View>
  );
};
export default HeaderHomePage;
