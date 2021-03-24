import React, { FC } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {store} from '../../App';

interface WishListItemProps {
  item: {value: string, key: number}
}

export const WishListItem: FC<WishListItemProps> = ({item}) => {
  const deleteItem = () => {
    store.deleteFromWishList(item.key)
  }

  return (
    <View style={styles.container}>
      <Text>{item.value}</Text>
      <Button title='delete' onPress={deleteItem}/>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
  },
});