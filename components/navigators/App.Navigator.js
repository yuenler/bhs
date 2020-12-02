import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScheduleNavigator from './Schedule.Navigator';
import MessagesNavigator from './Messages.Navigator';
import EventsNavigator from './Events.Navigator';
import FriendsNavigator from './Friends.Navigator';

const Tabs = createBottomTabNavigator();

export default class AppNavigator extends React.Component {
  render() {
    return (
      <Tabs.Navigator>
        <Tabs.Screen name="Schedule" component={ScheduleNavigator} />
        <Tabs.Screen name="Messages" component={MessagesNavigator} />
        <Tabs.Screen name="Events" component={EventsNavigator} />
        <Tabs.Screen name="Friends" component={FriendsNavigator} />
      </Tabs.Navigator>
    )
  }
}