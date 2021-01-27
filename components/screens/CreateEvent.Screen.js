import { StatusBar } from "expo-status-bar"; 
import React, { useState } from "react"; 
import firebase from "firebase";
import user from "../User";
import { Button, SafeAreaView, StyleSheet, Modal, View, TextInput, Dimensions, TouchableOpcaity, Text, Alert} from "react-native"; 
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("window"); 

export default class CustomizationScreen extends React.Component {
	storeText(title, text) {
		firebase
		  .database()
		  .ref('Events')
		  .push({
			postTitle: title,
			post: text,
		  });
		  Alert.alert('You event has been successfully published!')
	  }

	handlePost(title, text){
		this.storeText(title, text)
		//code to navigate back to events screen
	}
	  

	state = {
        title: "",
        text: ""
	};

	render() {
	return ( 
		<SafeAreaView style={styles.screen}> 
			<StatusBar style="auto" /> 
				<TextInput placeholder="Event title"
						style={styles.textInput} 
						onChangeText={title => this.setState({ title })}
          				value={this.state.title} /> 
				<TextInput placeholder="Describe your event..."
						style={styles.textInput} 
						onChangeText={text => this.setState({ text })}
          				value={this.state.text} /> 
			<TouchableOpacity style = {styles.button} onPress = {() => {
					this.handlePost(this.state.title, this.state.text)
				}}>
					<Text style={styles.buttonText}>Post!</Text>
			</TouchableOpacity>
		</SafeAreaView> 
	); 
} 
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
