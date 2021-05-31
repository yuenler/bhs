import React, { useReducer, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, Linking, Button, TouchableOpacity } from 'react-native';
import {Image} from 'react-native-elements';
import user from "../User";
import firebase from 'firebase';
import {globalStyles} from '../GlobalStyles';



export default class ClubProfileScreen extends React.Component {

	state = {
		name: "",
		meetingTime: "",
		advisor: "",
		room: "",
		pfp: ""
	}


	retrieveData() {
        
		
	  }

	  componentDidMount() {
		// this._unsubscribe = this.props.navigation.addListener('focus', () => {
		// 	this.retrieveData();
		//   });
		  
		  this.retrieveData();
	  }

	//   componentWillUnmount() {
	// 	this._unsubscribe();
	//   }

	 
	
	render() {

		// useEffect(() => {
		// 	(async () => {
		// 	if (Platform.OS !== 'web') {
		// 		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		// 		if (status !== 'granted') {
		// 		alert('Sorry, we need camera roll permissions to make this work!');
		// 		}
		// 	}
		// 	})();
		// }, []);

		return (
			<View style={globalStyles.container}>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				{this.state.image && <Image source={{ uri: this.state.image }} style={globalStyles.pfp} />}
				<Text style={styles.displayName}>{this.state.name}</Text>

				</View>

				<View>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Create Club Profile')}>
						<Text style={{color: 'white'}}>Edit Profile</Text>
					</TouchableOpacity>
				</View>
				
				<View style={{flex: 1}}>
				<Text style= {styles.scheduleText}>{this.state.meetingTime}</Text>
				<Text style= {styles.scheduleText}>{this.state.advisor}</Text>
				
				</View>

			</View>
					
		);
		  }
	}


const styles = StyleSheet.create({
	/*container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#ededed',
	},*/
	displayName: {
		color: 'white'
	},
	scheduleText: {
		color: 'white'
	},
	/* pfp:{
		width: 150,
    	height: 150,
		borderRadius: 100
	}, */
	

});
