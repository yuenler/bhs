import React from 'react';
import LoginScreen from '../screens/Login.Screen';
import SetupScreen from '../screens/Setup.Screen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class NotLoggedInScreen extends React.Component {
  render() {
    return (
      <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Setup" component={SetupScreen} />
      </Stack.Navigator>
    )
  }
}