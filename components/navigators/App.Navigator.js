import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScheduleNavigator from './Schedule.Navigator';
import AnnouncementsNavigator from './Announcements.Navigator';
import FriendsNavigator from './Friends.Navigator';
import ProfileNavigator from './Profile.Navigator';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage';
import user from "../User";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";



const Tabs = AnimatedTabBarNavigator();

export default class AppNavigator extends React.Component {
  
  state = {
    name: null
  }

  componentDidMount(){
    // this.retrieveData()
  }

  retrieveData(){
    let blocks = ['A', 'B', 'C', 'D', 'E', 'F','G','Z','T','X']
    let keys = []
    for (let i = 0; i<blocks.length; i++){
      keys.push(blocks[i] + 'teacher')
      keys.push(blocks[i] + 'class')
    }
    keys = keys.concat(['activities','grade','pfp'])
    AsyncStorage.multiGet(keys).then(response => {
        this.saveInDatabase(response);
  })
    this.state.name = AsyncStorage.getItem('name')
  }

  saveInDatabase(response){
    for (let i = 0; i < response.length; i++){
      if (response[i][0].indexOf('teacher') !== -1){

        let names = [];
        firebase.database().ref('Classes/' + response[i][0].charAt(0) + '/' + response[i][1]).on('child_added', (snapshot) => {
            names.push(snapshot.val().name)      
        });
        console.log(names)

        //need to change, from now on we should always identify someone with only uid and all info is under the users branch
        // if(!names.includes(this.state.name))
        // firebase
        // .database()
        // .ref('Classes/' + response[i][0].charAt(0) + '/' + response[i][1])
        // .push({
        // name: user.displayName,
        // });
      }
    }
  }

  render() {

    return (
  
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({color, size }) => {
            let iconName;

            if (route.name === 'Schedule') {
              iconName = 'ios-time';
            }
            else if (route.name === 'Announcements') {
              iconName = 'bell';
              return <FontAwesome name={iconName} size={size} color={color} />;
            }
            else if (route.name === 'Friends') {
              iconName = 'ios-people';
            }
            else if (route.name === 'Profile') {
              iconName = 'ios-person';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: '#000000',
        },
        }}
        
      >

        <Tabs.Screen name="Schedule" component={ScheduleNavigator} />
        <Tabs.Screen name="Announcements" component={AnnouncementsNavigator} />
        <Tabs.Screen name="Friends" component={FriendsNavigator} />
        <Tabs.Screen name="Profile" component={ProfileNavigator} />
      </Tabs.Navigator>


    )
  }
}