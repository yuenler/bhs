import React, { useReducer, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Alert, Linking, Image, Button, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import {globalStyles} from '../GlobalStyles';

export default class ViewClassmatesScreen extends React.Component {

	state = {
		names: [],
		uids: [],
	}


	
	uidToName(uid){
		firebase.database().ref('Users/' + uid).on('value', (snapshot) => {
			this.setState({names: [this.state.names, snapshot.val().name]})
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
		var block = this.props.route.params.block
		var teacher = this.props.route.params.teacher
		firebase.database().ref('Classes/' + block + '/' + teacher).on('child_added', (snapshot) => {
			this.setState({uids: [this.state.uids, snapshot.val().uid]})
			this.uidToName(snapshot.val().uid);
		  });		
	  }

	//   componentWillUnmount() {
	// 	this._unsubscribe();
	//   }




	 
	
	render() {

		let people = []
		for (let i = 0; i < this.state.names.length; i++){
			people.push({
				name: this.state.names[i],
				uid: this.state.uids[i]
			})
		}
		
		return (
			<View style={globalStyles.container3}>
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
	/*container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#ededed',
	},*/
	printedNames: {
		color: '#000000'
	}

});
