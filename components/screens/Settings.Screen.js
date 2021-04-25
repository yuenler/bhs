import React from 'react';
import {Button, StyleSheet, Alert} from 'react-native';
import firebase from "firebase";

export default class SettingsScreen extends React.Component {

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
	
		return (
			<Button 
			onPress={() => this.signOut()}
			title="Sign Out"/>
		);
	}
}

const styles = StyleSheet.create({
	
});
