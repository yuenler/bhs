import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

export default class FriendsScreen extends React.Component {
	makeFriend = () => {
		// connect to firebase
	}
	onPress = () => { this.makeFriend };
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
