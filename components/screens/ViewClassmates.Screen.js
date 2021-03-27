import React, { useReducer, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, Linking, Image, Button, TouchableOpacity } from 'react-native';
import user from "../User";
import firebase from 'firebase';

var names = [];
var uids = []

export default class ViewClassmatesScreen extends React.Component {

	state = {
		names: [],
		uids: [],
	}


	
	uidToName(uid){
		firebase.database().ref('Users/' + uid).on('value', (snapshot) => {
			this.setState({names: names.push(snapshot.val().name)})
		});	
			
	}

	  componentDidMount() {
		// this._unsubscribe = this.props.navigation.addListener('focus', () => {
		// 	// var uids = this.props.route.params.uids;
		// 	// if (uids == null){
		// 	// 	uids = [];
		// 	// }
		// 	// this.retrieveData(uids);
		// 	this.setState({uids: this.props.route.params.uids})
		// });
		// //   this.state.uids = this.props.route.params.uids;
		// //   this.retrieveData();
		// alert('b' + this.state.uids[0])
		// this.setState({uids: this.props.route.params.uids})
		// alert('a' + this.state.uids[0])
		// this.setState({uids: this.props.route.params.uids})
		names = []
		var block = this.props.route.params.block
		var teacher = this.props.route.params.teacher
		console.log('ran this')
		if (teacher != null){
		firebase.database().ref('Classes/' + block + '/' + teacher).on('child_added', (snapshot) => {
			this.setState({uids: uids.push(snapshot.val().uid)})
			this.uidToName(snapshot.val().uid);
		  });
		}
		else{

			firebase.database().ref('Users/' + user.uid).on('value', (snapshot) => {
				teacher = snapshot.val()[block]
				firebase.database().ref('Classes/' + block + '/' + teacher).on('child_added', (snapshot) => {
					this.setState({uids: uids.push(snapshot.val().uid)})
					this.uidToName(snapshot.val().uid);
				  });
			});
		}
		
	  }

	//   componentWillUnmount() {
	// 	this._unsubscribe();
	//   }




	 
	
	render() {

		let people = []
		for (let i = 0; i < names.length; i++){
			people.push({
				name: names[i],
				uid: uids[i]
			})
		}
		
		return (
			<View style={styles.container}>
				{
					people.map((person, i) => {
						return 	<Text style={styles.printedNames} key={i}>{person.name}</Text>
					})
				}
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
	printedNames: {
		color: '#000000'
	}

});
