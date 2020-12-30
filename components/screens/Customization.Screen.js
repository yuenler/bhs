import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from 'react-native';

export default class CustomizationScreen extends React.Component {
    state = {
        block: "",
        teacher: ""
	};

	options = {
		blocks:['A','B','C','D','E','F','G'],
		teachers: ['Adam','alex']
	}


	render() {

		let blocks = this.options.blocks.map( (s) => {
            return <Picker.Item value={s} label={s} />
		});
		
		let teachers = this.options.teachers.map( (s) => {
            return <Picker.Item value={s} label={s} />
        });
	
		return (
			<View>
                 <Picker
                selectedValue={this.state.block}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue) => this.setState({ block: itemValue })}>
                {blocks}

                </Picker>

				<Picker
                selectedValue={this.state.teacher}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue) => this.setState({ teacher: itemValue })}>
                {teachers}

                </Picker>

				<TouchableOpacity style = {styles.button} onPress = {() => {
					// handleRecord()
				}}>
					<Text style={styles.buttonText}>Record Class</Text>
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
