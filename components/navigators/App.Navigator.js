import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScheduleNavigator from './Schedule.Navigator';
import MapNavigator from './Map.Navigator';
import EventsNavigator from './Events.Navigator';
import FriendsNavigator from './Friends.Navigator';
import { clone } from '../clone';

const Tabs = createBottomTabNavigator();

export default class AppNavigator extends React.Component {
  render() {
    return (
      <Tabs.Navigator>
        <Tabs.Screen name="Schedule" component={clone(this.props.user, ScheduleNavigator)} />
        <Tabs.Screen name="Map" component={clone(this.props.user, MapNavigator)} />
        <Tabs.Screen name="Events" component={clone(this.props.user, EventsNavigator)} />
        <Tabs.Screen name="Friends" component={clone(this.props.user, FriendsNavigator)} />
      </Tabs.Navigator>
    )
  }
}