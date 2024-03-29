import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Alert, TextInput, Linking, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import firebase from "firebase";
import user from "../User";
import * as ImagePicker from 'expo-image-picker';
import {Image, Input} from 'react-native-elements';
import { MaterialIcons} from '@expo/vector-icons';
import {globalStyles} from '../GlobalStyles';


export default class CreateClubProfileScreen extends React.Component {
    state = {
		ready: false,        
		  name: "",
		  meetingTime: "",
		  advisor: "",
		  room: "",
		  description: "",
		  pfp: null

	};

	options = {
		blocks:['A','B','C','D','E','F','G','Z','T','X'],
		teachers: ['Free','Alexander, Melanee', 'Alibhai, Marika', 'Allegrezza, Christina', 'Allen, Astrid', 'Anderson, Marcella', 'Angione, Mary', 'Asselin, Lindsay', 'Babitskaya, Katya', 'Bader, Alex', 'Barkett, Scott', 'Barrer-Gall, Jennifer', 'Barrett, Jake', 'Bayer, Amy', 'Beaulieu-Jones, Kyle', 'Berman, Ben', 'Bernier, Kathleen', 'Bishop, Nina', 'Blette, Erin', 'Breneisen, Jennifer', 'Brennan, Elizabeth', 'Broken Rope, Zac', 'Brown, Briana', 'Brown, Tyler', 'Buhl, Elizabeth', 'Burke-Hunter, Joanne', 'Burns, Amy', 'Buys, Kari', 'Camara, Monica', 'Carpenter, Paul', 'Carruthers, Christine', 'Castellano, Carolyn', 'Cawthorne, Malcolm', 'Cells, Meaghan', 'Chang, Fu-Tseng', 'Chiu, Linda', 'Colburn, Eric', 'Conner, Alisa', 'Crane, Elizabeth', 'Crepeau, Andy', 'Crocker, Alison', 'Crossen, Heather', 'Crusberg, Gretchen', 'Cruz-López, Elena', 'Davis, Elizabeth', 'Davis, Lindsay', 'DeGrace, Matthew', 'DeYoung, Mike', 'Derrien, Andre', 'Dickerman, Sam', 'Differ, Betty', 'Dillon, Colleen', 'Dondero, Ali', 'Driscoll, Michael', 'DuBois, Matthew', 'Eio, Rachel', 'Fiedor, Mark', 'Fischer, Elon', 'Flynn-Carson, Keira', 'Ford, David', 'Frey, Jennifer', 'Fried, Adam', 'Friedland, Craig', 'Fuertes, Marta', 'Giblin, Heather', 'Glazer, Caryn', 'Goose, Stephen', 'Gorlin, Sophie', 'Gorman, Elizabeth', 'Graham, Billy', 'Grande, Roger', 'Gray, Emily', 'Griffin, Kelle', 'Gronlund-Jacob, Noah', 'Grubb, Jennifer', 'Grunseich, Ivonne', 'Gurner, Glen', 'Gurry, Laura', 'Hanaghan, Jennifer', 'Harrington, Gaelen', 'Hayden, Rebecca', 'Hemphill, Sarah', 'Henry, Jim', 'Hernandez, Mayra', 'Hitchcock, Kathy', 'Honeywood, Laura', 'Hunt, Emily', 'Hunt, Stephanie', 'Irabarren-Lopez, Gisela', 'Irvin, Holly', 'James, Julia', 'Jaruse, Jennifer', 'Joyal, Julie', 'Juo, Jasmine', 'Kanter-Caruso, Kathryn', 'Keenan, Barbara', 'Kelly, Andy', 'Kennedy-Justice, Meghan', 'Kimball, Andrew', 'Kissel, Stacy', 'Knott, David', 'Kobus, Brendan', 'Kornell, Sarah', 'Kostant, Shoshanna', 'Kozel, Brad', 'Kramer, Jason', 'Labouchere, Natalie', 'Ladner, Sarah', 'Lamb, Dorian', 'Lantos, Steve', 'Latimer, Eric', 'Lauro-Priestly, Paul', 'Lee, John', 'Lehman, Amanda', 'Leonard, Sarah', 'Leslie, Elsbeth', 'Leslie, Kathryn', 'Lima, Gretchen', 'Little, Benjamin', 'Longmire, Jenny', 'Lopez, Kara', 'Love, Aubrey', 'Lowe, Kathleen', 'Lynch, Andrea', 'Lynn, Lori', 'Maglathlin, Andrew', 'Maimonis, Elena', 'Mangan, Julia', 'Marcos, Reiko', 'Martin, Jennifer', 'Mastandrea, Mary', 'McAllister, Stephanie', 'McCarthy, Brendan', 'McElroy, Sandra', 'McGee, Patrick', 'McGinnis, Emily', 'Meagher, Peter', 'Mendez, Pedro', 'Myers, Wes', 'Miller, Marcie', 'Mitchell, Dave', 'Mohamedi, Graciela', 'Montrose, Jason', 'Morimando, Beau', 'Morris, Ian', 'Morrow, Kelly', 'Mousseau, Evan', 'Muldowney, Nicole', 'Murphy, Alexis', 'Murphy, Kristen', 'Mwosa, Thato', 'Mylchreest, Tom', 'Naimy, Julia', 'Nardi, Talmadge', 'Normant, Michael', "O'Connell, Brendan", "O'Mahony, Erica", 'Ouellette, Katy Frost', 'Padgett, Julie', 'Page, Jacob', 'Paniagua, Juan', 'Parisi, Katelyn', 'Parker, Alissa', 'Pero, Nick', 'Petty, David', 'Poon, Brian', 'Primmer, Robert', 'Proctor, Michael', 'Putnam, Dean', 'Rabina, Danielle', 'Reagan, Rachel', 'Richer, Meghan', 'Rocco, Julia', 'Rodriguez, Lisa', 'Rose-Wood, Jennifer', 'Ross, Robin', 'Rothstein, Nicholas', 'Sakaria, Devina', 'Saler, Judy', 'Sartanowicz, Donna', 'Sawyer Delano, Amy', 'Schiff, Matt', 'Sedlak, Peter', 'Shapiro, Fukiko', 'Shen, Christine', 'Shields, Elaine', 'Shorter, Lihua', 'Shuster, Sarah', 'Siver, Emma', 'Skeen, Hayley', 'Spencer, Jennifer', 'Speyer, Julia', 'Stevens, Britt', 'Strauss, Lindsay', 'Strong, Betty', 'Thomas, Keith', 'Toback, Robin', 'Tobey, Kristina', 'Tong, Jason', 'VanDerzee, Mark', 'Vanderclock, Perri', 'Vassallo, Cassie', 'Veader, Mark', 'Vendola, Joslyn', 'Wallace, Erin', 'Wang, Grace', 'Wang, Kevin', 'Wells, Hayley', 'Wheeler, Mark', 'Whitebone, Alison', 'Whitehead, Kevin', 'Williams, Eli', 'Williams, Summer', 'Winkler, Deborah', 'Wise, Lindsay', 'Wiser, Ed', 'Wolf, Catherine', 'Wong, Karen', 'Woolever, Chloe', 'Wooley, Kate', 'Yazdiha, Solmaaz', 'Zembruski, Alexandra']
	}
	componentDidMount() {
		this.retrieveData();
	}

	retrieveData() {
		firebase.database().ref('Users/' + user.uid).on('value', (snapshot) => {
			if (snapshot.val().clubID != null){
				let clubID = snapshot.val().clubID
				firebase.database().ref('Clubs/' + clubID).on('value', (snapshot) => {
					this.setState({
						name: snapshot.val().name,
						meetingTime: snapshot.val().meetingTime,
						advisor: snapshot.val().advisor,
						room: snapshot.val().room,
						description: snapshot.val().description,
						pfp: snapshot.val().pfp,
					})
				})
			}
		})
	  }

	
	  saveProfile() {
		
		firebase
		  .database()
		  .ref('Clubs/' + user.uid)
		  .update({
			name: this.state.name,
			meetingTime: this.state.meetingTime,
			advisor: this.state.advisor,
			room: this.state.room,
			description: this.state.description,
			pfp: this.state.pfp,
		  });

		
		  Alert.alert(
			  "Your profile has successfully been saved."
			);
			
	  }
	
		pickImage = async () => {
			let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
			});
			if (!result.cancelled) {
				this.saveImage(result.uri)
			}
		};
	

	  render() {

		let blocks = [];
		for (let i = 0; i< this.options.blocks.length; i++) {
			let block = this.options.blocks[i]
			blocks.push({label: block, value: block })
		}
		
		let teachers = [];
		for (let i = 0; i< this.options.teachers.length; i++) {
			let teacher = this.options.teachers[i]
			teachers.push({label: teacher, value: teacher })
		}

	
		return (
			<ScrollView style={globalStyles.container}>
				
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
				{this.state.pfp && <Image source={{ uri: this.state.pfp }} style={globalStyles.pfp} />}
				<View style={globalStyles.editContainer}>
				<MaterialIcons.Button borderRadius={100} style={globalStyles.edit} name="edit" onPress={() => this.pickImage()} />
				</View>
				</View>

				<View style={{flex: 1}}>
				<Input placeholder="App Development Club"
						label = "Club name"
						onChangeText={name => this.setState({ name })}
						value={this.state.name}
					/> 
				</View>

				<View style={{flex: 1}}>
				<Input placeholder="Monday and Wednesdays 3-4pm"
						label = "Meeting time"
						onChangeText={meetingTime => this.setState({ meetingTime })}
						value={this.state.meetingTime}
				/> 
				</View>

				<View style={{flex: 1}}>
				<Input placeholder="Mr. Smith"
						label = "Club advisor"
						onChangeText={advisor => this.setState({ advisor })}
						value={this.state.advisor}
				/> 
				</View>

				<View style={{flex: 1}}>
				<Input placeholder="Room 336"
						label = "Meeting location"
						onChangeText={phoneNumber => this.setState({ phoneNumber })}
						  value={this.state.room}
						 /> 				
				</View>

				<View style={{flex: 1}}>
				<Text style={globalStyles.textLabel}>Club Description</Text>
				<TextInput placeholder="Enter description here..."
						multiline
						onChangeText={phoneNumber => this.setState({ phoneNumber })}
						  value={this.state.description}
						 /> 				
				</View>

				<View style={{ flex: 1, marginTop: 5, marginHorizontal: 20 }}>
						<TouchableOpacity style={globalStyles.button} onPress={() => { this.saveProfile() }}>
							<Text style={globalStyles.buttonText}>Save</Text>
						</TouchableOpacity>
				</View>
				
            </ScrollView>
            
		);
	}
}

const styles = StyleSheet.create({
	/*button: {
		backgroundColor: '#871609',
		padding: 10,
		borderRadius: 10,
	},*/
	venmo: {
		width: 180,
		height: 60
	},
	/*buttonText: {
		fontSize: 15,
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'Red Hat Display'
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#ededed',
	},
	pfp:{
		width: 150,
    	height: 150,
		borderRadius: 100
	},
	editContainer:{
		marginLeft: 100,
		marginTop: -35,	
	},
	edit:{
		paddingRight: 0,
	},
	textLabel:{
		color: 'white',
		marginLeft: 20
	},
	scheduleSection:{
		margin: 100,
		backgroundColor: 'white',
	}*/
});
