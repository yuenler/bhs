import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Alert, TextInput, Linking, Image, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import firebase from "firebase";
import user from "../User";
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons} from '@expo/vector-icons';

export default class CreateClubProfileScreen extends React.Component {
    state = {
		ready: false,        
		  name: "",
		  meetingTime: "",
		  advisor: "",
		  room: "",
		  pfp: ""

	};

	options = {
		blocks:['A','B','C','D','E','F','G','Z','T','X'],
		teachers: ['Free','Alexander, Melanee', 'Alibhai, Marika', 'Allegrezza, Christina', 'Allen, Astrid', 'Anderson, Marcella', 'Angione, Mary', 'Asselin, Lindsay', 'Babitskaya, Katya', 'Bader, Alex', 'Barkett, Scott', 'Barrer-Gall, Jennifer', 'Barrett, Jake', 'Bayer, Amy', 'Beaulieu-Jones, Kyle', 'Berman, Ben', 'Bernier, Kathleen', 'Bishop, Nina', 'Blette, Erin', 'Breneisen, Jennifer', 'Brennan, Elizabeth', 'Broken Rope, Zac', 'Brown, Briana', 'Brown, Tyler', 'Buhl, Elizabeth', 'Burke-Hunter, Joanne', 'Burns, Amy', 'Buys, Kari', 'Camara, Monica', 'Carpenter, Paul', 'Carruthers, Christine', 'Castellano, Carolyn', 'Cawthorne, Malcolm', 'Cells, Meaghan', 'Chang, Fu-Tseng', 'Chiu, Linda', 'Colburn, Eric', 'Conner, Alisa', 'Crane, Elizabeth', 'Crepeau, Andy', 'Crocker, Alison', 'Crossen, Heather', 'Crusberg, Gretchen', 'Cruz-López, Elena', 'Davis, Elizabeth', 'Davis, Lindsay', 'DeGrace, Matthew', 'DeYoung, Mike', 'Derrien, Andre', 'Dickerman, Sam', 'Differ, Betty', 'Dillon, Colleen', 'Dondero, Ali', 'Driscoll, Michael', 'DuBois, Matthew', 'Eio, Rachel', 'Fiedor, Mark', 'Fischer, Elon', 'Flynn-Carson, Keira', 'Ford, David', 'Frey, Jennifer', 'Fried, Adam', 'Friedland, Craig', 'Fuertes, Marta', 'Giblin, Heather', 'Glazer, Caryn', 'Goose, Stephen', 'Gorlin, Sophie', 'Gorman, Elizabeth', 'Graham, Billy', 'Grande, Roger', 'Gray, Emily', 'Griffin, Kelle', 'Gronlund-Jacob, Noah', 'Grubb, Jennifer', 'Grunseich, Ivonne', 'Gurner, Glen', 'Gurry, Laura', 'Hanaghan, Jennifer', 'Harrington, Gaelen', 'Hayden, Rebecca', 'Hemphill, Sarah', 'Henry, Jim', 'Hernandez, Mayra', 'Hitchcock, Kathy', 'Honeywood, Laura', 'Hunt, Emily', 'Hunt, Stephanie', 'Irabarren-Lopez, Gisela', 'Irvin, Holly', 'James, Julia', 'Jaruse, Jennifer', 'Joyal, Julie', 'Juo, Jasmine', 'Kanter-Caruso, Kathryn', 'Keenan, Barbara', 'Kelly, Andy', 'Kennedy-Justice, Meghan', 'Kimball, Andrew', 'Kissel, Stacy', 'Knott, David', 'Kobus, Brendan', 'Kornell, Sarah', 'Kostant, Shoshanna', 'Kozel, Brad', 'Kramer, Jason', 'Labouchere, Natalie', 'Ladner, Sarah', 'Lamb, Dorian', 'Lantos, Steve', 'Latimer, Eric', 'Lauro-Priestly, Paul', 'Lee, John', 'Lehman, Amanda', 'Leonard, Sarah', 'Leslie, Elsbeth', 'Leslie, Kathryn', 'Lima, Gretchen', 'Little, Benjamin', 'Longmire, Jenny', 'Lopez, Kara', 'Love, Aubrey', 'Lowe, Kathleen', 'Lynch, Andrea', 'Lynn, Lori', 'Maglathlin, Andrew', 'Maimonis, Elena', 'Mangan, Julia', 'Marcos, Reiko', 'Martin, Jennifer', 'Mastandrea, Mary', 'McAllister, Stephanie', 'McCarthy, Brendan', 'McElroy, Sandra', 'McGee, Patrick', 'McGinnis, Emily', 'Meagher, Peter', 'Mendez, Pedro', 'Myers, Wes', 'Miller, Marcie', 'Mitchell, Dave', 'Mohamedi, Graciela', 'Montrose, Jason', 'Morimando, Beau', 'Morris, Ian', 'Morrow, Kelly', 'Mousseau, Evan', 'Muldowney, Nicole', 'Murphy, Alexis', 'Murphy, Kristen', 'Mwosa, Thato', 'Mylchreest, Tom', 'Naimy, Julia', 'Nardi, Talmadge', 'Normant, Michael', "O'Connell, Brendan", "O'Mahony, Erica", 'Ouellette, Katy Frost', 'Padgett, Julie', 'Page, Jacob', 'Paniagua, Juan', 'Parisi, Katelyn', 'Parker, Alissa', 'Pero, Nick', 'Petty, David', 'Poon, Brian', 'Primmer, Robert', 'Proctor, Michael', 'Putnam, Dean', 'Rabina, Danielle', 'Reagan, Rachel', 'Richer, Meghan', 'Rocco, Julia', 'Rodriguez, Lisa', 'Rose-Wood, Jennifer', 'Ross, Robin', 'Rothstein, Nicholas', 'Sakaria, Devina', 'Saler, Judy', 'Sartanowicz, Donna', 'Sawyer Delano, Amy', 'Schiff, Matt', 'Sedlak, Peter', 'Shapiro, Fukiko', 'Shen, Christine', 'Shields, Elaine', 'Shorter, Lihua', 'Shuster, Sarah', 'Siver, Emma', 'Skeen, Hayley', 'Spencer, Jennifer', 'Speyer, Julia', 'Stevens, Britt', 'Strauss, Lindsay', 'Strong, Betty', 'Thomas, Keith', 'Toback, Robin', 'Tobey, Kristina', 'Tong, Jason', 'VanDerzee, Mark', 'Vanderclock, Perri', 'Vassallo, Cassie', 'Veader, Mark', 'Vendola, Joslyn', 'Wallace, Erin', 'Wang, Grace', 'Wang, Kevin', 'Wells, Hayley', 'Wheeler, Mark', 'Whitebone, Alison', 'Whitehead, Kevin', 'Williams, Eli', 'Williams, Summer', 'Winkler, Deborah', 'Wise, Lindsay', 'Wiser, Ed', 'Wolf, Catherine', 'Wong, Karen', 'Woolever, Chloe', 'Wooley, Kate', 'Yazdiha, Solmaaz', 'Zembruski, Alexandra']
	}
	componentDidMount() {
		this.retrieveData();
	}

	retrieveData = async()  => {
        try{
			this.state.name = await AsyncStorage.getItem('clubName');
			this.state.block = await AsyncStorage.getItem('block');
			this.state.advisor = await AsyncStorage.getItem('advisor');
			this.state.pfp = await AsyncStorage.getItem('pfp');
			this.setState({ready: true})
        }
        catch(error){
            console.info(error);
		}
	  }

	
	  saveProfile = async () => {
		let error = false;
		try {
			await AsyncStorage.setItem('name', this.state.name)
			await AsyncStorage.setItem('grade', this.state.grade)
			await AsyncStorage.setItem('activities', this.state.activities)
		  	await AsyncStorage.setItem('phoneNumber', this.state.phoneNumber)
		} catch (e) {
		  error = true;
		}

		if (error){
			Alert.alert("Error saving changes. Please try again.")
		}
		else{
		  Alert.alert(
			  "Your profile has successfully been saved."
			);
			
		}
	  }
	
		pickImage = async () => {
			let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
			});
			if (!result.cancelled) {
				this.setState({image: result.uri})
				this.saveImage(result.uri)
			}
		};
		 
		saveImage = async (uri)  => {
			try{
			  await AsyncStorage.setItem('pfp', uri)
			}
			catch(error){
				console.log(error)
			}
		}
		
	

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

		if (!this.state.ready){
			return null;
		}

		return (
			<ScrollView style={styles.container}>
				
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
				{this.state.image && <Image source={{ uri: this.state.image }} style={styles.pfp} />}
				<View style={styles.editContainer}>
				<MaterialIcons.Button borderRadius={100} style={styles.edit} name="edit" onPress={() => this.pickImage()} />
				</View>
				</View>

				<View style={{flex: 1}}>
				<Text style={styles.textLabel}>Club Name</Text>
				<TextInput placeholder="App Development Club"
						style={styles.textInput} 
						onChangeText={name => this.setState({ name })}
						value={this.state.name}
					/> 
				</View>

				<View style={{flex: 1}}>
				<Text style={styles.textLabel}>Meeting time</Text>
				<TextInput placeholder="Monday and Wednesdays 3-4pm"
						style={styles.textInput} 
						onChangeText={meetingTime => this.setState({ meetingTime })}
						value={this.state.meetingTime}
				/> 
				</View>

				<View style={{flex: 1}}>
				<Text style={styles.textLabel}>Club Advisor</Text>
				<TextInput placeholder="Mr. Smith"
						style={styles.textInput} 
						onChangeText={advisor => this.setState({ advisor })}
						value={this.state.advisor}
				/> 
				</View>

				<View style={{flex: 1}}>
				<Text style={styles.textLabel}>Meeting location</Text>
				<TextInput placeholder="Room 336"
						style={styles.textInput} 
						onChangeText={phoneNumber => this.setState({ phoneNumber })}
						  value={this.state.phoneNumber}
						 /> 				
				</View>

				<View style={{flex: 1}}>
				<Text style={styles.textLabel}>Club Description</Text>
				<TextInput placeholder="Enter description here..."
						multiline
						style={styles.textInput} 
						onChangeText={phoneNumber => this.setState({ phoneNumber })}
						  value={this.state.phoneNumber}
						 /> 				
				</View>

				<View style={{ flex: 1, marginTop: 5, marginHorizontal: 20 }}>
						<TouchableOpacity style={styles.button} onPress={() => { this.saveProfile() }}>
							<Text style={styles.buttonText}>Save</Text>
						</TouchableOpacity>
				</View>
				
            </ScrollView>
            
		);
	}
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#871609',
		padding: 10,
		borderRadius: 10,
	},
	venmo: {
		width: 180,
		height: 60
	},
	buttonText: {
		fontSize: 15,
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'Red Hat Display'
	},
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#0F182D',
	},
	textInput: { 
		borderRadius: 10, 
		paddingVertical: 8, 
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 16, 
		borderColor: "rgba(0, 0, 0, 0.2)", 
		borderWidth: 1, 
		marginHorizontal: 20,
		marginBottom: 10,
		fontFamily: 'Red Hat Display'
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
	}
});
