import React from 'react';
import { SafeAreaView, Text } from 'react-native';

export default class FriendsScreen extends React.Component {
	makeFriend = () => {
        	// connect to firebase
    	}
	const onPress = () => {this.makeFriend};
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
