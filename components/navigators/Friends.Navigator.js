import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { clone } from '../clone';
import FriendsScreen from '../screens/Friends.Screen';

const Stack = createStackNavigator();

export default class FriendsNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen component={clone(this.props.user, FriendsScreen)} name="Friends" />
      </Stack.Navigator>
    )
  }
}