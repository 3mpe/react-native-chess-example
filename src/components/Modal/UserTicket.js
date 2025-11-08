import React, {useEffect, useState} from 'react';
import {FlatList, Modal} from 'react-native';
import styled from './styled';
import {Button, Card, Image, TextInput, Typography, View} from '../';

const UserTicket = ({
  visible = false,
  text,
  onClose,
  onSelect,
  data,
  ...rest
}) => {
  const styles = styled();
  const [textValue, setTextValue] = useState('');
  const [modalVisible, setModalVisible] = useState(visible);
  const [userTickets, setUserTickets] = useState([]);

  useEffect(() => {
    setModalVisible(visible);
  }, [visible]);

  useEffect(() => {
    setTextValue(text);
  }, [text]);

  useEffect(() => {
    setUserTickets(data);
  }, [data]);

  const handleCloseModal = () => {
    setModalVisible(false);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const handleOnSelect = item => {
    if (typeof onSelect === 'function') {
      onSelect(item);
    }
  };

  const handleFilter = text => {
    setTextValue(text);
    setUserTickets(
      data.filter(
        item =>
          item.title.toLowerCase().includes(text.toLowerCase()) ||
          item.subTitle.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={handleCloseModal}
      {...rest}>
      <View style={styles.overlay}>
        <View style={styles.content} width="100%" marginTop={44}>
          <Card width="90%" height="80%" marginBottom={30}>
            <View row alignCenter between>
              <Typography variant="s2" color="neutral1" marginLeft={10}>
                Kullanıcı Biletleri
              </Typography>
              <Button onPress={handleCloseModal}>
                <Image name="close" onPress={handleCloseModal} />
              </Button>
            </View>
            <View
              height={1}
              bgColor="default4"
              marginLeft={-16}
              marginRight={-16}
              marginTop={4}
            />
            <View
              marginTop={16}
              marginBottom={2}
              marginLeft={-10}
              marginRight={-10}>
              <TextInput
                placeholder="Ara"
                onChangeText={handleFilter}
                value={textValue}
                autoFocus
              />
            </View>
            <FlatList
              data={userTickets}
              style={styles.userTicket.container}
              contentContainerStyle={styles.userTicket.containerWrapper}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View marginLeft={-14} marginRight={-14}>
                  <Card.UserCard {...item} onPress={handleOnSelect} />
                </View>
              )}
            />
          </Card>
        </View>
      </View>
    </Modal>
  );
};

export default UserTicket;
