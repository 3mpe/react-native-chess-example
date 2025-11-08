/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {FlatList} from 'react-native';
import InfinityList from './InfinityList';
import SwipableListItem from './ListItem';
import {View} from '../../components';

const SwipableList = ({data, renderItem, renderRightActions, rest}) => {
  const openSwipeableRefs = useRef([]);
  const handleSwipeStart = ref => {
    // Açık olan tüm swipeable öğeleri kapat
    openSwipeableRefs.current.forEach(swipeable => {
      if (
        swipeable &&
        swipeable !== ref &&
        swipeable.current &&
        swipeable.current.close
      ) {
        swipeable.current.close();
      }
    });

    // Yeni açılan öğeyi açık swipeable öğeler dizisine ekle
    openSwipeableRefs.current = [ref];
  };

  const handleSwipeClose = ref => {
    // Kapanan öğeyi açık swipeable öğeler dizisinden çıkar
    openSwipeableRefs.current = openSwipeableRefs.current.filter(
      swipeable => swipeable !== ref,
    );
  };

  return (
    <View bgColor="neutral2">
      <FlatList
        {...rest}
        data={data}
        style={{backgroundColor: 'white', height: '100%'}}
        renderItem={({item}) => (
          <SwipableListItem
            key={item.key || item.notificationGuid || item.dateTime}
            item={item}
            renderRightActions={renderRightActions}
            onSwipeStart={handleSwipeStart}
            onSwipeClose={handleSwipeClose}>
            {renderItem(item)}
          </SwipableListItem>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};
SwipableList.infinity = InfinityList;
export default SwipableList;
