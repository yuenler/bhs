import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import firebase from 'firebase';
import EventsBox from '../EventBox';

const titles = [];
const texts = []

export default class EventsScreen extends React.Component {

	state = {
		titles: [],
		texts: []
    };

	componentDidMount() {
		firebase.database().ref('Events').on('child_added', (snapshot) => {
		this.setState({
			titles: titles.push(snapshot.val().postTitle),
			texts: texts.push(snapshot.val().post)
		});
	});
	}
		
		  
	
	render() {
		
		const events = []
		// let printedEvent = "";
		for (let i = 0, len = titles.length; i < len; ++i) {
			events.push(
				{
				title: titles[i],
				text: texts[i]
				}
			)
		}
		console.log(events)

		return (
			
			<View style={styles.container}>
				<ScrollView style={styles.view} ref={ref => this.scrollRef = ref}>
					{
						events.map((block, i) => {
							return <EventsBox background='#a30000' color="white" title={block.title} text={block.text} key={i} />;
						})
					}
				</ScrollView>

				<TouchableOpacity style = {styles.button} onPress = {() => {
					this.props.navigation.navigate('Create Event')
				}}>
					<Text style={styles.buttonText}>Post Event Here!</Text>
				</TouchableOpacity>
			</View>
		);
	}


}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'blue',
		padding: 20,
		borderRadius: 20,
	},
	buttonText: {
		fontSize: 20,
    	color: '#fff',
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
});

