import React from 'react';
import LoginScreen from './Login.Screen';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class NotLoggedInScreen extends React.Component {
  render() {
    return (
      <LoginScreen />
    )
  }
}