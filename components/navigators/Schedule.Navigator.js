import React from 'react';
import {Button, Alert, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ScheduleScreen from '../screens/Schedule.Screen';
import CustomizationScreen from '../screens/Customization.Screen';
import * as firebase from 'firebase';

const Stack = createStackNavigator();

export default class ScheduleNavigator extends React.Component {

  signOut()
  {
    Alert.alert(
      "Are you sure you want to sign out?",
      "",
      [
        {
        text: "Cancel",
        style: "cancel"
        },
        { text: "Yes", onPress: () => firebase.auth().signOut()}
      ],
      { cancelable: true }
      );
  }

  render() {    
    if (Platform.OS === 'ios') {
    return (
      <Stack.Navigator>
        <Stack.Screen component={ScheduleScreen} name="Schedule" 
          options={{
          headerStyle: {
            backgroundColor: '#871609',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerLeft:() => (
            <Button
              onPress={() => this.props.navigation.navigate("Customize")}
              title="Customize"
            />
          ),
          headerRight: () => (
            <Button
              onPress={() => this.signOut()}
              title="Sign Out"
            />
          )
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
      </Stack.Navigator>
    )
  } if (Platform.OS === 'android') {
    return (
      <Stack.Navigator>
        <Stack.Screen component={ScheduleScreen} name="Schedule" 
          options={{
          headerStyle: {
            backgroundColor: '#871609',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: 0, marginBottom: 0}}>
            <Button
              onPress={() => this.props.navigation.navigate("Customize")}
              title="Customize"
            />
            </View>
            <View style={{marginLeft: 10}}>
            <Button
              onPress={() => this.signOut()}
              title="Sign Out"
            />
            </View>
            </View>
          )
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
      </Stack.Navigator>
    )
  }
}
} 
