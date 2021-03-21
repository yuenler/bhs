import React, { useReducer, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, Linking, Image, Button, TouchableOpacity } from 'react-native';
import user from "../User";
import AsyncStorage from '@react-native-community/async-storage';


export default class ClubProfileScreen extends React.Component {

	state = {
		ready: false,
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
	}


	retrieveData = async()  => {
        try{
			this.state.teachers['A'] = await AsyncStorage.getItem('Ateacher');
			this.state.teachers['B'] = await AsyncStorage.getItem('Bteacher');
			this.state.teachers['C'] = await AsyncStorage.getItem('Cteacher');
			this.state.teachers['D'] = await AsyncStorage.getItem('Dteacher');
			this.state.teachers['E'] = await AsyncStorage.getItem('Eteacher');
			this.state.teachers['F'] = await AsyncStorage.getItem('Fteacher');
			this.state.teachers['G'] = await AsyncStorage.getItem('Gteacher');
			this.state.teachers['Z'] = await AsyncStorage.getItem('Zteacher');
			this.state.teachers['T'] = await AsyncStorage.getItem('Tteacher');
			this.state.teachers['X'] = await AsyncStorage.getItem('Xteacher');
			this.state.classNames['A'] = await AsyncStorage.getItem('Aclass');
			this.state.classNames['B'] = await AsyncStorage.getItem('Bclass');
			this.state.classNames['C'] = await AsyncStorage.getItem('Cclass');
			this.state.classNames['D'] = await AsyncStorage.getItem('Dclass');
			this.state.classNames['E'] = await AsyncStorage.getItem('Eclass');
			this.state.classNames['F'] = await AsyncStorage.getItem('Fclass');
			this.state.classNames['G'] = await AsyncStorage.getItem('Gclass');
			this.state.classNames['Z'] = await AsyncStorage.getItem('Zclass');
			this.state.classNames['T'] = await AsyncStorage.getItem('Tclass');
			this.state.classNames['X'] = await AsyncStorage.getItem('Xclass');
			this.state.activities = await AsyncStorage.getItem('activities');
			this.state.grade = await AsyncStorage.getItem('grade');

			var pfp = await AsyncStorage.getItem('pfp')
			if (pfp == null){
				this.state.image = user.photoURL
			}
			else{
				this.state.image = pfp
			}
						
        }
        catch(error){
            console.info(error);
		}
		this.setState({ready: true})

	  }

	  componentDidMount() {
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			this.retrieveData();
		  });
		  
		  this.retrieveData();
	  }

	  componentWillUnmount() {
		this._unsubscribe();
	  }

	 
	
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


		if (!this.state.ready){
			null
		}
		return (
			<View style={styles.container}>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				{this.state.image && <Image source={{ uri: this.state.image }} style={styles.pfp} />}
				<Text style={styles.displayName}>{user.displayName}</Text>

				</View>

				<View>
					<TouchableOpacity onPress={() => this.props.navigation.navigate('Create Club Profile')}>
						<Text style={{color: 'white'}}>Edit Profile</Text>
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
		backgroundColor: '#0F182D',
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
	

});
