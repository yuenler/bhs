import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import user from '../User';
import firebase from 'firebase';


export default class FriendsScreen extends React.Component {

	state = {
		ready: false,
		matchName: "",
		matchEmail: ""
	};
	
	componentDidMount() {
	try{
		firebase.database().ref('Matches/' + user.uid).on('value', (snapshot) => {
		this.setState({
			matchName: snapshot.val().matchName,
			matchEmail: snapshot.val().matchEmail
		});
	});
	}
	catch(error){

	}
	this.setState({ready:true});
	}



	makeFriend(userName, userEmail, userUID){
		let available = false;
		let matchedName = "";
		let matchedUID = "";
		firebase.database().ref('Friends').on('value', (snapshot) => {
			available = ! snapshot.val().matched
			matchedName = snapshot.val().name
			matchedUID = snapshot.val().uid
		});
		if (available == true){
			if (matchedUID === userUID){
				available = false;
			}
		}
		
		if (available){
			Alert.alert('You have matched with ' + matchedName + "!")
			firebase
			.database()
			.ref('Matches/' + matchedUID)
			.set({
			  matchName: userName,
			  matchEmail: userEmail 
			});
			firebase
			.database()
			.ref('Friends')
			.set({
			  matched: true 
			});
		}
		else{
			this.postFriend(userName, userEmail, userUID)
		}
	}


	postFriend(userName, userEmail, userUID) {
	  firebase
	    .database()
	    .ref('Friends')
	    .set({
		  name: userName,
		  email: userEmail,
		  uid: userUID,
		  matched: false 
		});
		Alert.alert('Friend request sent!')
	} 

	
	onPress = () => {this.makeFriend(user.displayName, user.email, user.uid)};
	
	render() {
		if (! this.state.ready){
			return(<View><Text>Loading...</Text></View>)
		}
		return (
			<View>
				<TouchableOpacity style = {styles.button} onPress={this.onPress}>
					<Text style = {styles.buttonText}>Make a Friend</Text>
				</TouchableOpacity>
				<Text>Your matched friend is {this.state.matchName}</Text>

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
