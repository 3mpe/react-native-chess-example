import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import InfoModal from './infoModal';
import styled from './styled';
import UserTicket from './UserTicket';
import {Keyboard, View} from '../';
import ImageModal from './imageModal';
import NotificationModal from './notification.moda';

const ModalComponent = ({visible, onClose, children, ...rest}) => {
  const styles = styled();
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  const handleCloseModal = () => {
    setModalVisible(false);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={handleCloseModal}
      {...rest}>
      <Keyboard scrollViewProps={{keyboardShouldPersistTaps: 'never'}}>
        <View style={styles.overlay}>
          <View style={styles.content}>{children}</View>
        </View>
      </Keyboard>
    </Modal>
  );
};

ModalComponent.ImageModal = ImageModal;
ModalComponent.InfoModal = InfoModal;
ModalComponent.UserTicket = UserTicket;
ModalComponent.Notification = NotificationModal;
export default ModalComponent;
