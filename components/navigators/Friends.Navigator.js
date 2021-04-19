import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import FriendsScreen from '../screens/Friends.Screen';
import ViewProfileScreen from '../screens/ViewProfile.Screen';
import SearchScreen from '../screens/Search.Screen';
import {SearchBar} from 'react-native-elements';



const Stack = createStackNavigator();

export default class FriendsNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      >
        <Stack.Screen component={FriendsScreen} name="Friends" />
  <Stack.Screen component={ViewProfileScreen} name="View Profile"/>
    <Stack.Screen component={SearchScreen} name="Search" />
      </Stack.Navigator>
    )
  }
}