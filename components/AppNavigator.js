import React from 'react';
import HomeScreen from './screens/Home.Screen';
import ScheduleScreen from './screens/Schedule.Screen';
import MessagesScreen from './screens/Messages.Screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator();

function clone(user, Component) {
  return ({ props }) => <Component user={user} {...props} />;
}

export default class AppNavigator extends React.Component {
  render() {
    return (
      <Tabs.Navigator>
        <Tabs.Screen name="Home" component={clone(this.props.user, HomeScreen)} options={{ title: 'Home' }} />
        <Tabs.Screen name="Schedule" component={clone(this.props.user, ScheduleScreen)} />
        <Tabs.Screen name="Messages" component={clone(this.props.user, MessagesScreen)} />
      </Tabs.Navigator>
    )
  }
}