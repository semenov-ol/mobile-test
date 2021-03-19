import * as React from 'react';
import { StyleSheet } from 'react-native';
import { useQuery, gql } from '@apollo/client';

import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  const EXCHANGE_RATES = gql`
    query GetExchangeRates {
      rates(currency: "USD") {
        currency
        rate
      }
    }
  `;

  const { loading, data, error } = useQuery(EXCHANGE_RATES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  function randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text>Random currency: {data.rates[randomInteger(1, 100)].currency}</Text>
    </View>
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
});
