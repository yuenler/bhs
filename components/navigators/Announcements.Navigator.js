import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AnnouncementsScreen from '../screens/Announcements.Screen';
import CreateAnnouncementsScreen from '../screens/CreateAnnouncement.Screen';
import ViewProfileScreen from '../screens/ViewProfile.Screen';
import ViewFullAnnouncementScreen from '../screens/ViewFullAnnouncement.Screen';

import {Icon} from 'react-native-elements'

const Stack = createStackNavigator();

export default class AnnouncementsNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen component={AnnouncementsScreen} name="Announcements"
        options={{
          headerStyle: {
            backgroundColor: '#871609',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <Icon
              onPress={() => this.props.navigation.navigate('Create Announcement')}
              name="plus"
              type = "ant-design"
              color = '#000000'
              raised
            />
          )

        }}
        />
        <Stack.Screen component={CreateAnnouncementsScreen} name="Create Announcement" 
        options={{
          headerStyle: {
            backgroundColor: '#871609',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

        }}
        />

    <Stack.Screen component={ViewProfileScreen} name="View Profile" 
        options={{
          headerStyle: {
            backgroundColor: '#871609',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

        }}
        />

      <Stack.Screen component={ViewFullAnnouncementScreen} name="View Full Announcement" 
        options={{
          headerStyle: {
            backgroundColor: '#871609',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

        }}
        />
        
      </Stack.Navigator>
    )
  }
}