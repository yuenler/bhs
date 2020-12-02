import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScheduleNavigator from './Schedule.Navigator';
import MessagesNavigator from './Messages.Navigator';
import EventsNavigator from './Events.Navigator';
import FriendsNavigator from './Friends.Navigator';
import { clone } from '../clone';

const Tabs = createBottomTabNavigator();

export default class AppNavigator extends React.Component {
  render() {
    return (
      <Tabs.Navigator>
        <Tabs.Screen name="Schedule" component={clone(this.props.user, ScheduleNavigator)} />
        <Tabs.Screen name="Messages" component={clone(this.props.user, MessagesNavigator)} />
        <Tabs.Screen name="Events" component={clone(this.props.user, EventsNavigator)} />
        <Tabs.Screen name="Friends" component={clone(this.props.user, FriendsNavigator)} />
      </Tabs.Navigator>
    )
  }
}