import React from 'react';
import {Button, Alert, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ScheduleScreen from '../screens/Schedule.Screen';
import ViewClassmatesScreen from '../screens/ViewClassmates.Screen';
import ViewProfileScreen from '../screens/ViewProfile.Screen';
import MessagesScreen from '../screens/Messages.Screen';


const Stack = createStackNavigator();

export default class ScheduleNavigator extends React.Component {


  render() {    
    return(
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      >
      <Stack.Screen component={ScheduleScreen} name="Schedule"/>

      <Stack.Screen component={ViewClassmatesScreen} name="View Classmates" />
        <Stack.Screen component={ViewProfileScreen} name="View Profile"  />
        <Stack.Screen component={MessagesScreen} name="Messages" />

        
        </Stack.Navigator>
    )
}
} 
