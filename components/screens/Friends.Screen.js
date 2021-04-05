import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Alert, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import user from '../User';
import firebase from 'firebase';
import { MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import ThemedListItem from 'react-native-elements/dist/list/ListItem';



export default class FriendsScreen extends React.Component {

	state = {
		available: false,
		ready: false,
		phoneNumber: "",
		matchName: "",
		matchEmail: "",
		matchPhoneNumber: "",
		matchUID: "",
		available: false,
		potentialName: "",
		potentialEmail: "",
		potentialPhoneNumber: "",
		potentialUID: "",
		deleteButton: "Delete Friend"
	};
	
	componentDidMount() {
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			this.retrieveData();
		  });
			this.retrieveData();
			
			firebase.database().ref('Matches/' + user.uid).on('value', (snapshot) => {
	
				if (snapshot.hasChild("matchName")){
					this.setState({
						matchName: snapshot.val().matchName,
						matchEmail: snapshot.val().matchEmail,
						matchPhoneNumber: snapshot.val().matchPhoneNumber,
						matchUID: snapshot.val().matchUID,
					});
		
				}
			
		});

		firebase.database().ref('Friends').on('value', (snapshot) => {
			this.state.available = ! snapshot.val().matched
			this.state.potentialName = snapshot.val().name
			this.state.potentialUID = snapshot.val().uid
			this.state.potentialEmail = snapshot.val().email
			this.state.potentialPhoneNumber = snapshot.val().phoneNumber
		});

		if (this.state.potentialUID === user.uid){
			this.state.deleteButton = "Delete Friend Request"
		}

		
	}

		  componentWillUnmount() {
			this._unsubscribe();
		  }
	  


	retrieveData() {
        firebase.database().ref('Users/' + user.uid).on('value', (snapshot) => {
			this.setState({phoneNumber: snapshot.val().phoneNumber})
		})
    }


	makeFriend(userName, userEmail, userPhoneNumber, userUID){
		if(userPhoneNumber == null){
			Alert.alert(
				"You need to add your phone number!",
				"You need to enter your phone number in the Customization screen first so that your matched friend can easily contact you. If you do not feel comfortable sending out your phone number, please enter 555-555-5555 in the phone number field in the customization screen. Note that this will mean that your matched friend will only be able to contact you through your school email.",
				[
				  {
					text: "Cancel",
					style: "cancel"
				  },
				  { text: "Customize", onPress: () => this.props.navigation.navigate('Customize')}
				],
				{ cancelable: false }
			  );
		}
		else{
		
		//so that you don't match with yourself
		if (this.state.available && this.state.potentialUID === userUID){
				Alert.alert(
					"Your friend request has already been sent!",
				  );
			}
		else if (this.state.matchName != ""){
				Alert.alert(
					"Error",
					"Please delete your current friend before requesting another!",
				  );
			}
		else if (this.state.available){
			Alert.alert('You have matched with ' + this.state.potentialName + "!")
			firebase
			.database()
			.ref('Matches/' + this.state.potentialUID)
			.set({
			  matchName: userName,
			  matchEmail: userEmail,
			  matchPhoneNumber: userPhoneNumber,
			  matchUID: userUID
			});
			firebase
			.database()
			.ref('Matches/' + user.uid)
			.set({
			  matchName: this.state.potentialName,
			  matchEmail: this.state.potentialEmail,
			  matchPhoneNumber: this.state.potentialPhoneNumber, 
			  matchUID: this.state.potentialUID,
			});
			firebase
			.database()
			.ref('Friends')
			.set({
			  matched: true 
			});
			this.state.matchName = this.state.potentialName;
			this.state.matchEmail = this.state.potentialEmail;
			this.state.matchPhoneNumber = this.state.potentialPhoneNumber;
			this.state.matchUID = this.state.potentialUID;
		}
		else{
			this.postFriend(userName, userEmail, userPhoneNumber, userUID)
		}
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
		Alert.alert(
			"Friend request sent!",
			"Your friend request has been sent to our database. You will be matched with the next BHS student that also requests a friend.",
		  );
		this.setState({deleteButton: "Delete Friend Request"})
	} 

	deleteFriend(userUID){
		if (userUID === this.state.potentialUID){
			firebase
			.database()
			.ref('Friends')
			.set({
			  matched: true 
			});
			this.setState({deleteButton: "Delete Friend"})
			Alert.alert("Friend request deleted!")
		}
		else if (this.state.matchName === ""){
			Alert.alert("You don't have any friends or friend requests to delete!")
		}
		else{
		let userRef = firebase.database().ref('Matches/' + userUID);
		userRef.set({
			matchName: "",
			matchEmail: "",
			matchPhoneNumber: "",
			matchUID: "",
		  });
		let matchUserRef = firebase.database().ref('Matches/' + this.state.matchUID);
		matchUserRef.set({
			matchName: "",
			matchEmail: "",
			matchPhoneNumber: "",
			matchUID: "",
		  });

		this.setState({
			matchName: "",
			matchEmail: "",
			matchPhoneNumber: "",
			matchUID: "",
		});
		Alert.alert('Friend successfully deleted!')
		}
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

		if (!this.state.ready){
			return(null);
		  }

		var idxPSBMA = user.email.indexOf('@psbma.org');
		if(this.state.ready && idxPSBMA > -1){
			return(
			<View style={styles.container}>
			  <Text style={{color: 'white', margin: 30}}>This screen is only available for students with brooklinek12.org domain emails.</Text>
			  </View>
			);
		  }
		  else{
		return (
			
			<View style={styles.container}>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity style = {styles.button} onPress={this.onPress}>
					<Text style = {styles.buttonText}>Add Friend</Text>
				</TouchableOpacity>
				</View>

				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity style = {styles.deleteFriendButton} onPress={this.onDelete}>
					<Text style = {styles.buttonText}>{this.state.deleteButton}</Text>
				</TouchableOpacity>
				</View>

				<View style={styles.matchAnnouncementContainer}>
				<Text style={styles.result}>Suggested Friend:</Text>
				<Text style={styles.result}>{this.state.matchName}</Text>
				</View>

				<View style = {styles.contactContainer}>
					
				<View style={{flex:1, marginHorizontal: 20}}>

				<MaterialCommunityIcons.Button backgroundColor="#871609" style={styles.contactButton} name='message'  onPress={() => this.contact('sms:' + this.state.matchPhoneNumber)}>Text</MaterialCommunityIcons.Button>
				</View>

				<View style={{flex:1, marginHorizontal: 20}}>
				<MaterialCommunityIcons.Button backgroundColor="#871609" style={styles.contactButton} name='phone'  onPress={() => this.contact('tel:' + this.state.matchPhoneNumber)}>Call</MaterialCommunityIcons.Button>
				</View>
	
				</View>

				<View style = {styles.contactContainer}>

				<View style={{flex:1, marginHorizontal: 20}}>
				<Ionicons.Button backgroundColor="#871609" style={styles.contactButton} name='ios-videocam'  onPress={() => this.contact('facetime:' + this.state.matchPhoneNumber)}>Video</Ionicons.Button>
				</View>

				<View style={{flex:1, marginHorizontal: 20}}>
				<MaterialCommunityIcons.Button backgroundColor="#871609" style={styles.contactButton} name='email'  onPress={() => this.contact('mailto:' + this.state.matchEmail)}>Email</MaterialCommunityIcons.Button>
				</View>

				</View>
			</View>
		);
		  }
	}
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#0e4bb0',
		padding: 20,
		borderRadius: 10,
		
	},
	deleteFriendButton: {
		backgroundColor: '#871609',
		padding: 20,
		borderRadius: 10,
	},
	contactButton: {
		padding: 20,
		borderRadius: 10,
	},
	buttonText: {
		fontSize: 20,
		color: '#fff',
		fontFamily: 'Red Hat Display'
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#ededed',
		alignItems: 'center',
		justifyContent: 'center',
	},
	contactContainer: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		 justifyContent: 'center'
		
	},
	matchAnnouncementContainer:{
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	result: {
	color:'#FFFFFF', 
	fontSize: 30, 
	fontFamily: 'Red Hat Display',
	textAlign: 'center'
	}
});
