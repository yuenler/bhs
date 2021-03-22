import React, { useReducer, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, Linking, Image, Button, TouchableOpacity } from 'react-native';
import user from "../User";
import firebase from 'firebase';


export default class ViewProfileScreen extends React.Component {

	state = {
		uid: null,	
	  A: null,
	  B: null,
	  C: null,
	  D: null, 
	  E: null,
	  F: null,
	  G: null,
	  Z: null,
	  T: null, 
	  X: null,
	  name: null,
	  activities: '',
	  grade: '',
	  image: null,
	}


	retrieveData(){
		firebase.database().ref('Users/' + this.state.uid).on('value', (snapshot) => {
			this.setState({
				name: snapshot.val().name,
				activities: snapshot.val().activities,
				grade: snapshot.val().grade,
				A: snapshot.val().A,
				B: snapshot.val().B,
				C: snapshot.val().C,
				D: snapshot.val().D,
				E: snapshot.val().E,
				F: snapshot.val().F,
				G: snapshot.val().G,
				Z: snapshot.val().Z,
				T: snapshot.val().T,
				X: snapshot.val().X,
				
			});
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
			printedClasses += letters[i] + " Block: " + this.state[letters[i]]
			printedClasses += "\n"
		}


		if (!this.state.ready){
			null
		}
		return (
			<View style={styles.container}>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				{this.state.image && <Image source={{ uri: this.state.image }} style={styles.pfp} />}
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
