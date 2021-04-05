import React, { useReducer, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, Linking, Image, Button, TouchableOpacity } from 'react-native';
import user from "../User";
import {colorCode} from '../GlobalColors';
import firebase from 'firebase';


export default class ProfileScreen extends React.Component {

	state = {
	  teachers: {
		'A' : '' , 
		'B' : '' , 
		'C' : '' , 
		'D' : '' , 
		'E' : '' , 
		'F' : '' , 
		'G' : '',
		'Z' : '',
		'T' : '',
		'X' : ''
	  },
	  classNames: {
		'A' : '' , 
		'B' : '' , 
		'C' : '' , 
		'D' : '' , 
		'E' : '' , 
		'F' : '' , 
		'G' : '',
		'Z' : '',
		'T' : '',
		'X' : ''
	  },
	  activities: '',
	  grade: '',
	  image: null,
	  name: null,
	}


	retrieveData(){

		firebase.database().ref('Users/' + user.uid).on('value', (snapshot) => {
				var name = snapshot.val().name;
				if (name == null){
					name = user.displayName
				}
				var pfp = snapshot.val().pfp
				if (pfp == null){
					pfp = user.photoURL
				}
				this.setState({
					name: name,
					activities: snapshot.val().activities,
					grade: snapshot.val().grade,
					phone: snapshot.val().phoneNumber,
					pfp: pfp,

				})
				if (snapshot.hasChild('teacher')){
					firebase.database().ref('Users/' + user.uid + '/teacher').on('value', (snapshot) => {
						this.setState(
						  {
							  teacher:{
								'A' : snapshot.val().A , 
								'B' : snapshot.val().B , 
								'C' : snapshot.val().C , 
								'D' : snapshot.val().D , 
								'E' : snapshot.val().E ,
								'F' : snapshot.val().F , 
								'G' : snapshot.val().G,
								'Z' : snapshot.val().Z,
								'T' : snapshot.val().T,
								'X' : snapshot.val().X
							  }
						}
						);
						
					})
				}

				if (snapshot.hasChild('className')){
					firebase.database().ref('Users/' + user.uid + '/className').on('value', (snapshot) => {
						this.setState(
						  {
							  className:{
								'A' : snapshot.val().A , 
								'B' : snapshot.val().B , 
								'C' : snapshot.val().C , 
								'D' : snapshot.val().D , 
								'E' : snapshot.val().E ,
								'F' : snapshot.val().F , 
								'G' : snapshot.val().G,
								'Z' : snapshot.val().Z,
								'T' : snapshot.val().T,
								'X' : snapshot.val().X
							  }
						}
					);
				})
				}
							
		})
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

		

		let letters = ['A','B','C','D','E','F','G','Z','T','X']
		let printedClasses = ""
		for (let i=0; i<letters.length; i++){
			printedClasses += letters[i] + " Block: " + this.state.classNames[letters[i]] + " - " + this.state.teachers[letters[i]]
			printedClasses += "\n"
		}

		return (
			<View style={styles.container}>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				{this.state.image && <Image source={{ uri: this.state.image }} style={styles.pfp} />}
				<Text style={styles.displayName}>{this.state.name}</Text>

				</View>

				<View>
					<TouchableOpacity style={styles.editProfileButton} onPress={() => this.props.navigation.navigate('Customize')}>
						<Text style={styles.buttonText}>Edit Profile</Text>
					</TouchableOpacity>
				</View>

				<View>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Club Profile')}>
						<Text style={{color: 'white'}}>Club Profile</Text>
					</TouchableOpacity>
				</View>
				
				<View style={{flex: 1}}>
				<Text style= {styles.scheduleText}>{this.state.grade}</Text>
				<Text style= {styles.scheduleText}>{this.state.activities}</Text>
				<Text style= {styles.scheduleText}>Schedule</Text>
				<Text style= {styles.scheduleText}>{printedClasses}</Text>
				</View>

			</View>
					
		);
		  }
	}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: colorCode.backgroundWhite,
	},
	displayName: {
		color: 'white'
	},
	scheduleText: {
		color: 'white'
	},
	pfp:{
		width: 150,
    	height: 150,
		borderRadius: 100
	},
	editProfileButton: {
		backgroundColor: colorCode.buttonPurple,
		padding: 10,
		borderRadius: 10,
	},
	buttonText: {
		fontSize: 15,
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'Red Hat Display'
	},
	

});
