import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Alert, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import user from '../User';
import firebase from 'firebase';
import { MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import { Icon, ListItem, Avatar } from 'react-native-elements';


export default class FriendsScreen extends React.Component {

	state = {
		available: false,
		matchName: "",
		matchUID: "",
		available: false,
		potentialUID: "",
		button: "Send friend request",
	};
	
	componentDidMount() {
			
		firebase.database().ref('Matches/' + user.uid).on('value', (snapshot) => {
			if (snapshot.hasChild('matchUID')){
			this.setState({
				matchName: snapshot.val().matchName,
				matchUID: snapshot.val().matchUID,
			});
		}
		});

		firebase.database().ref('Friends').on('value', (snapshot) => {
			this.state.available = ! snapshot.val().matched
			this.state.potentialUID = snapshot.val().uid
		});
		if (this.state.potentialUID === user.uid){
			this.setState({button: "Delete Friend Request"})
		}

		
	}


	makeFriend(userUID){
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
			  matchUID: userUID
			});
			firebase
			.database()
			.ref('Matches/' + user.uid)
			.set({
			  matchUID: this.state.potentialUID,
			});
			firebase
			.database()
			.ref('Friends')
			.set({
			  matched: true 
			});
			this.state.matchUID = this.state.potentialUID;
			this.setState({button: "Delete Friend"})
		}
		else{
			this.postFriend(userUID)
		}
	
	}


	postFriend(userUID) {
	  firebase
	    .database()
	    .ref('Friends')
	    .set({
		  uid: userUID,
		  matched: false 
		});
		Alert.alert(
			"Friend request sent!",
			"Your friend request has been sent to our database. You will be matched with the next BHS student that also requests a friend.",
		  );
		this.setState({button: "Delete Friend Request"})
	} 

	deleteFriend(userUID){
		if (userUID === this.state.potentialUID){
			firebase
			.database()
			.ref('Friends')
			.set({
			  matched: true 
			});
			this.setState({button: "Send friend request"})
			Alert.alert("Friend request deleted!")
		}
		else if (this.state.matchName === ""){
			Alert.alert("You don't have any friends or friend requests to delete!")
		}
		else{
		let userRef = firebase.database().ref('Matches/' + userUID);
		userRef.set({
			matchUID: "",
		  });
		let matchUserRef = firebase.database().ref('Matches/' + this.state.matchUID);
		matchUserRef.set({
			matchUID: "",
		  });

		this.setState({
			matchUID: "",
		});
		Alert.alert('Friend successfully deleted!')
		this.setState({button: "Send Friend Request"})
		}
	}

	onPress = () => {
		if (this.state.button === "Send friend request") {
			this.makeFriend(user.uid)
		}
		else{
			this.deleteFriend(user.uid)
		}
	};


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

		var list = []
		
		return (
			
			<View style={styles.container}>
				<Icon name="search" onPress={() => this.props.navigation.navigate('Search')}/>
				<Text>Make new friends</Text>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Text>Classmates</Text>
				{
					list.map((l, i) => (
					<ListItem key={i} bottomDivider>
						<Avatar source={{uri: l.avatar_url}} />
						<ListItem.Content>
						<ListItem.Title>{l.name}</ListItem.Title>
						<ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
						</ListItem.Content>
					</ListItem>
					))
				}
				</View>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Text>Shared interests</Text>
				{
					list.map((l, i) => (
					<ListItem key={i} bottomDivider>
						<Avatar source={{uri: l.avatar_url}} />
						<ListItem.Content>
						<ListItem.Title>{l.name}</ListItem.Title>
						<ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
						</ListItem.Content>
					</ListItem>
					))
				}
				</View>
				<View style={{flex: 1}}>
				<Text>Chat with someone new!</Text>

				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity style = {styles.button} onPress={this.onPress}>
					<Text style = {styles.buttonText}>{this.state.button}</Text>
				</TouchableOpacity>
				</View>

				<View style={styles.matchAnnouncementContainer}>
				<Text style={styles.result}>Suggested Friend:</Text>
				<Text style={styles.result}>{this.state.matchName}</Text>
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
		// alignItems: 'center',
		// justifyContent: 'center',
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
	color:'black', 
	fontSize: 30, 
	fontFamily: 'Red Hat Display',
	textAlign: 'center'
	}
});
