import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Alert, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import user from '../User';
import firebase from 'firebase';
import { MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';



export default class FriendsScreen extends React.Component {

	state = {
		ready: false,
		matchName: "",
		matchEmail: ""
	};
	
	componentDidMount() {
		
		firebase.database().ref('Matches/' + user.uid).on('value', (snapshot) => {

			if (snapshot.hasChild("matchName")){

				this.setState({
					matchName: snapshot.val().matchName,
					matchEmail: snapshot.val().matchEmail
				});
	
			}
		
	});

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
		//so that you don't match with yourself
		// if (available == true){
		// 	if (matchedUID === userUID){
		// 		available = false;
		// 	}
		// }
		
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

	deleteFriend(userUID){
		let userRef = firebase.database().ref('Matches/' + userUID);
		userRef.remove()
		Alert.alert('Friend successfully deleted!')
	}

	onPress = () => {this.makeFriend(user.displayName, user.email, user.uid)};

	onDelete = () => {this.deleteFriend(user.uid)};

	
	render() {
		if (! this.state.ready){
			return(<View><Text>Loading...</Text></View>)
		}

		return (
			
			<View>
				<TouchableOpacity style = {styles.button} onPress={this.onPress}>
					<Text style = {styles.buttonText}>Make a Friend</Text>
				</TouchableOpacity>

				<TouchableOpacity style = {styles.deleteFriendButton} onPress={this.onDelete}>
					<Text style = {styles.buttonText}>Delete Friend</Text>
				</TouchableOpacity>

				<Text>Your matched friend is... {this.state.matchName}</Text>

				<View style = {styles.contactContainer}>
					
				<View style={{flex:1, margin: 20}}>

				<MaterialCommunityIcons.Button backgroundColor="#4287f5" style={styles.contactButton} name='message'  onPress={()=>{ Linking.openURL('sms:' + {phoneNumber})}}>Text</MaterialCommunityIcons.Button>
				</View>

				<View style={{flex:1, margin: 20}}>
				<MaterialCommunityIcons.Button backgroundColor="#3b5998" style={styles.contactButton} name='phone'  onPress={()=>{ Linking.openURL('tel:' + {phoneNumber})}}>Call</MaterialCommunityIcons.Button>
				</View>
	
				</View>

				<View style = {styles.contactContainer}>

				<View style={{flex:1, margin: 20}}>
				<Ionicons.Button backgroundColor="#0cc42a" style={styles.contactButton} name='ios-videocam'  onPress={()=>{ Linking.openURL('facetime:' + {phoneNumber})}}>FaceTime</Ionicons.Button>
				</View>

				<View style={{flex:1, margin: 20}}>
				<MaterialCommunityIcons.Button backgroundColor="#c42e0c" style={styles.contactButton} name='email'  onPress={()=>{ Linking.openURL('mailto:' + this.state.matchEmail)}}>Email</MaterialCommunityIcons.Button>
				</View>

				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'blue',
		padding: 20,
		borderRadius: 20,
		margin: 20,
		
	},
	deleteFriendButton: {
		backgroundColor: 'red',
		padding: 20,
		borderRadius: 20,
		margin: 20
	},
	contactButton: {
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
	contactContainer: {
		flexDirection: 'row',
		
	}
});
