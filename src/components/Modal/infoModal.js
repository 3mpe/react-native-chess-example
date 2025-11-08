import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import styled from './styled';
import {Button, Image, Typography, View, ScrollView, Keyboard} from '../';
import {AppliedTypes} from '../../services';

const InfoModal = ({
  visible,
  onClose,
  title,
  titleStyle = {alignCenter: true},
  children,
  buttonWrapperStyle = {},
  acceptText = 'Kabul Et',
  rejectText = 'Reddet',
  showCloseButton = false,
  modalIcon = 'infoModal',
  enableContentScroll = true,
  ...rest
}) => {
  const styles = styled();
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  const handleCloseModal = async data => {
    if (typeof onClose === 'function') {
      await onClose(data);
      return;
    }
    setModalVisible(false);
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={handleCloseModal}
      onClose={handleCloseModal}
      presentationStyle="overFullScreen"
      hardwareAccelerated={true}
      // statusBarTranslucent={true}
      {...rest}>
      <Keyboard scrollViewProps={{keyboardShouldPersistTaps: 'never'}}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.infoModal.content}>
              {showCloseButton && (
                <View>
                  <Button onPress={handleCloseModal}>
                    <Image
                      name="close"
                      style={styles.infoModal.buttonContainer}
                      onPress={handleCloseModal}
                    />
                  </Button>
                </View>
              )}

              <View center alignCenter marginTop={-46}>
                {typeof modalIcon === 'string' ? (
                  <Image name={modalIcon} style={styles.image} />
                ) : (
                  modalIcon
                )}
              </View>

              {title && (
                <Typography
                  alignCenter={titleStyle?.alignCenter}
                  variant="s3"
                  semibold
                  marginTop={10}
                  marginBottom={10}
                  color="primary6"
                  // style={{borderWidth: 2, width: '100'}}
                  {...titleStyle}>
                  {title}
                </Typography>
              )}
              <ScrollView
                scrollEnabled={enableContentScroll}
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={true}>
                <View marginBottom={16} marginTop={16}>
                  {children}
                </View>
              </ScrollView>
              <View center alignCenter style={buttonWrapperStyle}>
                {acceptText && (
                  <View width="100%">
                    <Button
                      style={styles.infoModal.successButton}
                      onPress={() => handleCloseModal(AppliedTypes.ACCEPT)}>
                      <Typography
                        variant="s3"
                        semibold
                        style={styles.infoModal.successButtonText}>
                        {acceptText}
                      </Typography>
                    </Button>
                  </View>
                )}
                {rejectText && (
                  <View width="100%" marginTop={16}>
                    <Button
                      style={styles.infoModal.rejectButton}
                      onPress={() => handleCloseModal('reject')}>
                      <Typography variant="s3" semibold color="primary6">
                        {rejectText}
                      </Typography>
                    </Button>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </Keyboard>
    </Modal>
  );
};

export default InfoModal;
