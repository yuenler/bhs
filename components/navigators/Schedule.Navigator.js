import React from 'react';
import {Button, Alert, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ScheduleScreen from '../screens/Schedule.Screen';
import ViewClassmatesScreen from '../screens/ViewClassmates.Screen';
import ViewProfileScreen from '../screens/ViewProfile.Screen';
import MessagesScreen from '../screens/Messages.Screen';
import {Ionicons} from '@expo/vector-icons';


const Stack = createStackNavigator();

export default class ScheduleNavigator extends React.Component {


  render() {    
    return(
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      >
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

      <Stack.Screen component={ViewClassmatesScreen} name="View Classmates" 
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
        <Stack.Screen component={MessagesScreen} name="Messages" 
        options={({ route }) => ({
          title: route.params.block + ' Block - ' + route.params.teacher,
          headerStyle: {
            backgroundColor: '#871609',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <Ionicons.Button
              name = "ios-eye"
              onPress={() => this.props.navigation.navigate('View Classmates',{block:route.params.block, teacher:route.params.teacher})}
            />
          )
        })}
        />

        
        </Stack.Navigator>
    )
}
} 
