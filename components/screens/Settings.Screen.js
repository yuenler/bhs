import React, { useReducer } from 'react';
import { Text, View, Button, StyleSheet, Alert, TextInput, Linking, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import firebase from "firebase";
import user from "../User";
import * as ImagePicker from 'expo-image-picker';
import {Image, Input} from 'react-native-elements';
import { MaterialIcons} from '@expo/vector-icons';
import {globalStyles} from '../GlobalStyles';

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
