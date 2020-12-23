import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ScheduleScreen from '../screens/Schedule.Screen';
import CustomizationScreen from '../screens/Customization.Screen';


const Stack = createStackNavigator();

export default class ScheduleNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen component={ScheduleScreen} name="Schedule" />
        <Stack.Screen component={CustomizationScreen} name="Customize" />
      </Stack.Navigator>
    )
  }
}