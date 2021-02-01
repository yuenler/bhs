import React from 'react';
import {Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ScheduleScreen from '../screens/Schedule.Screen';
import CustomizationScreen from '../screens/Customization.Screen';
import * as firebase from 'firebase';


const Stack = createStackNavigator();

export default class ScheduleNavigator extends React.Component {

  signOut()
  {
    firebase.auth().signOut().then(function() {
      console.log('Signed Out');
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen component={ScheduleScreen} name="Schedule" 
          options={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <Button
              onPress={() => this.signOut()}
              title="Sign Out"
              // color="#00cc00"
            />
          ),
          
          }} 
          />
        <Stack.Screen component={CustomizationScreen} name="Customize" />
      </Stack.Navigator>
    )
  }
}