import React from 'react';
import { SafeAreaView, Text } from 'react-native';

export default class FriendsScreen extends React.Component {

	function makeFriend(userId, request) {
	  firebase
	    .database()
	    .ref('users/' + userId)
	    .set({
	      friendRequested: true,
	    });
	}
	
	
	const onPress = () => {this.makeFriend(userId, true)};
	render() {
		return (
      </View>
      <TouchableOpacity onPress={onPress}>
        <Text>Make a Friend</Text>
      </TouchableOpacity>
    </View>
		);
	}
}
