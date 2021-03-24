import React from 'react';
import {Button, Alert, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ScheduleScreen from '../screens/Schedule.Screen';

const Stack = createStackNavigator();

export default class ScheduleNavigator extends React.Component {


  render() {    
    return(
      <Stack.Navigator>
      <Stack.Screen component={ScheduleScreen} name="Schedule" 
            options={{
            headerStyle: {
              backgroundColor: '#27187E',
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
