import * as React from 'react';
import { StyleSheet, TextInput, Button, SafeAreaView } from 'react-native';
import { inject, observer } from 'mobx-react';
import { useQuery, gql } from '@apollo/client';

import { Text } from '../components/Themed';

function TabOneScreen(props: { store: { text: string; updateText: () => {} } }) {
  const { text, updateText } = props.store;

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
    <SafeAreaView>
      <TextInput style={styles.input} value={text} onChangeText={updateText} />
      <Button title="Search" onPress={() => {}} />

      <Text>Random currency: {data.rates[randomInteger(1, 100)].currency}</Text>
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
    height: 50,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    alignSelf: 'center',
  },
});

export default inject('store')(observer(TabOneScreen));
