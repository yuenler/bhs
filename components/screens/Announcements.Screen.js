import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import firebase from 'firebase';
import AnnouncementBox from '../AnnouncementBox';
import {colorCode} from '../GlobalColors';


export default class AnnouncementsScreen extends React.Component {

	state = {
		titles: [],
		texts: [],
		dates: [],
		uids: [],
		userNames: []
    };

	componentDidMount() {
		firebase.database().ref('Announcements').on('child_added', (snapshot) => {
		this.setState({
			titles: [this.state.titles, snapshot.val().postTitle],
			texts: [this.state.texts, snapshot.val().post],
			dates: [this.state.dates, snapshot.val().postDate],
			uids: [this.state.uids, snapshot.val().postUID],
		});
		firebase.database().ref('Users/' + snapshot.val().postUID).on('value', (snapshot) => {
			this.setState({userNames: [this.state.userNames, snapshot.val().name]})
		});
	})	
	}
		
	
	
	render() {
		
		const events = []
		var i;
		for (i = this.state.titles.length-1; i >= 0; i--) {
			events.push(
				{
				title: this.state.titles[i],
				text: this.state.texts[i],
				date: this.state.dates[i],
				userName: this.state.userNames[i],
				uid: this.state.uids[i]
				}
			)
		}

		return (
			<SafeAreaView style={styles.container}>
				<ScrollView style={styles.view} ref={ref => this.scrollRef = ref}>
					{
						events.map((block, i) => {
							return <AnnouncementBox background={colorCode.scheduleBlockLavender} color="white" title={block.title} text={block.text} date={block.date} navigation = {this.props.navigation} userName = {block.userName} uid = {block.uid} key={i} />;
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

