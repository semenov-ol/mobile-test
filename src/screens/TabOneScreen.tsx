import * as React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import { useQuery, gql } from '@apollo/client';

import { Text, View } from '../components/Themed';
import { toJS } from 'mobx';
import { StackNavigationProp } from '@react-navigation/stack';
import { FC } from 'react';

export interface Rockets {
  name: string;
  __typename: string;
  boosters: number;
  description: string;
  mass: {
    kg: number;
  };
}

interface TabOneScreenProps {
  navigation: StackNavigationProp<any>;
  store: {
    data: { rockets: Rockets[] };
    updateData: (data: Rockets[]) => {};
  };
}

const TabOneScreen: FC<TabOneScreenProps> = ({ store, navigation }) => {
  const { data: storeData, updateData } = store;

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

  React.useEffect(() => {
    updateData(data);
  }, [data]);

  return (
    <ScrollView style={styles.container}>
      <View style={{ width: '90%', alignSelf: 'center' }}>
        <Text style={{ marginVertical: 20, fontWeight: 'bold' }}>SpaceX Rockets:</Text>
        {toJS(storeData)?.rockets?.map((item: Rockets) => (
          <TouchableOpacity onPress={() => navigation.navigate('Modal', { data: item })} key={item.name}>
            <Text>Rocket Name: {item.name}</Text>
            <Text>mass: {item.mass.kg}</Text>
            <Text>desc: {item.description}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          </TouchableOpacity>
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

export default inject('store')(observer(TabOneScreen));
