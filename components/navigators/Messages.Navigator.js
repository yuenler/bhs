import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import MessagesScreen from '../screens/Messages.Screen';

const Stack = createStackNavigator();

export default class MessagesNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen component={MessagesScreen} name="Messages" />
      </Stack.Navigator>
    )
  }
}