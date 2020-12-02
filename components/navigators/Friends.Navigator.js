import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import FriendsScreen from '../screens/Friends.Screen';

const Stack = createStackNavigator();

export default class FriendsNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen component={FriendsScreen} name="Friends" />
      </Stack.Navigator>
    )
  }
}