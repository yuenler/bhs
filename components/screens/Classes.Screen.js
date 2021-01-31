import React, { useReducer } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default class ClassesScreen extends React.Component {

    onA = () => {this.props.navigation.navigate('Messages', 
        {block: 'A' }
      )};

      onB = () => {this.props.navigation.navigate('Messages', 
        {block: 'B'}
      )};
    
      onC = () => {this.props.navigation.navigate('Messages', 
        {block: 'C'}
      )};

      onD = () => {this.props.navigation.navigate('Messages', 
        {block: 'D'}
      )};
      
      onE = () => {this.props.navigation.navigate('Messages', 
        {block: 'E'}
      )};
      
      onF = () => {this.props.navigation.navigate('Messages', 
        {block: 'F'}
      )};
      
      onG = () => {this.props.navigation.navigate('Messages', 
        {block: 'G'}
      )};
    
      onZ = () => {this.props.navigation.navigate('Messages', 
        {block: 'Z'}
      )};
      
      onT = () => {this.props.navigation.navigate('Messages', 
        {block: 'T'}
      )};
      
      onX = () => {this.props.navigation.navigate('Messages', 
        {block: 'X'}
      )};
    
	render() {
        
		return (
			
			<View style={styles.container}>
                <View style = {{flexDirection: 'row'}}> 

                <View style={{flex:1, margin: 20}}>
				<TouchableOpacity style = {styles.button} onPress={this.onA}>
					<Text style = {styles.buttonText}>A Block</Text>
				</TouchableOpacity>
                </View>

				<View style={{flex:1, margin: 20}}>
                <TouchableOpacity style = {styles.button} onPress={this.onB}>
					<Text style = {styles.buttonText}>B Block</Text>
				</TouchableOpacity>
                </View>

                </View>

                <View style = {{flexDirection: 'row'}}> 

                <View style={{flex:1, margin: 20}}>
				<TouchableOpacity style = {styles.button} onPress={this.onC}>
					<Text style = {styles.buttonText}>C Block</Text>
				</TouchableOpacity>
                </View>

				<View style={{flex:1, margin: 20}}>
                <TouchableOpacity style = {styles.button} onPress={this.onD}>
					<Text style = {styles.buttonText}>D Block</Text>
				</TouchableOpacity>
                </View>

                </View>

                <View style = {{flexDirection: 'row'}}> 

                <View style={{flex:1, margin: 20}}>
				<TouchableOpacity style = {styles.button} onPress={this.onE}>
					<Text style = {styles.buttonText}>E Block</Text>
				</TouchableOpacity>
                </View>

				<View style={{flex:1, margin: 20}}>
                <TouchableOpacity style = {styles.button} onPress={this.onF}>
					<Text style = {styles.buttonText}>F Block</Text>
				</TouchableOpacity>
                </View>

                </View>

                <View style = {{flexDirection: 'row'}}> 

                <View style={{flex:1, margin: 20}}>
				<TouchableOpacity style = {styles.button} onPress={this.onG}>
					<Text style = {styles.buttonText}>G Block</Text>
				</TouchableOpacity>
                </View>

				<View style={{flex:1, margin: 20}}>
                <TouchableOpacity style = {styles.button} onPress={this.onZ}>
					<Text style = {styles.buttonText}>Z Block</Text>
				</TouchableOpacity>
                </View>

                </View>

                <View style = {{flexDirection: 'row'}}> 

                <View style={{flex:1, margin: 20}}>
				<TouchableOpacity style = {styles.button} onPress={this.onT}>
					<Text style = {styles.buttonText}>T Block</Text>
				</TouchableOpacity>
                </View>

				<View style={{flex:1, margin: 20}}>
                <TouchableOpacity style = {styles.button} onPress={this.onX}>
					<Text style = {styles.buttonText}>X Block</Text>
				</TouchableOpacity>
                </View>

                </View>

                
			</View>
		);
	}
}

const styles = StyleSheet.create({
	
	container: {
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'center',
    },
    button: {
		backgroundColor: '#0e4bb0',
		padding: 20,
		borderRadius: 20,
		margin: 0,
		
    },
    buttonText: {
		fontSize: 20,
    	color: '#fff',
	},
});
