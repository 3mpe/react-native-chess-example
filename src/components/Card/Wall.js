import React from 'react';
import {RoutesNames, useNavigation} from './../../utils';
import {View, Typography, Profile, Image, Button} from '../';
const WallComponent = ({bottomBorder = true}) => {
  const navigation = useNavigation();
  const handleRedirectComment = () => {
    navigation.navigate(RoutesNames.WallDetail, {id: '1'});
  };
  return (
    <View marginRight={16} marginLeft={16}>
      <View marginRight={-16} marginLeft={-16}>
        <Profile
          welcomeText={null}
          nameVariant="p2"
          departmentVariant="p4"
          profileWidth={48}
          profileHeight={48}
          marginBottom={16}
          marginTop={0}
          profileUrl={'https://picsum.photos/id/65/200/300'}
          name={`Deneme Name Surname`}
          department={null}
        />
      </View>
      <View>
        <Typography variant="p3" color="default10">
          Ödüller için yola çıktık🏆 @ezgimete @gozdeozkaraman @ecenurcimen
          @selintantunc #liderleryollarda
        </Typography>
        <Image name={'wallExample'} marginTop={16} borderRadius={8} />
      </View>
      <View row between>
        <View row between>
          <View row alignCenter marginRight={16} marginTop={16}>
            <View
              alignCenter
              center
              borderWidth={1}
              borderColor="primary6"
              padding={4}
              borderRadius={40}
              bgColor="primary6">
              <Image name="hearth" tintColor="neutral2" />
            </View>
            <Typography variant="p3" color="default10" marginLeft={8}>
              12 Beğeni
            </Typography>
          </View>
          <Button onPress={handleRedirectComment}>
            <View row alignCenter marginRight={16} marginTop={16}>
              <View
                borderWidth={1}
                borderColor="primary6"
                padding={4}
                borderRadius={40}>
                <Image name="comment" />
              </View>
              <Typography variant="p3" color="default10" marginLeft={8}>
                3 Yorum
              </Typography>
            </View>
          </Button>
        </View>
        <View end marginTop={16}>
          <Typography variant="p4" color="default7">
            17.09.2023
          </Typography>
          <Typography variant="p4" color="default7">
            10:17
          </Typography>
        </View>
      </View>
      {bottomBorder && (
        <View height={1} bgColor="default4" marginTop={16} marginBottom={16} />
      )}
    </View>
  );
};

export default WallComponent;
