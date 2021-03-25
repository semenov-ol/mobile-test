import React, { FC, useRef } from 'react';
import { View, Text, Button, StyleSheet, Animated, PanResponder } from 'react-native';
import { store } from '../../App';

interface WishListItemProps {
  item: { value: string; key: number };
}

export const WishListItem: FC<WishListItemProps> = ({ item }) => {
  const deleteItem = () => {
    store.deleteFromWishList(item.key);
  };

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: true }),
      onPanResponderRelease: () => {
        Animated.spring(pan, { useNativeDriver: false, toValue: { x: 0, y: 0 } }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
      }}
      {...panResponder.panHandlers}
    >
      <View style={styles.container}>
        <Text>{item.value}</Text>
        <Button title="delete" onPress={deleteItem} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
  },
});
