/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, Typography} from '../../../components';

const CardHeader = ({data}) => {
  const {activity} = data;
  return (
    <View>
      <Typography variant="s1" color="default10" semibold>
        {activity.title}
      </Typography>
      <View marginTop={8} row alignCenter>
        <Image
          name="location"
          style={{width: 16, height: 16}}
          tintColor="neutral1"
          marginRight={4}
        />
        <Typography variant="p2" color="default7" center alignCenter textCenter>
          {activity.location}
        </Typography>
      </View>

      <View row>
        <View marginTop={4} row center alignCenter>
          <Image
            name="calendar"
            style={{width: 16, height: 16}}
            tintColor="neutral1"
            marginRight={4}
            marginTop={-1}
          />
          <Typography variant="p2" color="default7" alignCenter textCenter>
            {activity.startDate?.replace(/-/g, '.')} {' - '}
            {activity.endDate?.replace(/-/g, '.')}
          </Typography>
        </View>
        {/* <View marginTop={8} marginLeft={24} row alignCenter>
          <Image
            name="profiles"
            style={{width: 20, height: 20}}
            tintColor="neutral1"
            marginRight={4}
          />
          <Typography variant="p2" color="default7" align="center">
            Özel Etkinlik
          </Typography>
        </View> */}
      </View>
    </View>
  );
};

export default CardHeader;
