import React from 'react';
import {Button, Alert, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/Profile.Screen';
import CreateClubProfileScreen from '../screens/CreateClubProfile.Screen';
import CustomizationScreen from '../screens/Customization.Screen';
import * as firebase from 'firebase';


const Stack = createStackNavigator();

export default class ProfileNavigator extends React.Component {

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
          <Stack.Screen component={ProfileScreen} name="Profile" 
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
        </Stack.Navigator>
      )
    } if (Platform.OS === 'android') {
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
            headerRight: () => (
              <View style={{flexDirection: 'row'}}>
              <View style={{marginTop: 0, marginBottom: 0}}>
              <Button
                onPress={() => this.props.navigation.navigate("Customize")}
                title="Customize"
              />
              </View>
              <View style={{marginLeft: 10, marginRight: 10}}>
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
        </Stack.Navigator>
      )
    }



    
   
  }
}