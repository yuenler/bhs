import React from 'react';
import HomeScreen from './screens/Home.Screen';
import ScheduleScreen from './screens/Schedule.Screen';
import MessagesScreen from './screens/Messages.Screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator();

export default class AppNavigator extends React.Component {
  render() {
    console.log('hi');
    return (
      <Tabs.Navigator>
        <Tabs.Screen name="Home" component={HomeScreen} />
        <Tabs.Screen name="Schedule" component={ScheduleScreen} />
        <Tabs.Screen name="Messages" component={MessagesScreen} />
      </Tabs.Navigator>
    )
  }
}