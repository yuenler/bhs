import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import firebase from 'firebase';
import AnnouncementBox from '../AnnouncementBox';
import {globalStyles} from '../GlobalStyles';
import user from '../User'

export default class AnnouncementsScreen extends React.Component {

	state = {
		announcementIDs: [],
		titles: [],
		texts: [],
		dates: [],
		uids: [],
		isOwnPosts: [],
		userNames: [],
		pfps: [],
    };

	componentDidMount() {
		firebase.database().ref('Announcements').on('child_added', (snapshot) => {
		//We are updating state this way instead of this.setState() because this.setState() does not update state immediately
		this.state.announcementIDs = this.state.announcementIDs.concat(snapshot.key)
		this.state.titles = this.state.titles.concat(snapshot.val().postTitle)
		this.state.texts = this.state.texts.concat(snapshot.val().post)
		this.state.dates = this.state.dates.concat(snapshot.val().postDate)
		this.state.uids = this.state.uids.concat(snapshot.val().postUID)
		this.state.isOwnPosts = this.state.isOwnPosts.concat(user.uid === snapshot.val().postUID)
		firebase.database().ref('Users/' + snapshot.val().postUID).on('value', (snapshot) => {
			this.state.userNames = this.state.userNames.concat(snapshot.val().name)
			this.state.pfps = this.state.pfps.concat(snapshot.val().pfp)
			this.forceUpdate();
		});
	})	
	}
		
	
	
	render() {
		
		const posts = []
		var i;
		for (i = this.state.titles.length-1; i >= 0; i--) {
			posts.push(
				{
				announcementID: this.state.announcementIDs[i],
				title: this.state.titles[i],
				text: this.state.texts[i],
				date: this.state.dates[i],
				userName: this.state.userNames[i],
				pfp: this.state.pfps[i],
				uid: this.state.uids[i],
				isOwnPost: this.state.isOwnPosts[i],
				}
			)
		}

		return (
			<SafeAreaView style={globalStyles.container}>
				<ScrollView>
					{
						posts.map((block, i) => {
							return <AnnouncementBox announcementID={block.announcementID} title={block.title} text={block.text} date={block.date} navigation = {this.props.navigation} userName = {block.userName} pfp = {block.pfp} uid = {block.uid} isOwnPost={block.isOwnPost} key={i} />;
						})
					}
				</ScrollView>
			</SafeAreaView>
		);
	}


}

