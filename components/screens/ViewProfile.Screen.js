import React, { useReducer, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, Linking, Image, Button, TouchableOpacity } from 'react-native';
import user from "../User";
import firebase from 'firebase';
import {globalStyles} from '../GlobalStyles';


export default class ViewProfileScreen extends React.Component {

	state = {
		uid: null,	
		teacher: {
			'A' : '' , 
			'B' : '' , 
			'C' : '' , 
			'D' : '' , 
			'E' : '' , 
			'F' : '' , 
			'G' : '',
			'Z' : "",
			'T' : '',
			'X' : ''
		  },
	  name: null,
	  activities: '',
	  grade: '',
	  pfp: null,
	}


	retrieveData(){
		firebase.database().ref('Users/' + this.state.uid).on('value', (snapshot) => {
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
			this.setState({
				name: snapshot.val().name,
				pfp: snapshot.val().pfp,
				activities: snapshot.val().activities,
				grade: snapshot.val().grade
	 
				
			})
		})
	  }

	  componentDidMount() {
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			this.state.uid = this.props.route.params.uid;
			this.retrieveData();
		  });
		  this.state.uid = this.props.route.params.uid;
		  this.retrieveData();
	  }

	  componentWillUnmount() {
		this._unsubscribe();
	  }

	 
	
	render() {
		

		let letters = ['A','B','C','D','E','F','G','Z','T','X']
		let printedClasses = ""
		for (let i=0; i<letters.length; i++){
			printedClasses += letters[i] + " Block: " + this.state.teacher[letters[i]]
			printedClasses += "\n"
		}


		if (!this.state.ready){
			null
		}
		return (
			<View style={styles.container}>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				{this.state.pfp && <Image source={{ uri: this.state.pfp }} style={styles.pfp} />}
				<Text style={styles.displayName}>{this.state.name}</Text>

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
		backgroundColor: '#ededed',
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
		backgroundColor: '#871609',
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
