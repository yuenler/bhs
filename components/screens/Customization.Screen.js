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
		teachers: ['','Adam','alex']
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
