import React, {useEffect, useState} from 'react';
import {Modal} from 'react-native';
import styled from './styled';
import {Button, Image, Typography, View, ScrollView, Keyboard} from '../';
import {AppliedTypes} from '../../services';

const InfoModal = ({visible, onClose, uri, ...rest}) => {
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
      {...rest}>
      <Keyboard scrollViewProps={{keyboardShouldPersistTaps: 'never'}}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer} margin={16} borderRadius={16}>
            <Image
              source={{uri: uri}}
              //   style={styles.image}
              width="100%"
              height="100%"
              resizeMode="contain"
            />
          </View>
        </View>
      </Keyboard>
    </Modal>
  );
};

export default InfoModal;
