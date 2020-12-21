import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ScheduleScreen from '../screens/Schedule.Screen';

const Stack = createStackNavigator();

export default class ScheduleNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen component={ScheduleScreen} name="Schedule" />
      </Stack.Navigator>
    )
  }
}