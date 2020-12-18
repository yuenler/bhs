import { StatusBar } from "expo-status-bar"; 
import React, { useState } from "react"; 
import firebase from "firebase";
import user from "../User";
import { Button, SafeAreaView, StyleSheet, Modal, View, TextInput, Dimensions, TouchableOpcaity, Text, Alert} from "react-native"; 
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("window"); 

export default function App() { 

	function storeText(text) {
		firebase
		  .database()
		  .ref('Events')
		  .push({
			post: text,
		  });
		  Alert.alert('You event has been successfully published!')
	  }

	function handlePost(text){
		storeText(text)
		//code to navigate back to events screen
	}
	  

	// This is to manage TextInput State 
	const [inputValue, setInputValue] = useState(""); 

	return ( 
		<SafeAreaView style={styles.screen}> 
			<StatusBar style="auto" /> 
				<TextInput placeholder="Describe your event..."
						value={inputValue} style={styles.textInput} 
						onChangeText={(inputValue) => {
						setInputValue(inputValue)}} /> 
			<TouchableOpacity style = {styles.button} onPress = {() => {
					handlePost(inputValue)
				}}>
					<Text style={styles.buttonText}>Post!</Text>
			</TouchableOpacity>
		</SafeAreaView> 
	); 
} 

// These are user defined styles 
const styles = StyleSheet.create({ 
	screen: { 
		flex: 1, 
		alignItems: "center", 
		justifyContent: "center", 
		backgroundColor: "#fff", 
	}, 
	viewWrapper: { 
		flex: 1, 
		alignItems: "center", 
		justifyContent: "center", 
		backgroundColor: "rgba(0, 0, 0, 0.2)", 
	}, 
	textInput: { 
		width: "80%", 
		borderRadius: 5, 
		paddingVertical: 8, 
		paddingHorizontal: 16, 
		borderColor: "rgba(0, 0, 0, 0.2)", 
		borderWidth: 1, 
		marginBottom: 8, 
	}, 
	button: {
		backgroundColor: 'blue',
		padding: 20,
		borderRadius: 20,
	},
});
