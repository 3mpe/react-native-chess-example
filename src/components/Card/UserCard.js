import React from 'react';
import style from './styled';
import Avatar from '../Avatar';
import Button from '../Button';
import Image from '../Image';
import Typography from '../Typography';
import View from '../View';

const UserCard = ({onPress = () => {}, showCloseButton = false, ...rest}) => {
  const styled = style();
  return (
    <Button
      feedback={false}
      onPress={() => {
        onPress && onPress(rest);
      }}>
      <View
        borderWidth={1}
        borderColor="default4"
        style={styled.cardShadow}
        marginBottom={4}
        marginTop={8}
        marginLeft={16}
        marginRight={16}
        padding={0}
        paddingTop={12}
        paddingBottom={12}>
        <View row alignCenter>
          <Avatar source={{uri: rest.avatarImage}} width={40} height={40} />
          <View flex center paddingRight={16}>
            <Typography
              variant="p2"
              color="default10"
              semibold
              marginBottom={4}
              numberOfLines={1}>
              {rest.title}
            </Typography>
            <Typography variant="p3" color="default7" numberOfLines={1}>
              {rest.subTitle}
            </Typography>
          </View>
          {showCloseButton && <Image name="close" />}
        </View>
      </View>
    </Button>
  );
};

export default UserCard;
