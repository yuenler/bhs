import React from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
            Alert.alert('Couldn\'t sign in with Google: ' + error);
          });
      } else {
        Alert.alert('Couldn\'t sign in with Google');
      }
    } catch (err) {
      Alert.alert('Couldn\'t sign in with Google: ' + error);
    }
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>

          <TouchableOpacity  onPress={() => this.signIn()} style = {styles.button}>
            <Text style = {styles.buttonText}>Login with Google</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
	button: {
		backgroundColor: 'blue',
		padding: 20,
		borderRadius: 20,
	},
	buttonText: {
		fontSize: 20,
    	color: '#fff',
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
