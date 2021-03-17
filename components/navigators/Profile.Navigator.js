import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/Profile.Screen';

const Stack = createStackNavigator();

export default class ProfileNavigator extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen component={ProfileScreen} name="Profile" 
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