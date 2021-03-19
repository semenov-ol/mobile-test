import ModalScreen from '../screens/ModalScreen';
import * as React from 'react';
import BottomTabNavigator from './BottomTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { ModalStackParamList } from '../../types';

const RootStack = createStackNavigator<ModalStackParamList>();

export default function ModalNavigator() {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }}/>
      <RootStack.Screen name='Modal' component={ModalScreen}/>
    </RootStack.Navigator>
  );
}