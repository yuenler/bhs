import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Alert, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';

export default class CustomizationScreen extends React.Component {
    state = {
        block: "",
		teacher: "",
		phoneNumber: "",
	};

	options = {
		blocks:['A','B','C','D','E','F','G'],
		teachers: ['Adam','alex']
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
                onValueChange={(itemValue) => this.setState({ block: itemValue })}>
                {blocks}

                </Picker>
				</View>

				<View style={{flex:2, margin: 20}}>
				<Text style = {{color: 'white', fontFamily: 'Red Hat Display'}}>Teacher</Text>
				<Picker
                selectedValue={this.state.teacher}
                style={{ height: 50, width: 200, backgroundColor: 'white' }}
                onValueChange={(itemValue) => this.setState({ teacher: itemValue })}>
                {teachers}

                </Picker>
				</View>
				</View>


				<TouchableOpacity style = {styles.button} onPress = {() => {
					// handleRecord()
					this.props.navigation.navigate('Schedule',{block: this.state.block, teacher: this.state.teacher})
					this.props.navigation.navigate('Customize')
				}}>
					<Text style={styles.buttonText}>Record Class</Text>
				</TouchableOpacity>

				<View style={{margin: 30}}>
				<Text style={{color: "#FFF", fontFamily: 'Red Hat Display'}}>The following field will only be used for the Friends screen of the app.</Text>
				</View>

				<TextInput placeholder="Phone number"
						style={styles.textInput} 
						onChangeText={phoneNumber => this.setState({ phoneNumber })}
          				value={this.state.phoneNumber} /> 

				

            </View>
            
		);
	}
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#058244',
		padding: 20,
		borderRadius: 20,
		margin: 20
	},
	buttonText: {
		fontSize: 20,
		color: '#fff',
		
	},
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#0F182D',
	},
	textInput: { 
		width: "80%", 
		borderRadius: 5, 
		paddingVertical: 8, 
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 16, 
		borderColor: "rgba(0, 0, 0, 0.2)", 
		borderWidth: 1, 
	}, 
});
