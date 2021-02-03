import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Alert, TextInput, Linking} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';

export default class CustomizationScreen extends React.Component {
    state = {
        block: "",
		teacher: "",
		className: "",
		phoneNumber: "",
	};

	options = {
		blocks:['','A','B','C','D','E','F','G'],
		teachers: ['Alexander, Melanee', 'Alibhai, Marika', 'Allegrezza, Christina', 'Allen, Astrid', 'Anderson, Marcella', 'Angione, Mary', 'Asselin, Lindsay', 'Babitskaya, Katya', 'Bader, Alex', 'Barkett, Scott', 'Barrer-Gall, Jennifer', 'Barrett, Jake', 'Bayer, Amy', 'Beaulieu-Jones, Kyle', 'Berman, Ben', 'Bernier, Kathleen', 'Bishop, Nina', 'Blette, Erin', 'Breneisen, Jennifer', 'Brennan, Elizabeth', 'Broken Rope, Zac', 'Brown, Briana', 'Brown, Tyler', 'Buhl, Elizabeth', 'Burke-Hunter, Joanne', 'Burns, Amy', 'Buys, Kari', 'Camara, Monica', 'Carpenter, Paul', 'Carruthers, Christine', 'Castellano, Carolyn', 'Cawthorne, Malcolm', 'Cells, Meaghan', 'Chang, Fu-Tseng', 'Chiu, Linda', 'Colburn, Eric', 'Conner, Alisa', 'Crane, Elizabeth', 'Crepeau, Andy', 'Crocker, Alison', 'Crossen, Heather', 'Crusberg, Gretchen', 'Cruz-López, Elena', 'Davis, Elizabeth', 'Davis, Lindsay', 'DeGrace, Matthew', 'DeYoung, Mike', 'Derrien, Andre', 'Dickerman, Sam', 'Differ, Betty', 'Dillon, Colleen', 'Dondero, Ali', 'Driscoll, Michael', 'DuBois, Matthew', 'Eio, Rachel', 'Fiedor, Mark', 'Fischer, Elon', 'Flynn-Carson, Keira', 'Ford, David', 'Frey, Jennifer', 'Fried, Adam', 'Friedland, Craig', 'Fuertes, Marta', 'Giblin, Heather', 'Glazer, Caryn', 'Goose, Stephen', 'Gorlin, Sophie', 'Gorman, Elizabeth', 'Graham, Billy', 'Grande, Roger', 'Gray, Emily', 'Griffin, Kelle', 'Gronlund-Jacob, Noah', 'Grubb, Jennifer', 'Grunseich, Ivonne', 'Gurner, Glen', 'Gurry, Laura', 'Hanaghan, Jennifer', 'Harrington, Gaelen', 'Hayden, Rebecca', 'Hemphill, Sarah', 'Henry, Jim', 'Hernandez, Mayra', 'Hitchcock, Kathy', 'Honeywood, Laura', 'Hunt, Emily', 'Hunt, Stephanie', 'Irabarren-Lopez, Gisela', 'Irvin, Holly', 'James, Julia', 'Jaruse, Jennifer', 'Joyal, Julie', 'Juo, Jasmine', 'Kanter-Caruso, Kathryn', 'Keenan, Barbara', 'Kelly, Andy', 'Kennedy-Justice, Meghan', 'Kimball, Andrew', 'Kissel, Stacy', 'Knott, David', 'Kobus, Brendan', 'Kornell, Sarah', 'Kostant, Shoshanna', 'Kozel, Brad', 'Kramer, Jason', 'Labouchere, Natalie', 'Ladner, Sarah', 'Lamb, Dorian', 'Lantos, Steve', 'Latimer, Eric', 'Lauro-Priestly, Paul', 'Lee, John', 'Lehman, Amanda', 'Leonard, Sarah', 'Leslie, Elsbeth', 'Leslie, Kathryn', 'Lima, Gretchen', 'Little, Benjamin', 'Longmire, Jenny', 'Lopez, Kara', 'Love, Aubrey', 'Lowe, Kathleen', 'Lynch, Andrea', 'Lynn, Lori', 'Maglathlin, Andrew', 'Maimonis, Elena', 'Mangan, Julia', 'Marcos, Reiko', 'Martin, Jennifer', 'Mastandrea, Mary', 'McAllister, Stephanie', 'McCarthy, Brendan', 'McElroy, Sandra', 'McGee, Patrick', 'McGinnis, Emily', 'Meagher, Peter', 'Mendez, Pedro', 'Meyers, Wes', 'Miller, Marcie', 'Mitchell, Dave', 'Mohamedi, Graciela', 'Montrose, Jason', 'Morimando, Beau', 'Morris, Ian', 'Morrow, Kelly', 'Mousseau, Evan', 'Muldowney, Nicole', 'Murphy, Alexis', 'Murphy, Kristen', 'Mwosa, Thato', 'Mylchreest, Tom', 'Naimy, Julia', 'Nardi, Talmadge', 'Normant, Michael', "O'Connell, Brendan", "O'Mahony, Erica", 'Ouellette, Katy Frost', 'Padgett, Julie', 'Page, Jacob', 'Paniagua, Juan', 'Parisi, Katelyn', 'Parker, Alissa', 'Pero, Nick', 'Petty, David', 'Poon, Brian', 'Primmer, Robert', 'Proctor, Michael', 'Putnam, Dean', 'Rabina, Danielle', 'Reagan, Rachel', 'Richer, Meghan', 'Rocco, Julia', 'Rodriguez, Lisa', 'Rose-Wood, Jennifer', 'Ross, Robin', 'Rothstein, Nicholas', 'Sakaria, Devina', 'Saler, Judy', 'Sartanowicz, Donna', 'Sawyer Delano, Amy', 'Schiff, Matt', 'Sedlak, Peter', 'Shapiro, Fukiko', 'Shen, Christine', 'Shields, Elaine', 'Shorter, Lihua', 'Shuster, Sarah', 'Siver, Emma', 'Skeen, Hayley', 'Spencer, Jennifer', 'Speyer, Julia', 'Stevens, Britt', 'Strauss, Lindsay', 'Strong, Betty', 'Thomas, Keith', 'Toback, Robin', 'Tobey, Kristina', 'Tong, Jason', 'VanDerzee, Mark', 'Vanderclock, Perri', 'Vassallo, Cassie', 'Veader, Mark', 'Vendola, Joslyn', 'Wallace, Erin', 'Wang, Grace', 'Wang, Kevin', 'Wells, Hayley', 'Wheeler, Mark', 'Whitebone, Alison', 'Whitehead, Kevin', 'Williams, Eli', 'Williams, Summer', 'Winkler, Deborah', 'Wise, Lindsay', 'Wiser, Ed', 'Wolf, Catherine', 'Wong, Karen', 'Woolever, Chloe', 'Wooley, Kate', 'Yazdiha, Solmaaz', 'Zembruski, Alexandra']
	}

	saveClass = async (block, teacher, className) => {
		error = false
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
		
	  }

	  savePhoneNumber = async (phoneNumber) => {
		error = false;
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
	

	render() {

		let blocks = this.options.blocks.map( (s) => {
            return <Picker.Item key={s} value={s} label={s} />
		});
		
		let teachers = this.options.teachers.map( (s) => {
            return <Picker.Item key={s} value={s} label={s} />
        });
	
		return (
			<View style={styles.container}>
				<View style={{flexDirection: 'row'}}>
				<View style={{flex:1, margin: 20}}>
					<Text style = {{color: 'white', fontFamily: 'Red Hat Display'}}>Block</Text>
                 <Picker
                selectedValue={this.state.block}
                style={{ height: 50, width: 100, backgroundColor: 'white'}}
                onValueChange={(block) => this.setState({ block})}>
                {blocks}

                </Picker>
				</View>

				<View style={{flex:2, margin: 20}}>
				<Text style = {{color: 'white', fontFamily: 'Red Hat Display'}}>Teacher</Text>
				<Picker
                selectedValue={this.state.teacher}
                style={{ height: 50, width: 200, backgroundColor: 'white' }}
                onValueChange={(teacher) => this.setState({ teacher })}>
                {teachers}

                </Picker>
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

				<View style={{marginTop: 30, marginHorizontal: 30}}>
				<Text style={{color: "#FFF", fontFamily: 'Red Hat Display'}}>The following field will be stored locally on your device unless you request a friend on the Friends Screen.</Text>
				</View>
				
				<View style={{flexDirection: 'row'}}>
				<View style={{flex:2}}>
				<TextInput placeholder="Phone number"
						style={styles.textInput} 
						onChangeText={phoneNumber => this.setState({ phoneNumber })}
						  value={this.state.phoneNumber}
						  keyboardType='number-pad' /> 
				</View>
				<View style={{flex:1}}>
				<TouchableOpacity style = {styles.button} onPress = {() => {this.savePhoneNumber(this.state.phoneNumber)}}>
					<Text style={styles.buttonText}>Submit</Text>
				</TouchableOpacity>
				</View>
				</View>

				<View style={{margin: 20}}>
				<Text style={{color: 'white'}}>Creating the Brookline High School App takes time, effort, and money. To help support and give back to the BHS App Development Club, click on the following button to donate.</Text>
				</View>

				<TouchableOpacity style = {styles.button} onPress = {() => {Linking.openURL('https://gofundme.com')}}>
					<Text style={styles.buttonText}>Donate</Text>
				</TouchableOpacity>

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
		textAlign: 'center'
		
	},
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#0F182D',
	},
	textInput: { 
		// width: "100%",
		borderRadius: 5, 
		paddingVertical: 8, 
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 16, 
		borderColor: "rgba(0, 0, 0, 0.2)", 
		borderWidth: 1, 
		marginHorizontal: 20,
	}, 
});
