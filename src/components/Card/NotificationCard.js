import PropTypes from 'prop-types';
import React from 'react';
import {View, Image, Typography, Button} from './../';

const NotificationCard = ({icon, text = '', onPress}) => {
  return (
    <Button onPress={onPress}>
      <View
        row
        between
        alignCenter
        paddingLeft={8}
        paddingRight={8}
        paddingTop={12}
        margin={4}>
        <View row center alignCenter>
          {icon && (
            <View center alignCenter>
              <Image name={icon} />
            </View>
          )}

          <Typography variant="p2" padding={8}>
            {text}
          </Typography>
        </View>
        <Image name="rightArrow" />
      </View>
    </Button>
  );
};

NotificationCard.displayName = 'NotificationCard';

NotificationCard.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  onPress: PropTypes.func,
};

export default NotificationCard;
