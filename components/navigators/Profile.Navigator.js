import React from 'react';
import {Button, Alert, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/Profile.Screen';
import CreateClubProfileScreen from '../screens/CreateClubProfile.Screen';
import ClubProfileScreen from '../screens/ClubProfile.Screen';
import CustomizationScreen from '../screens/Customization.Screen';
import SettingsScreen from '../screens/Settings.Screen';
import ViewProfileScreen from '../screens/ViewProfile.Screen';
import * as firebase from 'firebase';


const Stack = createStackNavigator();

export default class ProfileNavigator extends React.Component {


  render() {


      return (
        <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        >
          
          <Stack.Screen component={ProfileScreen} name="Profile" 
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
                onPress={() => this.signOut()}
                title="Sign Out"
              />
            ),
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
            
            <Stack.Screen component={CreateClubProfileScreen} name="Create Club Profile" 
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
        <Stack.Screen component={ClubProfileScreen} name="Club Profile" 
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
        <Stack.Screen component={CustomizationScreen} name="Customize" 
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
        <Stack.Screen component={SettingsScreen} name="Settings" 
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