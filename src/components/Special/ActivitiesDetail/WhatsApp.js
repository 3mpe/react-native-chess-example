import React, {useCallback} from 'react';
import {Linking, TouchableWithoutFeedback} from 'react-native';
import Image from '../../Image';
import Typography from '../../Typography';
import View from '../../View';

const WhatsApp = ({activityGuid = null, title, description, link = null}) => {
  const handleGoWhatsApp = useCallback(() => {
    Linking.openURL(link);
  }, [link]);

  if (!title && !description) return null;
  return (
    <TouchableWithoutFeedback onPress={handleGoWhatsApp} disabled={!link}>
      <View useShadow borderRadius={8} padding={16} marginTop={16}>
        <View row alignCenter between>
          <View row center alignCenter>
            <Image name="whatsApp" />
            <Typography variant="s3" semibold color="primary6" marginLeft={4}>
              {title}
            </Typography>
          </View>
          {link && <Image name="rightArrow" width={24} height={24} />}
        </View>
        <Typography variant="p2" color="default10" marginTop={16}>
          {description}
        </Typography>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WhatsApp;
