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
		phoneNumber: "",
		matchName: "",
		matchEmail: "",
		matchPhoneNumber: "",
		matchUID: "",

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
	}

		  componentWillUnmount() {
			this._unsubscribe();
		  }
	  


	retrieveData = async()  => {
        try{
			this.state.phoneNumber = await AsyncStorage.getItem('phoneNumber');
        }
        catch(error){
            console.info(error);
	}
	this.setState({ready: true})
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
		let available = false;
		let matchedName = "";
		let matchedUID = "";
		let matchedEmail = "";
		let matchedPhoneNumber = ""; 
		firebase.database().ref('Friends').on('value', (snapshot) => {
			available = ! snapshot.val().matched
			matchedName = snapshot.val().name
			matchedUID = snapshot.val().uid
			matchedEmail = snapshot.val().email
			matchedPhoneNumber = snapshot.val().phoneNumber
		});
		//so that you don't match with yourself
		if (available && matchedUID === userUID){
				available = false;
				Alert.alert(
					"Your friend request has already been sent!",
				  );
			}
		else if (this.state.matchName != ""){
				available = false;
				Alert.alert(
					"Error",
					"Please delete your current friend before requesting another!",
				  );
			}
		else if (available){
			Alert.alert('You have matched with ' + matchedName + "!")
			firebase
			.database()
			.ref('Matches/' + matchedUID)
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
			  matchName: matchedName,
			  matchEmail: matchedEmail,
			  matchPhoneNumber: matchedPhoneNumber, 
			  matchUID: matchedUID,
			});
			firebase
			.database()
			.ref('Friends')
			.set({
			  matched: true 
			});
			this.state.matchName = matchedName;
			this.state.matchEmail = matchedEmail;
			this.state.matchPhoneNumber = matchedPhoneNumber;
			this.state.matchUID = matchedUID;
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
		Alert.alert('Friend request sent!')
	} 

	deleteFriend(userUID){

		if (this.state.matchName === ""){
			Alert.alert("You don't have any friends to delete!")
		}
		else{
		let userRef = firebase.database().ref('Matches/' + userUID);
		userRef.remove()
		let matchUserRef = firebase.database().ref('Matches/' + this.state.matchUID);
		matchUserRef.remove()

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
