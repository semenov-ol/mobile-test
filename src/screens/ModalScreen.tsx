import React, { FC } from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Rockets } from './TabOneScreen';

interface ModalScreenProps {
  navigation: StackNavigationProp<any>;
  route: RouteProp<{ params: { data: Rockets } }, 'params'>;
}

const ModalScreen: FC<ModalScreenProps> = ({ navigation, route: { params } }) => {
  const { data } = params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>{data.name}</Text>
      <Text style={{ fontSize: 20 }}>boosters: {data.boosters}</Text>
      <Text style={{ fontSize: 20 }}>mass: {data.mass.kg}</Text>
      <Text style={{ fontSize: 15, width: '90%', alignSelf: 'center', marginVertical: 10 }}>{data.description}</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
};

export default ModalScreen;
