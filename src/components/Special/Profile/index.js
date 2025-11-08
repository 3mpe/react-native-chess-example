import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {View, Typography, Avatar} from './../../';
import {RoutesNames} from '../../../utils';
// import styles from './styled';

const Profile = ({
  welcomeText = 'Hoş geldin!',
  name = '',
  department = '',
  textColor = undefined,
  profileUrl = '',
  isBirthday = false,

  nameVariant = 's2',
  welcomeTextVariant = 's3',
  departmentVariant = 's2',

  marginBottom = 32,
  marginTop = 32,

  profileWidth = 64,
  profileHeight = 64,
  onPressEditButton = null,
}) => {
  const [newWelcomeText, setNewWelcomeText] = React.useState(welcomeText);
  const navigation = useNavigation();
  // const styled = styles();

  useEffect(() => {
    if (isBirthday) setNewWelcomeText('Hoş geldin, iyi ki doğdun!');
  }, [isBirthday]);

  // ux onayından sonra eklenecek yada kaldırılacak
  const handleGoToProfile = () => {
    navigation.navigate(RoutesNames.HomeWithBottomTabs, {
      redirectName: RoutesNames.Profile,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={handleGoToProfile}>
      <View
        center
        alignCenter
        row
        marginTop={marginTop}
        marginBottom={marginBottom}>
        <View marginRight={6}>
          {/* <TouchableWithoutFeedback onPress={handleGoToProfile}> */}
          <Avatar
            width={profileWidth}
            height={profileHeight}
            containerProps={{
              marginLeft: 8,
              marginRight: 8,
              containerProps: 'primary4',
            }}
            source={{uri: profileUrl}}
            nameSurname={name}
            profileUrl={profileUrl}
            showEditButton={false}
            onPressEditButton={onPressEditButton}
            isBirthday={isBirthday}
          />
          {/* </TouchableWithoutFeedback> */}
        </View>
        <View>
          {newWelcomeText && (
            // <TouchableWithoutFeedback onPress={handleGoToProfile}>
            <Typography
              variant={welcomeTextVariant}
              color={textColor}
              marginBottom={4}
              numberOfLines={2}>
              {newWelcomeText}
            </Typography>
            // </TouchableWithoutFeedback>
          )}
          {name && (
            // <TouchableWithoutFeedback onPress={handleGoToProfile}>
            <Typography
              variant={nameVariant}
              color={textColor}
              semibold
              marginBottom={4}
              width={230}
              numberOfLines={2}>
              {name}
            </Typography>
            // </TouchableWithoutFeedback>
          )}
          {department && (
            <Typography variant={departmentVariant} color="default7">
              {department}
            </Typography>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Profile;
