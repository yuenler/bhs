import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

export default class FriendsScreen extends React.Component {

	makeFriend(userId, request) {
	  firebase
	    .database()
	    .ref('users/' + userId)
	    .set({
	      friendRequested: true,
	    });
	}
	
	onPress = () => {this.makeFriend(userId, true)};
	
	render() {
		return (
			<View>
				<TouchableOpacity onPress={this.onPress}>
					<Text>Make a Friend</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
