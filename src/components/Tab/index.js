/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Typography, Button, ScrollView} from './../';
import style from './styled';

const Tab = ({
  selectedTab = 0,
  tabs = [],
  onChange,
  paddingLeft,
  paddingRight,
  maxHeight = 50,
  renderItem = null,
}) => {
  const styled = style();
  return (
    <ScrollView
      horizontal
      style={{maxHeight}}
      contentContainerStyle={[styled.containerWrapper]}
      showsHorizontalScrollIndicator={false}>
      <View row paddingLeft={paddingLeft} paddingRight={paddingRight}>
        {tabs.map((tab, index) => {
          return typeof renderItem === 'function' ? (
            renderItem(tab, index)
          ) : (
            <Button onPress={() => onChange && onChange(index, tab)}>
              <View
                key={index}
                start
                paddingLeft={16}
                paddingBottom={8}
                paddingTop={8}
                marginLeft={16}
                // borderColor="#001A64"
                // borderWidth={2}
                center
                alignCenter
                style={[
                  styled.container,
                  {
                    borderBottomColor:
                      selectedTab === index ? '#001A64' : '#E0E0E0',
                  },
                ]}>
                <Typography
                  semibold
                  align="start"
                  marginLeft={-16}
                  variant={selectedTab === index ? 's4' : 's4'}
                  color={selectedTab === index ? 'primary6' : 'neutral1'}>
                  {tab.title}
                </Typography>
              </View>
            </Button>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Tab;
