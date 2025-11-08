import React from 'react';
import NotificationCard from './NotificationCard';
import QRCard from './QRCard';
import styles from './styled';
import CustomTransportSelectionItem from './TransportSelection';
import UserCard from './UserCard';
import Wall from './Wall';
import {View} from '../';

const Card = ({children, ...rest}) => {
  const styled = styles();
  return (
    <View
      useShadow
      marginBottom={4}
      marginTop={16}
      marginLeft={16}
      marginRight={16}
      padding={16}
      borderRadius={16}
      {...rest}>
      {children}
    </View>
  );
};

Card.displayName = 'Card';
Card.QR = QRCard;
Card.Notification = NotificationCard;
Card.Wall = Wall;
Card.UserCard = UserCard;
Card.CustomTransportSelection = CustomTransportSelectionItem;
export default Card;
