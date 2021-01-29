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
		var i;
		for (i = titles.length-1; i >= 0; i--) {
			events.push(
				{
				title: titles[i],
				text: texts[i]
				}
			)
		}

		return (
			
			<View style={styles.container}>
				<ScrollView style={styles.view} ref={ref => this.scrollRef = ref}>
					{
						events.map((block, i) => {
							return <EventsBox background='#7a7a7a' color="white" title={block.title} text={block.text} key={i} />;
						})
					}
				</ScrollView>

				<TouchableOpacity style = {styles.button} onPress = {() => {
					this.props.navigation.navigate('Create Event')
				}}>
					<Text style={styles.buttonText}>Create Event Here</Text>
				</TouchableOpacity>
			</View>
		);
	}


}

const styles = StyleSheet.create({
	button: {
		margin: 20,
		backgroundColor: 'blue',
		padding: 20,
		borderRadius: 20,
		alignItems: "center", 
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

