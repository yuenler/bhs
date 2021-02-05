import React from 'react';
import { SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, View, Alert } from 'react-native';
import ApiKeys from '../../ApiKeys';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import {Ionicons} from '@expo/vector-icons';


const styles = StyleSheet.create({
  
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 60,
    borderRadius: 5,
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
    marginBottom: 100
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
    try {
      const result = await Google.logInAsync({
        androidClientId: ApiKeys.GoogleConfig.androidClientId,
        iosClientId: ApiKeys.GoogleConfig.iosClientId,
        androidStandaloneAppClientId: ApiKeys.GoogleConfig.androidStandaloneAppClientId,
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
          });
      } else {
        Alert.alert(
          "Couldn\'t sign in with Google",
          error.toString(),
          );
      }
    } catch (err) {
      Alert.alert(
        "Couldn\'t sign in with Google",
        err.toString(),
        );
    }
  }

  render() {
    return (
        <View style={styles.container}>

          <View style={styles.imageContainer}>
          <Image
              style={styles.bhsLogo}
              source={require('../../bhs.png')}
            />
          </View>

          <View style={styles.titleContainer}>
          <Text style={styles.title}>WELCOME TO THE OFFICIAL BROOKLINE HIGH SCHOOL APP</Text>        
          </View>

          <Text style={styles.warning}>You must sign in with your school email address.</Text>

          <TouchableOpacity  onPress={() => this.signIn()} style = {styles.button}>
              <Image
              style={styles.tinyLogo}
              source={require('../../google.jpg')}
            />

            <Text style = {styles.buttonText}>Sign in with Google</Text>
            </TouchableOpacity>
                  
        </View>
    );
  }
}

