import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import firebase from 'firebase';
import EventsBox from '../EventBox';

const titles = [];
const texts = [];
const dates = [];
const userNames = [];

export default class AnnouncementsScreen extends React.Component {

	state = {
		titles: [],
		texts: [],
		dates: [],
		userNames: []
    };

	componentDidMount() {
		firebase.database().ref('Announcements').on('child_added', (snapshot) => {
		this.setState({
			titles: titles.push(snapshot.val().postTitle),
			texts: texts.push(snapshot.val().post),
			dates: dates.push(snapshot.val().postDate),
			userNames: userNames.push(snapshot.val().postUserName),
		});
	});
	}
		
		  
	
	render() {
		
		const events = []
		// let printedEvent = "";
		var i;
		for (i = titles.length-1; i >= 0; i--) {
			events.push(
				{
				title: titles[i],
				text: texts[i],
				date: dates[i],
				userName: userNames[i]
				}
			)
		}

		return (
			
			<View style={styles.container}>
				<ScrollView style={styles.view} ref={ref => this.scrollRef = ref}>
					{
						events.map((block, i) => {
							return <EventsBox background='#7a7a7a' color="white" title={block.title} text={block.text} date={block.date} userName = {block.userName} key={i} />;
						})
					}
				</ScrollView>

				<TouchableOpacity style = {styles.button} onPress = {() => {
					this.props.navigation.navigate('Create Announcement')
				}}>
					<Text style={styles.buttonText}>Create Announcement Here</Text>
				</TouchableOpacity>
			</View>
		);
	}


}

const styles = StyleSheet.create({
	button: {
		margin: 20,
		backgroundColor: '#871609',
		padding: 20,
		borderRadius: 20,
		alignItems: "center", 
	},
	buttonText: {
		fontFamily: 'Red Hat Display',
		fontSize: 20,
    	color: '#fff',
	},
	container: {
		flex: 1,
		backgroundColor: '#0F182D',
		justifyContent: 'center',
	},
});

