import { StatusBar } from "expo-status-bar"; 
import React, { useState } from "react"; 
import firebase from "firebase";
import user from "../User";
import { Button, SafeAreaView, StyleSheet, Modal, View, TextInput, Dimensions, TouchableOpcaity, Text, Alert} from "react-native"; 
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("window"); 

export default class CreateAnnouncementsScreen extends React.Component {
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
		this.props.navigation.navigate('Announcements')
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
						multiline
						style={styles.textInput} 
						onChangeText={text => this.setState({ text })}
          				value={this.state.text} /> 
			<TouchableOpacity style = {styles.button} onPress = {() => {
					Alert.alert(
						"Are you sure you want to post?",
						"If you continue, your post will be publicly viewable by everyone who has downloaded this app. By continuing, you acknowledge that your post is relevant and appropriate for the Brookline High School community. If our team deems that your post does not satisfy these conditions, we reserve the right to remove your post from our app. ",
						[
						  {
							text: "Cancel",
							style: "cancel"
						  },
						  { text: "Continue", onPress: () => this.handlePost(this.state.title, this.state.text)}
						],
						{ cancelable: false }
					  );

					
				}}>
					<Text style={styles.buttonText}>Post</Text>
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
		alignItems: "center", 
		borderRadius: 20,
	},
	buttonText: {
		fontSize: 20,
    	color: '#fff',
	},
});
