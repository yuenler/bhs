import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Alert, Linking } from 'react-native';



export default class ProfileScreen extends React.Component {

	
	
	render() {
		
		return (
			<View style={styles.container}>
				<Text>Profile Screen</Text>
			</View>
					
		);
		  }
	}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#0F182D',
	},
});
