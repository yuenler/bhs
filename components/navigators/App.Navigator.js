import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScheduleNavigator from './Schedule.Navigator';
import MessagesNavigator from './Messages.Navigator';
import AnnouncementsNavigator from './Announcements.Navigator';
import FriendsNavigator from './Friends.Navigator';
import { Ionicons } from '@expo/vector-icons';

const Tabs = createBottomTabNavigator();

export default class AppNavigator extends React.Component {
  
  render() {
              

    return (
  
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({color, size }) => {
            let iconName;

            if (route.name === 'Schedule') {
              iconName = 'ios-time';
            } else if (route.name === 'Messages') {
              iconName = 'ios-chatbubbles';
            }
            else if (route.name === 'Announcements') {
              iconName = 'ios-happy';
            }
            else if (route.name === 'Friends') {
              iconName = 'ios-people';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: '#000000',
        },
        }}
        
      >

        <Tabs.Screen name="Schedule" component={ScheduleNavigator} />
        <Tabs.Screen name="Messages" component={MessagesNavigator} />
        <Tabs.Screen name="Announcements" component={AnnouncementsNavigator} />
        <Tabs.Screen name="Friends" component={FriendsNavigator} />
      </Tabs.Navigator>


    )
  }
}