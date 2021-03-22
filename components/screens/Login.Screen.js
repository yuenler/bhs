import React from 'react';
import { SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View, Alert } from 'react-native';
import ApiKeys from '../../ApiKeys';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import {Ionicons} from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import user from "../User";


const styles = StyleSheet.create({
  
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 60,
    borderRadius: 10,
    margin: 5,
    padding: 5
  },
	buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
      color: '#fff',
      padding: 20
	},
	container: {
		flex: 1,
		backgroundColor: '#0F182D',
		alignItems: 'center',
		justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Red Hat Display',
    textAlign: 'center',
    color: '#fff',
  },
  titleContainer: {
    marginHorizontal: 10,
    marginBottom: 80
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  bhsLogo: {
    width: 150,
    height: 150,
  },
  imageContainer: {
    margin: 0,
  },
  warning:{
    color: "#FFF",
    fontFamily: 'Red Hat Display',
  }
})

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  async signIn() {
    var that = this;
    try {
      const result = await Google.logInAsync({
        androidClientId: ApiKeys.GoogleConfig.androidClientId,
        iosClientId: ApiKeys.GoogleConfig.iosClientId,
        androidStandaloneAppClientId: ApiKeys.GoogleConfig.androidStandaloneAppClientId,
        iosStandaloneAppClientId: ApiKeys.GoogleConfig.iosStandaloneAppClientId,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase.auth()
          .signInWithCredential(credential)
          .catch(error => {
            Alert.alert(
              "Couldn\'t sign in with Google",
              error.toString(),
              );
          }).then(user =>
            that.registerForPushNotificationsAsync(user)
          );

      } else {
        Alert.alert(
          "Couldn\'t sign in with Google");
      }
    } catch (err) {
      Alert.alert(
        "Couldn\'t sign in with Google",
        err.toString(),
        );
    }
  }

  
  registerForPushNotificationsAsync = async () => {
    const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    // POST the token to our backend so we can use it to send pushes from there
    var updates = {}
    updates['/expoToken'] = token
    await firebase.database().ref('/Users/' + user.uid).update(updates)
    //call the push notification 
}

  render() {
    return (
        <View style={styles.container}>

          <View style={styles.imageContainer}>
          <Image
              style={styles.bhsLogo}
              source={require('../../assets/bhs.png')}
            />
          </View>

          <View style={styles.titleContainer}>
          <Text style={styles.title}>WELCOME TO THE OFFICIAL BROOKLINE HIGH SCHOOL APP</Text>        
          </View>

          <Text style={styles.warning}>You must sign in with your school email address.</Text>

          <TouchableOpacity  onPress={() => this.signIn()} style = {styles.button}>
              <Image
              style={styles.tinyLogo}
              source={require('../../assets/google.jpg')}
            />

            <Text style = {styles.buttonText}>Sign in with Google</Text>
            </TouchableOpacity>
                  
        </View>
    );
  }
}

