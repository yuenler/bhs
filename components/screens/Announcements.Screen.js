import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import firebase from 'firebase';
import AnnouncementBox from '../AnnouncementBox';
import {colorCode} from '../GlobalColors';
import user from '../User'

export default class AnnouncementsScreen extends React.Component {

	state = {
		announcementIDs: [],
		titles: [],
		texts: [],
		dates: [],
		uids: [],
		isOwnPosts: [],
		userNames: []
    };

	componentDidMount() {
		firebase.database().ref('Announcements').on('child_added', (snapshot) => {
		var announcementIDs = this.state.announcementIDs.concat(snapshot.key)
		var titles = this.state.titles.concat(snapshot.val().postTitle)
		var texts = this.state.texts.concat(snapshot.val().post)
		var dates = this.state.dates.concat(snapshot.val().postDate)
		var uids = this.state.uids.concat(snapshot.val().postUID)
		var isOwnPosts = this.state.isOwnPosts.concat(user.uid === snapshot.val().postUID)
		this.setState({
			announcementIDs: announcementIDs, 
			titles: titles,
			texts: texts,
			dates: dates,
			uids: uids,
			isOwnPosts: isOwnPosts,
		});
		firebase.database().ref('Users/' + snapshot.val().postUID).on('value', (snapshot) => {
			var userNames = this.state.userNames.concat(snapshot.val().name)
			this.setState({userNames: userNames})
		});
	})	
	}
		
	
	
	render() {
		
		const events = []
		var i;
		for (i = this.state.titles.length-1; i >= 0; i--) {
			events.push(
				{
				announcementID: this.state.announcementIDs[i],
				title: this.state.titles[i],
				text: this.state.texts[i],
				date: this.state.dates[i],
				userName: this.state.userNames[i],
				uid: this.state.uids[i],
				isOwnPost: this.state.isOwnPosts[i],
				}
			)
		}

		return (
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.view} ref={ref => this.scrollRef = ref}>
					{
						events.map((block, i) => {
							return <AnnouncementBox background={colorCode.scheduleBlockLavender} announcementID={block.announcementID} title={block.title} text={block.text} date={block.date} navigation = {this.props.navigation} userName = {block.userName} uid = {block.uid} isOwnPost={block.isOwnPost} key={i} />;
						})
					}
				</ScrollView>
			</SafeAreaView>
		);
	}


}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colorCode.backgroundWhite,
		justifyContent: 'center',
	},
});

