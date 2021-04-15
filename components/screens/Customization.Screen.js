import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Alert, TextInput, Linking, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import firebase from "firebase";
import user from "../User";
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons} from '@expo/vector-icons';
import {Image, Input, Header, Icon} from 'react-native-elements';


export default class CustomizationScreen extends React.Component {
    state = {
        block: "",
		teacherDisplay: "",
		classNameDisplay: "",
		activities: "",
		phoneNumber: "",
		teacher: {
			'A' : '' , 
			'B' : '' , 
			'C' : '' , 
			'D' : '' , 
			'E' : '' , 
			'F' : '' , 
			'G' : '',
			'Z' : "",
			'T' : '',
			'X' : ''
		  },
		  className: {
			'A' : '' , 
			'B' : '' , 
			'C' : '' , 
			'D' : '' , 
			'E' : '' , 
			'F' : '' , 
			'G' : '',
			'Z' : "",
			'T' : '',
			'X' : ''
		  },
		  pfp: null,
		  name: null,
		  grade: null,
		  activities: null,
	};

	options = {
		blocks:['A','B','C','D','E','F','G','Z','T','X'],
		teachers: ['Free','Alexander, Melanee', 'Alibhai, Marika', 'Allegrezza, Christina', 'Allen, Astrid', 'Anderson, Marcella', 'Angione, Mary', 'Asselin, Lindsay', 'Babitskaya, Katya', 'Bader, Alex', 'Barkett, Scott', 'Barrer-Gall, Jennifer', 'Barrett, Jake', 'Bayer, Amy', 'Beaulieu-Jones, Kyle', 'Berman, Ben', 'Bernier, Kathleen', 'Bishop, Nina', 'Blette, Erin', 'Breneisen, Jennifer', 'Brennan, Elizabeth', 'Broken Rope, Zac', 'Brown, Briana', 'Brown, Tyler', 'Buhl, Elizabeth', 'Burke-Hunter, Joanne', 'Burns, Amy', 'Buys, Kari', 'Camara, Monica', 'Carpenter, Paul', 'Carruthers, Christine', 'Castellano, Carolyn', 'Cawthorne, Malcolm', 'Cells, Meaghan', 'Chang, Fu-Tseng', 'Chiu, Linda', 'Colburn, Eric', 'Conner, Alisa', 'Crane, Elizabeth', 'Crepeau, Andy', 'Crocker, Alison', 'Crossen, Heather', 'Crusberg, Gretchen', 'Cruz-López, Elena', 'Davis, Elizabeth', 'Davis, Lindsay', 'DeGrace, Matthew', 'DeYoung, Mike', 'Derrien, Andre', 'Dickerman, Sam', 'Differ, Betty', 'Dillon, Colleen', 'Dondero, Ali', 'Driscoll, Michael', 'DuBois, Matthew', 'Eio, Rachel', 'Fiedor, Mark', 'Fischer, Elon', 'Flynn-Carson, Keira', 'Ford, David', 'Frey, Jennifer', 'Fried, Adam', 'Friedland, Craig', 'Fuertes, Marta', 'Giblin, Heather', 'Glazer, Caryn', 'Goose, Stephen', 'Gorlin, Sophie', 'Gorman, Elizabeth', 'Graham, Billy', 'Grande, Roger', 'Gray, Emily', 'Griffin, Kelle', 'Gronlund-Jacob, Noah', 'Grubb, Jennifer', 'Grunseich, Ivonne', 'Gurner, Glen', 'Gurry, Laura', 'Hanaghan, Jennifer', 'Harrington, Gaelen', 'Hayden, Rebecca', 'Hemphill, Sarah', 'Henry, Jim', 'Hernandez, Mayra', 'Hitchcock, Kathy', 'Honeywood, Laura', 'Hunt, Emily', 'Hunt, Stephanie', 'Irabarren-Lopez, Gisela', 'Irvin, Holly', 'James, Julia', 'Jaruse, Jennifer', 'Joyal, Julie', 'Juo, Jasmine', 'Kanter-Caruso, Kathryn', 'Keenan, Barbara', 'Kelly, Andy', 'Kennedy-Justice, Meghan', 'Kimball, Andrew', 'Kissel, Stacy', 'Knott, David', 'Kobus, Brendan', 'Kornell, Sarah', 'Kostant, Shoshanna', 'Kozel, Brad', 'Kramer, Jason', 'Labouchere, Natalie', 'Ladner, Sarah', 'Lamb, Dorian', 'Lantos, Steve', 'Latimer, Eric', 'Lauro-Priestly, Paul', 'Lee, John', 'Lehman, Amanda', 'Leonard, Sarah', 'Leslie, Elsbeth', 'Leslie, Kathryn', 'Lima, Gretchen', 'Little, Benjamin', 'Longmire, Jenny', 'Lopez, Kara', 'Love, Aubrey', 'Lowe, Kathleen', 'Lynch, Andrea', 'Lynn, Lori', 'Maglathlin, Andrew', 'Maimonis, Elena', 'Mangan, Julia', 'Marcos, Reiko', 'Martin, Jennifer', 'Mastandrea, Mary', 'McAllister, Stephanie', 'McCarthy, Brendan', 'McElroy, Sandra', 'McGee, Patrick', 'McGinnis, Emily', 'Meagher, Peter', 'Mendez, Pedro', 'Myers, Wes', 'Miller, Marcie', 'Mitchell, Dave', 'Mohamedi, Graciela', 'Montrose, Jason', 'Morimando, Beau', 'Morris, Ian', 'Morrow, Kelly', 'Mousseau, Evan', 'Muldowney, Nicole', 'Murphy, Alexis', 'Murphy, Kristen', 'Mwosa, Thato', 'Mylchreest, Tom', 'Naimy, Julia', 'Nardi, Talmadge', 'Normant, Michael', "O'Connell, Brendan", "O'Mahony, Erica", 'Ouellette, Katy Frost', 'Padgett, Julie', 'Page, Jacob', 'Paniagua, Juan', 'Parisi, Katelyn', 'Parker, Alissa', 'Pero, Nick', 'Petty, David', 'Poon, Brian', 'Primmer, Robert', 'Proctor, Michael', 'Putnam, Dean', 'Rabina, Danielle', 'Reagan, Rachel', 'Richer, Meghan', 'Rocco, Julia', 'Rodriguez, Lisa', 'Rose-Wood, Jennifer', 'Ross, Robin', 'Rothstein, Nicholas', 'Sakaria, Devina', 'Saler, Judy', 'Sartanowicz, Donna', 'Sawyer Delano, Amy', 'Schiff, Matt', 'Sedlak, Peter', 'Shapiro, Fukiko', 'Shen, Christine', 'Shields, Elaine', 'Shorter, Lihua', 'Shuster, Sarah', 'Siver, Emma', 'Skeen, Hayley', 'Spencer, Jennifer', 'Speyer, Julia', 'Stevens, Britt', 'Strauss, Lindsay', 'Strong, Betty', 'Thomas, Keith', 'Toback, Robin', 'Tobey, Kristina', 'Tong, Jason', 'VanDerzee, Mark', 'Vanderclock, Perri', 'Vassallo, Cassie', 'Veader, Mark', 'Vendola, Joslyn', 'Wallace, Erin', 'Wang, Grace', 'Wang, Kevin', 'Wells, Hayley', 'Wheeler, Mark', 'Whitebone, Alison', 'Whitehead, Kevin', 'Williams, Eli', 'Williams, Summer', 'Winkler, Deborah', 'Wise, Lindsay', 'Wiser, Ed', 'Wolf, Catherine', 'Wong, Karen', 'Woolever, Chloe', 'Wooley, Kate', 'Yazdiha, Solmaaz', 'Zembruski, Alexandra']
	}
	componentDidMount() {
		this.retrieveData();
	}

	retrieveData(){

			firebase.database().ref('Users/' + user.uid).on('value', (snapshot) => {
					var name = snapshot.val().name;
					if (name == null){
						name = user.displayName
					}
					var pfp = snapshot.val().pfp
					if (pfp == null){
						pfp = user.photoURL
					}
					this.setState({
						name: name,
						activities: snapshot.val().activities,
						grade: snapshot.val().grade,
						phone: snapshot.val().phoneNumber,
						pfp: pfp,

					})
					if (snapshot.hasChild('teacher')){
						firebase.database().ref('Users/' + user.uid + '/teacher').on('value', (snapshot) => {
							this.setState(
							  {
								  teacher:{
									'A' : snapshot.val().A , 
									'B' : snapshot.val().B , 
									'C' : snapshot.val().C , 
									'D' : snapshot.val().D , 
									'E' : snapshot.val().E ,
									'F' : snapshot.val().F , 
									'G' : snapshot.val().G,
									'Z' : snapshot.val().Z,
									'T' : snapshot.val().T,
									'X' : snapshot.val().X
								  }
							}
							);
							
						})
					}

					if (snapshot.hasChild('className')){
						firebase.database().ref('Users/' + user.uid + '/className').on('value', (snapshot) => {
							this.setState(
							  {
								  className:{
									'A' : snapshot.val().A , 
									'B' : snapshot.val().B , 
									'C' : snapshot.val().C , 
									'D' : snapshot.val().D , 
									'E' : snapshot.val().E ,
									'F' : snapshot.val().F , 
									'G' : snapshot.val().G,
									'Z' : snapshot.val().Z,
									'T' : snapshot.val().T,
									'X' : snapshot.val().X
								  }
							}
						);
					})
					}
								
			})
}

	saveClass(block, teacher, className) {
		firebase
		  .database()
		  .ref('Users/' + user.uid + '/teacher')
		  .update({
			[block]: teacher,
		  });

		  firebase
		  .database()
		  .ref('Users/' + user.uid + '/className')
		  .update({
			[block]: className,
		  });

		  Alert.alert(
			"The following class has successfully been saved!",
			block + " Block: " + className + " - " + teacher
			
		  );
		  

		  firebase
		  .database()
		  .ref('Classes/' + block + '/' + teacher)
		  .push({
			uid: user.uid,
		  });
		  
		  this.state.teacher[block] = teacher
		  this.state.className[block] = className
		
	  }

	  saveProfile () {

		firebase
		  .database()
		  .ref('Users/' + user.uid)
		  .update({
			name: this.state.name,
			grade: this.state.grade,
			activities: this.state.activities,
			phoneNumber: this.state.phoneNumber,
			pfp: this.state.pfp,
		  });


		  Alert.alert(
			  "Your profile has successfully been saved."
			);
		this.props.navigation.navigate('Profile')
	  }
	
	  blockValueChange(block){
		this.setState({block: block});
		this.state.teacherDisplay = this.state.teacher[block]
		if (this.state.teacherDisplay == null)
		{
			this.state.teacherDisplay = "";
		}
		this.state.classNameDisplay = this.state.className[block]
		if (this.state.classNameDisplay == null)
		{
			this.state.classNameDisplay = "";
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
				this.setState({pfp: result.uri})
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
			<ScrollView style={styles.container}>

				<Header
					leftComponent={<Icon name="x" type="feather" color="#fff" onPress={() => this.props.navigation.navigate('Profile')}/>}
					rightComponent={<Icon name="check" color="#fff" onPress={() => this.saveProfile()}/>}
				/>
				
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
				{this.state.pfp && <Image source={{ uri: this.state.pfp }} style={styles.pfp} />}
				<View style={styles.editContainer}>
				<MaterialIcons.Button borderRadius={100} style={styles.edit} name="edit" onPress={() => this.pickImage()} />
				</View>
				</View>

				<View style={{flex: 1}}>
				<Input placeholder="John Doe"
						label = "Name"
						onChangeText={name => this.setState({ name })}
						value={this.state.name}
					/> 
				</View>

				<View style={{flex: 1}}>
				<Input placeholder="10"
						label = "Grade"
						onChangeText={grade => this.setState({ grade })}
						value={this.state.grade}
						keyboardType='number-pad'
				/> 
				</View>

				<View style={{flex: 1}}>
				<Input placeholder="App Dev. Club, Drama, Cross Country"
						label="Activities"
						onChangeText={activities => this.setState({ activities })}
						value={this.state.activities}
				/> 
				</View>

				<View style={{flex: 1}}>
				<Input placeholder="555-555-5555"
						label = "Phone Number"
						onChangeText={phoneNumber => this.setState({ phoneNumber })}
						  value={this.state.phoneNumber}
						  keyboardType='number-pad' /> 				
				</View>

				<View style={{flex: 1, margin: 10, padding: 10, backgroundColor: 'orange', borderRadius: 10}}>
					<View style={{flexDirection: 'row'}}>
						<View style={{flex:1, marginVertical: 20, marginHorizontal: 10}}>
								<View style={{ height: 50, backgroundColor: 'white', borderRadius: 20 }}>
								<RNPickerSelect
						placeholder={{ label: "Block", value: null }}
						onValueChange={(block) => this.blockValueChange(block)}
						value ={this.state.block}
						style={ {inputAndroid: {color: 'black'}, inputIOSContainer: {margin: 10}}}
						items={blocks}
					/>
					</View>
			
					</View>

						<View style={{flex:2, marginVertical: 20, marginRight: 10}}>
						<View style={{ height: 50, backgroundColor: 'white', borderRadius: 25 }}>
						
						<RNPickerSelect
						placeholder={{ label: "Teacher", value: null }}
						style={ {inputAndroid: {color: 'black'}, inputIOSContainer: {margin: 10} }}
						onValueChange={(teacherDisplay) => this.setState({ teacherDisplay })}
						value  = {this.state.teacherDisplay}
						items={teachers}		
						/>
				
						</View>
						</View>
						</View>
						<View style={{flexDirection: 'row'}}>
					<View style={{flex: 3}}>
					<TextInput placeholder="Class Name"
							style={styles.textInput} 
							onChangeText={classNameDisplay => this.setState({ classNameDisplay })}
							value={this.state.classNameDisplay} /> 
					</View>


					<View style={{flex: 1}}>
					<TouchableOpacity style = {styles.button} onPress = {() => {
						this.saveClass(this.state.block, this.state.teacherDisplay, this.state.classNameDisplay)
					}}>
						<Text style={styles.buttonText}>Record Class</Text>
					</TouchableOpacity>
					</View>
					</View>
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
		backgroundColor: '#ededed',
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
