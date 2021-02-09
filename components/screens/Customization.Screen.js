import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Alert, TextInput, Linking, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect from 'react-native-picker-select';

export default class CustomizationScreen extends React.Component {
    state = {
		ready: false,
        block: "",
		teacher: "",
		className: "",
		phoneNumber: "",
		teachers: {
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
		  classNames: {
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
		  }
	};

	options = {
		blocks:['A','B','C','D','E','F','G','Z','T','X'],
		teachers: ['Free','Alexander, Melanee', 'Alibhai, Marika', 'Allegrezza, Christina', 'Allen, Astrid', 'Anderson, Marcella', 'Angione, Mary', 'Asselin, Lindsay', 'Babitskaya, Katya', 'Bader, Alex', 'Barkett, Scott', 'Barrer-Gall, Jennifer', 'Barrett, Jake', 'Bayer, Amy', 'Beaulieu-Jones, Kyle', 'Berman, Ben', 'Bernier, Kathleen', 'Bishop, Nina', 'Blette, Erin', 'Breneisen, Jennifer', 'Brennan, Elizabeth', 'Broken Rope, Zac', 'Brown, Briana', 'Brown, Tyler', 'Buhl, Elizabeth', 'Burke-Hunter, Joanne', 'Burns, Amy', 'Buys, Kari', 'Camara, Monica', 'Carpenter, Paul', 'Carruthers, Christine', 'Castellano, Carolyn', 'Cawthorne, Malcolm', 'Cells, Meaghan', 'Chang, Fu-Tseng', 'Chiu, Linda', 'Colburn, Eric', 'Conner, Alisa', 'Crane, Elizabeth', 'Crepeau, Andy', 'Crocker, Alison', 'Crossen, Heather', 'Crusberg, Gretchen', 'Cruz-López, Elena', 'Davis, Elizabeth', 'Davis, Lindsay', 'DeGrace, Matthew', 'DeYoung, Mike', 'Derrien, Andre', 'Dickerman, Sam', 'Differ, Betty', 'Dillon, Colleen', 'Dondero, Ali', 'Driscoll, Michael', 'DuBois, Matthew', 'Eio, Rachel', 'Fiedor, Mark', 'Fischer, Elon', 'Flynn-Carson, Keira', 'Ford, David', 'Frey, Jennifer', 'Fried, Adam', 'Friedland, Craig', 'Fuertes, Marta', 'Giblin, Heather', 'Glazer, Caryn', 'Goose, Stephen', 'Gorlin, Sophie', 'Gorman, Elizabeth', 'Graham, Billy', 'Grande, Roger', 'Gray, Emily', 'Griffin, Kelle', 'Gronlund-Jacob, Noah', 'Grubb, Jennifer', 'Grunseich, Ivonne', 'Gurner, Glen', 'Gurry, Laura', 'Hanaghan, Jennifer', 'Harrington, Gaelen', 'Hayden, Rebecca', 'Hemphill, Sarah', 'Henry, Jim', 'Hernandez, Mayra', 'Hitchcock, Kathy', 'Honeywood, Laura', 'Hunt, Emily', 'Hunt, Stephanie', 'Irabarren-Lopez, Gisela', 'Irvin, Holly', 'James, Julia', 'Jaruse, Jennifer', 'Joyal, Julie', 'Juo, Jasmine', 'Kanter-Caruso, Kathryn', 'Keenan, Barbara', 'Kelly, Andy', 'Kennedy-Justice, Meghan', 'Kimball, Andrew', 'Kissel, Stacy', 'Knott, David', 'Kobus, Brendan', 'Kornell, Sarah', 'Kostant, Shoshanna', 'Kozel, Brad', 'Kramer, Jason', 'Labouchere, Natalie', 'Ladner, Sarah', 'Lamb, Dorian', 'Lantos, Steve', 'Latimer, Eric', 'Lauro-Priestly, Paul', 'Lee, John', 'Lehman, Amanda', 'Leonard, Sarah', 'Leslie, Elsbeth', 'Leslie, Kathryn', 'Lima, Gretchen', 'Little, Benjamin', 'Longmire, Jenny', 'Lopez, Kara', 'Love, Aubrey', 'Lowe, Kathleen', 'Lynch, Andrea', 'Lynn, Lori', 'Maglathlin, Andrew', 'Maimonis, Elena', 'Mangan, Julia', 'Marcos, Reiko', 'Martin, Jennifer', 'Mastandrea, Mary', 'McAllister, Stephanie', 'McCarthy, Brendan', 'McElroy, Sandra', 'McGee, Patrick', 'McGinnis, Emily', 'Meagher, Peter', 'Mendez, Pedro', 'Meyers, Wes', 'Miller, Marcie', 'Mitchell, Dave', 'Mohamedi, Graciela', 'Montrose, Jason', 'Morimando, Beau', 'Morris, Ian', 'Morrow, Kelly', 'Mousseau, Evan', 'Muldowney, Nicole', 'Murphy, Alexis', 'Murphy, Kristen', 'Mwosa, Thato', 'Mylchreest, Tom', 'Naimy, Julia', 'Nardi, Talmadge', 'Normant, Michael', "O'Connell, Brendan", "O'Mahony, Erica", 'Ouellette, Katy Frost', 'Padgett, Julie', 'Page, Jacob', 'Paniagua, Juan', 'Parisi, Katelyn', 'Parker, Alissa', 'Pero, Nick', 'Petty, David', 'Poon, Brian', 'Primmer, Robert', 'Proctor, Michael', 'Putnam, Dean', 'Rabina, Danielle', 'Reagan, Rachel', 'Richer, Meghan', 'Rocco, Julia', 'Rodriguez, Lisa', 'Rose-Wood, Jennifer', 'Ross, Robin', 'Rothstein, Nicholas', 'Sakaria, Devina', 'Saler, Judy', 'Sartanowicz, Donna', 'Sawyer Delano, Amy', 'Schiff, Matt', 'Sedlak, Peter', 'Shapiro, Fukiko', 'Shen, Christine', 'Shields, Elaine', 'Shorter, Lihua', 'Shuster, Sarah', 'Siver, Emma', 'Skeen, Hayley', 'Spencer, Jennifer', 'Speyer, Julia', 'Stevens, Britt', 'Strauss, Lindsay', 'Strong, Betty', 'Thomas, Keith', 'Toback, Robin', 'Tobey, Kristina', 'Tong, Jason', 'VanDerzee, Mark', 'Vanderclock, Perri', 'Vassallo, Cassie', 'Veader, Mark', 'Vendola, Joslyn', 'Wallace, Erin', 'Wang, Grace', 'Wang, Kevin', 'Wells, Hayley', 'Wheeler, Mark', 'Whitebone, Alison', 'Whitehead, Kevin', 'Williams, Eli', 'Williams, Summer', 'Winkler, Deborah', 'Wise, Lindsay', 'Wiser, Ed', 'Wolf, Catherine', 'Wong, Karen', 'Woolever, Chloe', 'Wooley, Kate', 'Yazdiha, Solmaaz', 'Zembruski, Alexandra']
	}
	componentDidMount() {
		this.retrieveData();
	}

	retrieveData = async()  => {
        try{
			this.state.teachers['A'] = await AsyncStorage.getItem('Ateacher');
			this.state.teachers['B'] = await AsyncStorage.getItem('Bteacher');
			this.state.teachers['C'] = await AsyncStorage.getItem('Cteacher');
			this.state.teachers['D'] = await AsyncStorage.getItem('Dteacher');
			this.state.teachers['E'] = await AsyncStorage.getItem('Eteacher');
			this.state.teachers['F'] = await AsyncStorage.getItem('Fteacher');
			this.state.teachers['G'] = await AsyncStorage.getItem('Gteacher');
			this.state.teachers['Z'] = await AsyncStorage.getItem('Zteacher');
			this.state.teachers['T'] = await AsyncStorage.getItem('Tteacher');
			this.state.teachers['X'] = await AsyncStorage.getItem('Xteacher');
			this.state.classNames['A'] = await AsyncStorage.getItem('Aclass');
			this.state.classNames['B'] = await AsyncStorage.getItem('Bclass');
			this.state.classNames['C'] = await AsyncStorage.getItem('Cclass');
			this.state.classNames['D'] = await AsyncStorage.getItem('Dclass');
			this.state.classNames['E'] = await AsyncStorage.getItem('Eclass');
			this.state.classNames['F'] = await AsyncStorage.getItem('Fclass');
			this.state.classNames['G'] = await AsyncStorage.getItem('Gclass');
			this.state.classNames['Z'] = await AsyncStorage.getItem('Zclass');
			this.state.classNames['T'] = await AsyncStorage.getItem('Tclass');
			this.state.classNames['X'] = await AsyncStorage.getItem('Xclass');
			this.state.phoneNumber = await AsyncStorage.getItem('phoneNumber');
			this.setState({ready: true})
        }
        catch(error){
            console.info(error);
		}
	  }

	saveClass = async (block, teacher, className) => {
		let error = false
		try {
		  await AsyncStorage.setItem(block+"teacher", teacher)
		} catch (e) {
			error = true;
		}

		try {
			await AsyncStorage.setItem(block+"class", className)
		  } catch (e) {
			error = true;
		  }

		  if (error){
			  Alert.alert("Error saving changes. Please try again.")
		  }
		  else{
			Alert.alert(
				"The following class has successfully been saved!",
				block + " Block: " + className + " - " + teacher
				
			  );
			  
		  }
		  this.state.teachers[block] = teacher
		  this.state.classNames[block] = className
		
	  }

	  savePhoneNumber = async (phoneNumber) => {
		let error = false;
		try {
		  await AsyncStorage.setItem('phoneNumber', phoneNumber)
		} catch (e) {
		  error = true;
		}

		if (error){
			Alert.alert("Error saving changes. Please try again.")
		}
		else{
		  Alert.alert(
			  "Your phone number has been saved: " + phoneNumber
			);
			
		}
	  }
	
	  blockValueChange(block){
		this.setState({block: block});
		this.state.teacher = this.state.teachers[block]
		if (this.state.teacher == null)
		{
			this.state.teacher = "";
		}
		this.state.className = this.state.classNames[block]
		if (this.state.className == null)
		{
			this.state.className = "";
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
			<View style={styles.container}>

				<View style={{flexDirection: 'row'}}>
					<View style={{flex:1, margin: 20}}>
							<Text style = {{color: 'white', fontFamily: 'Red Hat Display'}}>Block</Text>
							<View style={{ height: 50, width: 100, backgroundColor: 'white', borderRadius: 20 }}>
							<RNPickerSelect
					placeholder={{ label: "Block", value: null }}
					onValueChange={(block) => this.blockValueChange(block)}
					value ={this.state.block}
					style={ {inputAndroid: {color: 'black'} }}
					items={blocks}
				/>
				</View>
		
				</View>

				<View style={{flex:2, margin: 20}}>
				<Text style = {{color: 'white', fontFamily: 'Red Hat Display'}}>Teacher</Text>
				<View style={{ height: 50, width: 200, backgroundColor: 'white', borderRadius: 25 }}>
				
				<RNPickerSelect
				placeholder={{ label: "Select teacher", value: null }}
				style={ {inputAndroid: {color: 'black'} }}
				onValueChange={(teacher) => this.setState({ teacher })}
				value  = {this.state.teacher}
				items={teachers}		
        		/>
		
				</View>
				</View>
				</View>

				<View style={{flexDirection: 'row'}}>
				<View style={{flex: 3}}>
				<TextInput placeholder="Class Name"
						style={styles.textInput} 
						onChangeText={className => this.setState({ className })}
          				value={this.state.className} /> 
				</View>

				<View style={{flex: 1}}>
				<TouchableOpacity style = {styles.button} onPress = {() => {
					this.saveClass(this.state.block, this.state.teacher, this.state.className)
				}}>
					<Text style={styles.buttonText}>Record Class</Text>
				</TouchableOpacity>
				</View>
				</View>
				<View style={{ marginTop: 30, marginBottom: 10, marginHorizontal: 30 }}>
					<Text style={{ color: "#FFF", fontFamily: 'Red Hat Display' }}>The following field will be stored locally on your device unless you request a friend on the Friends Screen.</Text>
					</View>
				<View style={{flexDirection: 'row'}}>
				<View style={{flex:2}}>
				<TextInput placeholder="Phone number"
						style={styles.textInput} 
						onChangeText={phoneNumber => this.setState({ phoneNumber })}
						  value={this.state.phoneNumber}
						  keyboardType='number-pad' /> 
					</View>
					<View style={{ flex: 1 }}>
						<TouchableOpacity style={styles.button} onPress={() => { this.savePhoneNumber(this.state.phoneNumber) }}>
							<Text style={styles.buttonText}>Submit</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View>
					<Text>This app was made by the BHS App Development Club.</Text>
					<TouchableOpacity style={styles.button} onPress={() => {Linking.openURL("https://www.paypal.com/qrcodes/venmocs/800a33bd-3d93-4d38-98c1-a38c384ffbec") }}>
						<Image
						// style={styles.tinyLogo}
						source={require('../../vemno.png')}
						/>
						<Text style={styles.buttonText}>Vemno</Text>
					</TouchableOpacity>
				</View>

				
            </View>
            
		);
	}
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#871609',
		padding: 10,
		borderRadius: 20,
	},
	buttonText: {
		fontSize: 15,
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'Red Hat Display'
	},
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#0F182D',
	},
	textInput: { 
		borderRadius: 20, 
		paddingVertical: 8, 
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 16, 
		borderColor: "rgba(0, 0, 0, 0.2)", 
		borderWidth: 1, 
		marginHorizontal: 20,
		fontFamily: 'Red Hat Display'
	}, 
});
