import React from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import user from '../User';
import firebase from 'firebase';


export default class FriendsScreen extends React.Component {

	makeFriend(user) {
	  firebase
	    .database()
	    .ref('Friends')
	    .push({
	      friendRequested: user,
		});
		Alert.alert('Friend request sent!')
	}
	
	onPress = () => {this.makeFriend(user.uid)};
	
	render() {
		return (
			<View>
				<TouchableOpacity style = {styles.button} onPress={this.onPress}>
					<Text style = {styles.buttonText}>Make a Friend</Text>
				</TouchableOpacity>
			</View>
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
