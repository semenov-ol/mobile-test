import * as React from 'react';
import { StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import { useQuery, gql } from '@apollo/client';

import { Text, View } from '../components/Themed';
import { toJS } from 'mobx';

interface Rockets {
  name: string;
  __typename: string;
  boosters: number;
  description: string;
  mass: {
    kg: number;
  };
}

function TabOneScreen(props: { store: { data: { rockets: Rockets[] }; updateData: (data: any) => {} } }) {
  const { data: storeData, updateData } = props.store;
  const [response, setResponse] = React.useState<{ rockets: Rockets[] }>();

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
    setResponse(toJS(storeData));
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={{ width: '90%' }}>
        <Text style={{ marginVertical: 20, fontWeight: 'bold' }}>SpaceX Rockets:</Text>
        {response?.rockets?.map((item) => (
          <View key={item.name}>
            <Text>Rocket Name: {item.name}</Text>
            <Text>mass: {item.mass.kg}</Text>
            <Text>desc: {item.description}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
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
