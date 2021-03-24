import * as React from 'react';
import { StyleSheet, TextInput, SafeAreaView, Button } from 'react-native';
import { observer } from 'mobx-react';

import { View } from '../components/Themed';
import { useState } from 'react';

import { WishListItem } from './WishListItem';
import { store } from '../../App';
import { toJS } from 'mobx';

function TabTwoScreen() {
  const [text, setText] = useState('');
  const { wishList, updateWishList } = store;
  const onChangeText = (value: string) => {
    setText(value);
  };

  const randomNumber = () => Math.floor(Math.random() * 1000 + 1);

  return (
    <SafeAreaView>
      <TextInput style={styles.input} onChangeText={onChangeText} value={text} />
      <Button
        title="Add to wish list"
        onPress={() => {
          updateWishList({ value: text, key: randomNumber() });
          setText('');
        }}
      />
      <View>
        {toJS(wishList)?.map((item) => (
          <WishListItem key={Math.random()} item={item} />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});

export default observer(TabTwoScreen);
