import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import ApiKeys from '../../ApiKeys';
import * as firebase from 'firebase';
import * as Google from 'expo-google-app-auth';

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginTop: 20
  },
  title: {
    fontSize: 20
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
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        firebase.auth()
          .signInWithCredential(credential)
          .catch(error => {
            alert('Couldn\'t sign in with Google: ' + error);
          });
      } else {
        alert('Couldn\'t sign in with Google');
      }
    } catch (err) {
      alert('Couldn\'t sign in with Google: ' + error);
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>

          <Text onPress={() => this.signIn()}>Login</Text>
        </View>
      </SafeAreaView>
    );
  }
}