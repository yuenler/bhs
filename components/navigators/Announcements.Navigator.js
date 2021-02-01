import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import AnnouncementsScreen from '../screens/Announcements.Screen';
import CreateAnnouncementsScreen from '../screens/CreateAnnouncement.Screen';

const Stack = createStackNavigator();

export default class AnnouncementsNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen component={AnnouncementsScreen} name="Announcements" />
        <Stack.Screen component={CreateAnnouncementsScreen} name="Create Announcement" />
      </Stack.Navigator>
    )
  }
}