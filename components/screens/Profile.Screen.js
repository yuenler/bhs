import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Alert, Linking } from 'react-native';
import user from "../User";
import AsyncStorage from '@react-native-community/async-storage';


export default class ProfileScreen extends React.Component {

	state = {
		ready: false,
		block: {
		'A' : '' , 

		'B' : '' , 

		'C' : '' , 

		'D' : '' , 

		'E' : '' , 

		'F' : '' , 

		'G' : '',
		'T' : '',
		'X' : ''
	  }
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
			
        }
        catch(error){
            console.info(error);
		}
		this.setState({ready: true})

	  }

	  componentDidMount() {
		  this.retrieveData();
	  }
	
	render() {

		let letters = ['A','B','C','D','E','F','G']
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
				<Image
					style={styles.pfp}
					source={user.photoURL}
					/>
				<Text>{user.displayName}</Text>
				<Text>{activities}</Text>
				<Text>Schedule</Text>
				<Text>{printedClasses}</Text>
				

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
	pfp:{
		width: 150,
    	height: 150,
	}
});
