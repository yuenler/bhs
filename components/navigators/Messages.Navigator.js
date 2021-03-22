import React from 'react';
import {Alert, Button} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import MessagesScreen from '../screens/Messages.Screen';
import ClassesScreen from '../screens/Classes.Screen';
import firebase from "firebase";

const Stack = createStackNavigator();


export default class MessagesNavigator extends React.Component {
  
  state = {
    uids: [],
    names: [],
  }

  viewClassmates(block, teacher){
    const names = [];
    const uids = [];
    firebase.database().ref('Classes/' + block + '/' + teacher).on('child_added', (snapshot) => {
      this.setState({
        uids: uids.push(snapshot.val().uid),    
      });
    });
    for (let i = 0; i < uids.length; i++){
      firebase.database().ref('Users/' + uids[i]).on('value', (snapshot) => {
        this.setState({names: names.push(snapshot.val().name)})
      });
    }

    let printedNames = ""
    for (let i = 0; i < names.length; i++){
      printedNames += names[i]
    }
    Alert.alert('Classmates', printedNames)
  }

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
              onPress={() => this.viewClassmates(route.params.block, route.params.teacher)}
            />
          )
        })}
        />
      </Stack.Navigator>
    )
  }
}