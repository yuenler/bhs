import React from 'react';
import {Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AnnouncementsScreen from '../screens/Announcements.Screen';
import CreateAnnouncementsScreen from '../screens/CreateAnnouncement.Screen';
import ViewProfileScreen from '../screens/ViewProfile.Screen';


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
            <Button
              onPress={() => this.props.navigation.navigate('Create Announcement')}
              title="+"
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
        
      </Stack.Navigator>
    )
  }
}