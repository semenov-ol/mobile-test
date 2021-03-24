import React, { FC, useEffect } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { observer } from 'mobx-react';
import { useQuery, gql } from '@apollo/client';

import { Text, View } from '../components/Themed';
import { StackNavigationProp } from '@react-navigation/stack';
import { store } from '../../App';
import { WishListItem } from './WishListItem';

export interface Rockets {
  name?: string;
  __typename?: string;
  boosters?: number;
  description?: string;
  mass?: {
    kg: number;
  };
}

interface TabOneScreenProps {
  navigation?: StackNavigationProp<any>;
}

const TabOneScreen: FC<TabOneScreenProps> = ({ navigation }) => {
  console.log(store)

  const EXCHANGE_RATES = gql`
    query GetRockets {
      rockets(limit: 10) {
        boosters
        name
        mass {
          kg
        }
        description
      }
    }
  `;

  const { data } = useQuery(EXCHANGE_RATES);

  useEffect(() => {
    store.updateData(data);
  }, [data]);

  return (
    <ScrollView style={styles.container}>
      <View style={{ width: '90%', alignSelf: 'center' }}>
        <Text style={{ marginVertical: 20, fontWeight: 'bold' }}>SpaceX Rockets:</Text>
        {store.data?.rockets?.map((item: Rockets) => (
          <View key={item.name}>
            <TouchableOpacity onPress={() => navigation?.navigate('Modal', { data: item })}>
              <Text>Rocket Name: {item.name}</Text>
              <Text>mass: {item.mass?.kg}</Text>
              <Text>desc: {item.description}</Text>
            </TouchableOpacity>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          </View>
        ))}
      </View>
      <View>
        {store.wishList.length > 0 && <Text>Here your wishList</Text>}
        {store.wishList.map((item) => (
          <WishListItem key={item.key} item={item} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
    height: 50,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    alignSelf: 'center',
  },
});

export default observer(TabOneScreen);
