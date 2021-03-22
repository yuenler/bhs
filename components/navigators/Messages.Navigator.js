import React from 'react';
import {Alert, Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import MessagesScreen from '../screens/Messages.Screen';
import ClassesScreen from '../screens/Classes.Screen';
import ViewClassmatesScreen from '../screens/ViewClassmates.Screen';
import firebase from "firebase";

const Stack = createStackNavigator();


export default class MessagesNavigator extends React.Component {

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen component={ClassesScreen} name="Classes" 
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
      </Stack.Navigator>
    )
  }
}