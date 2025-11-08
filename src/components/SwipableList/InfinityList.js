import React, {useRef, useState} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {Loading, View} from '..';
import SwipableListItem from './ListItem';

const InfinityList = ({
  data,
  renderItem,
  renderRightActions,
  onEndReached,
  onRefresh,
  ...rest
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
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

  const renderFooter = () => (loadingMore ? <Loading loading={true} /> : null);
  const fetchMoreData = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      typeof onEndReached === 'function' &&
        onEndReached().then(() => setLoadingMore(false));
    }
  };

  const handleOnRefresh = () => {
    setRefreshing(true);
    typeof rest.onRefresh === 'function' &&
      typeof onRefresh === 'function' &&
      onRefresh().then(() => setRefreshing(false));
  };

  return (
    <View bgColor="neutral2">
      <FlatList
        {...rest}
        data={data}
        renderItem={({item}) => (
          <SwipableListItem
            key={item.key}
            renderRightActions={renderRightActions}
            onSwipeStart={handleSwipeStart}
            onSwipeClose={handleSwipeClose}>
            {renderItem(item)}
          </SwipableListItem>
        )}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
        } // refreshControl ile listenin üstüne çekildiğinde onRefresh çalışır ve refresh işlemi başlar.
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.5} // listenin sonuna %50 yaklaştığında fetchMoreData çalıştır
        ListFooterComponent={renderFooter} // listenin sonuna ulaştığında renderFooter çalıştır ve loading gösterir.
      />
    </View>
  );
};
export default InfinityList;
