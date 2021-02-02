import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Alert, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import user from '../User';
import firebase from 'firebase';
import { MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';



export default class FriendsScreen extends React.Component {

	state = {
		ready: false,
		phoneNumberLoaded: false,
		phoneNumber: "",
		matchName: "",
		matchEmail: "",
		matchPhoneNumber: ""
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


	retrieveData = async()  => {
        try{
	  this.state.phoneNumber = await AsyncStorage.getItem('phoneNumber');

      this.setState({phoneNumberLoaded: true})
        }
        catch(error){
            console.info(error);
    }
    }


	makeFriend(userName, userEmail, userUID){

		if(this.state.phoneNumber == null){
		  Alert.alert('Hi')
		}

		let available = false;
		let matchedName = "";
		let matchedUID = "";
		firebase.database().ref('Friends').on('value', (snapshot) => {
			available = ! snapshot.val().matched
			matchedName = snapshot.val().name
			matchedUID = snapshot.val().uid
		});
		//so that you don't match with yourself
		if (available == true){
			if (matchedUID === userUID){
				available = false;
			}
			if (this.state.matchName == ""){
				available = false;
				Alert.alert("Please delete your current friend before requesting another!")
			}
		}
		
		if (available){
			Alert.alert('You have matched with ' + matchedName + "!")
			firebase
			.database()
			.ref('Matches/' + matchedUID)
			.set({
			  matchName: userName,
			  matchEmail: userEmail,
			  matchPhoneNumber: userPhoneNumber 
			});
			firebase
			.database()
			.ref('Friends')
			.set({
			  matched: true 
			});
		}
		else{
			this.postFriend(userName, userEmail, userPhoneNumber, userUID)
		}
	}


	postFriend(userName, userEmail, userPhoneNumber, userUID) {
	  firebase
	    .database()
	    .ref('Friends')
	    .set({
		  name: userName,
		  email: userEmail,
		  phoneNumber: userPhoneNumber,
		  uid: userUID,
		  matched: false 
		});
		Alert.alert('Friend request sent!')
	} 

	deleteFriend(userUID){
		let userRef = firebase.database().ref('Matches/' + userUID);
		userRef.remove()
		this.state.matchName = "";
		this.state.matchEmail = "";
		this.state.matchPhoneNumber = "";
		Alert.alert('Friend successfully deleted!')
	}

	onPress = () => {this.makeFriend(user.displayName, user.email, this.state.phoneNumber, user.uid)};

	onDelete = () => {this.deleteFriend(user.uid)};

	contact = (link) =>
	{
		if (this.state.matchName != ""){
			Linking.openURL(link)
		}
		else{
			Alert.alert("You need to match with a friend first!")
		}
	};
	
	render() {
		if (! this.state.ready || ! this.state.phoneNumberLoaded){
			return(<View><Text>Loading...</Text></View>)
		}

		return (
			
			<View style={styles.container}>
				<TouchableOpacity style = {styles.button} onPress={this.onPress}>
					<Text style = {styles.buttonText}>Make a Friend</Text>
				</TouchableOpacity>

				<TouchableOpacity style = {styles.deleteFriendButton} onPress={this.onDelete}>
					<Text style = {styles.buttonText}>Delete Friend</Text>
				</TouchableOpacity>

				<View style={styles.matchAnnouncementContainer}>
				<Text style={styles.result}>Your matched friend is:</Text>
				<Text style={styles.result}>{this.state.matchName}</Text>
				</View>

				<View style = {styles.contactContainer}>
					
				<View style={{flex:1, margin: 20}}>

				<MaterialCommunityIcons.Button backgroundColor="#4287f5" style={styles.contactButton} name='message'  onPress={() => this.contact('sms:' + this.state.matchPhoneNumber)}>Text</MaterialCommunityIcons.Button>
				</View>

				<View style={{flex:1, margin: 20}}>
				<MaterialCommunityIcons.Button backgroundColor="#3b5998" style={styles.contactButton} name='phone'  onPress={() => this.contact('tel:' + this.state.matchPhoneNumber)}>Call</MaterialCommunityIcons.Button>
				</View>
	
				</View>

				<View style = {styles.contactContainer}>

				<View style={{flex:1, margin: 20}}>
				<Ionicons.Button backgroundColor="#0cc42a" style={styles.contactButton} name='ios-videocam'  onPress={() => this.contact('facetime:' + this.state.matchPhoneNumber)}>FaceTime</Ionicons.Button>
				</View>

				<View style={{flex:1, margin: 20}}>
				<MaterialCommunityIcons.Button backgroundColor="#c42e0c" style={styles.contactButton} name='email'  onPress={() => this.contact('mailto:' + this.state.matchEmail)}>Email</MaterialCommunityIcons.Button>
				</View>

				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#0e4bb0',
		padding: 20,
		borderRadius: 20,
		
	},
	deleteFriendButton: {
		backgroundColor: '#c90606',
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
		fontFamily: 'Red Hat Display'
	},
	container: {
		flex: 1,
		backgroundColor: '#0F182D',
		alignItems: 'center',
		justifyContent: 'center',
	},
	contactContainer: {
		flexDirection: 'row',
		
	},
	matchAnnouncementContainer:{
		margin: 20,
	},
	result: {
	color:'#FFFFFF', 
	fontSize: 30, 
	fontFamily: 'Red Hat Display',
	textAlign: 'center'
	}
});
