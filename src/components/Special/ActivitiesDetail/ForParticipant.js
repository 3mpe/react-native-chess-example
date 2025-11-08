import React, {useState} from 'react';
import {Avatar, Button, Image, TextInput, Typography, View} from '../../';
import {RoutesNames, useNavigation} from './../../../utils';

const ForParticipant = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [data] = useState([]);
  const [filtered, setFiltered] = useState(data);

  const handleSearch = () => {
    handleSearchText(searchText);
  };
  const handleSearchText = text => {
    setSearchText(text);
    if (searchText === '') {
      setFiltered(data);
    }

    const filteredData = data.filter(item => {
      return item.title.toLowerCase().includes(text.toLowerCase());
    });
    setFiltered(filteredData);
  };

  const handleOnRedirectDetail = item => {
    navigation.navigate(RoutesNames.SpeakerDetail, {item});
  };
  return (
    <View marginTop={16} marginLeft={-10} marginRight={-10}>
      <View>
        <TextInput
          name="scilNo"
          placeholder="Katılımcılarda Ara"
          prefix={
            <Image name="search" tintColor="primary6" width={20} height={20} />
          }
          onChangeText={handleSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="done"
        />
      </View>

      {/* {filtered.map((item, index) => {
        return (
          <Button key={index} onPress={() => handleOnRedirectDetail(item)}>
            <View
              useShadow
              borderColor={'default4'}
              borderWidth={1}
              marginBottom={4}
              marginTop={8}
              marginLeft={12}
              marginRight={12}
              padding={0}
              paddingTop={12}
              paddingBottom={12}
              borderRadius={8}>
              <View row alignCenter>
                <Avatar width={40} height={40} />
                <View flex center paddingRight={16}>
                  <Typography
                    variant="p2"
                    color="default10"
                    semibold
                    marginBottom={4}
                    numberOfLines={1}>
                    {item.title}
                  </Typography>
                  <Typography variant="p3" color="default7" numberOfLines={1}>
                    {item.subTitle}
                  </Typography>
                </View>
                <Image
                  name="rightArrow"
                  tintColor="primary6"
                  width={24}
                  height={24}
                  marginRight={8}
                />
              </View>
            </View>
          </Button>
        );
      })} */}
    </View>
  );
};

export default ForParticipant;
