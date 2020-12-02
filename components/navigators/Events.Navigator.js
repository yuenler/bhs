import React from 'react';
import CreateEventScreen from '../screens/CreateEventScreen';

import { createStackNavigator } from '@react-navigation/stack';
import EventsScreen from '../screens/Events.Screen';

const Stack = createStackNavigator();

export default class EventsNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen component={EventsScreen} name="Events" />
        <Stack.Screen component={CreateEventScreen} name="Create Event" />
      </Stack.Navigator>
    )
  }
}