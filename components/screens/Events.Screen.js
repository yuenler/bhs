import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import firebase from 'firebase';


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
		
		let printedEvent = "";
		for (let i = 0, len = titles.length; i < len; ++i) {
			printedEvent += titles[i]
			printedEvent += "\n---------------------\n"
		}

		return (
			
			<View style={styles.container}>
				<ScrollView style={styles.view} ref={ref => this.scrollRef = ref}>
					{
						<Text>{printedEvent}</Text>	
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
		alignItems: 'center',
		justifyContent: 'center',
	},
});

