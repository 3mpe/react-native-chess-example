import {useCallback, useEffect, useState} from 'react';
import {Button, Image, Modal, ScrollView, Typography, View} from '..';

const NotificationModal = ({visible, url, title, description, onPress}) => {
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    setModalVisible(visible);

    // okundu bilgisi gönderme işlemi burada yapılabilir
  }, [visible]);

  const handleButtonOkPress = useCallback(() => {
    setModalVisible(false);
    if (onPress) onPress();
  }, [onPress]);

  return (
    <Modal visible={modalVisible}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View flex center alignCenter marginTop={-16} marginBottom={0}>
          <View useShadow bgColor="neutral1" borderRadius={16} width={300}>
            <View
              center
              alignCenter
              bgColor="primary6"
              // minHeight={160}
              borderTopStartRadius={16}
              borderTopEndRadius={16}>
              <Image
                source={{uri: url}}
                wrapView={false}
                resizeMethod="contain"
              />
            </View>
            <View padding={16}>
              <Typography ifCond={!title} variant="s3" semibold>
                {title}
              </Typography>
              <Typography
                ifCond={!description}
                variant="p2"
                center
                color="#292929"
                marginTop={8}
                marginBottom={16}>
                {description}
              </Typography>

              <Button onPress={handleButtonOkPress}>
                <Typography
                  variant="s3"
                  color="neutral2"
                  semibold
                  bgColor="primary6"
                  paddingLeft={16}
                  paddingRight={16}
                  paddingBottom={10}
                  paddingTop={10}
                  borderRadius={40}
                  center
                  alignCenter>
                  Tamam
                </Typography>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default NotificationModal;
