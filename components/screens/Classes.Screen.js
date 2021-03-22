import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import user from '../User'



export default class ClassesScreen extends React.Component {

  state = {
    ready: false,
    Ateacher: "",
    Bteacher: "",
    Cteacher: "",
    Dteacher: "",
    Eteacher: "",
    Fteacher: "",
    GAteacher: "",
    Zteacher: "",
    Tteacher: "",
    Xteacher: "",
  }


    onPress(block){
        if (this.state[block + 'teacher'] != null){
        console.log('classes' + block)
        this.props.navigation.navigate('Messages', {block: block, teacher: this.state[block + 'teacher'] })
        }
        else{
          Alert.alert(
						"You need to customize your " + block + " Block class first!",
            "",
						[
						  {
							text: "Cancel",
							style: "cancel"
						  },
						  { text: "Customize", onPress: () => this.props.navigation.navigate('Customize')}
						],
						{ cancelable: false }
					  );
        }
    }
    


      retrieveData = async()  => {
        try{
      this.state.Ateacher = await AsyncStorage.getItem('Ateacher');
      this.state.Bteacher = await AsyncStorage.getItem('Bteacher');
      this.state.Cteacher = await AsyncStorage.getItem('Cteacher');
      this.state.Dteacher = await AsyncStorage.getItem('Dteacher');
      this.state.Eteacher = await AsyncStorage.getItem('Eteacher');
      this.state.Fteacher = await AsyncStorage.getItem('Fteacher');
      this.state.Gteacher = await AsyncStorage.getItem('Gteacher');
      this.state.Zteacher = await AsyncStorage.getItem('Zteacher');
      this.state.Tteacher = await AsyncStorage.getItem('Tteacher');
      this.state.Xteacher = await AsyncStorage.getItem('Xteacher');
        }
        catch(error){
            console.info(error);
    }
    this.setState({ready: true})
    }

    componentDidMount() {
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.retrieveData();
      });
      this.retrieveData();
      
    }

    componentWillUnmount() {
      this._unsubscribe();
    }



	render() {
    if (!this.state.ready){
      return(null);
    }
    var idxPSBMA = user.email.indexOf('@psbma.org');
    if(this.state.ready && idxPSBMA > -1){
      return(
            <View style={styles.container}>
              <Text style={{color: 'white', margin: 30}}>This screen is only available for students with brooklinek12.org domain emails.</Text>
              </View>
              );
    }
    else{
		return (
			
			<View style={styles.container}>
                <View style = {{flexDirection: 'row', flex: 1}}> 

                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity style = {styles.button} onPress={() => this.onPress('A')}>
					<Text style = {styles.buttonText}>A Block</Text>
				</TouchableOpacity>
                </View>

				<View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style = {styles.button} onPress={() => this.onPress('B')}>
					<Text style = {styles.buttonText}>B Block</Text>
				</TouchableOpacity>
                </View>

                </View>

                <View style = {{flexDirection: 'row', flex: 1}}> 

                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity style = {styles.button} onPress={() => this.onPress('C')}>
					<Text style = {styles.buttonText}>C Block</Text>
				</TouchableOpacity>
                </View>

				<View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style = {styles.button} onPress={() => this.onPress('D')}>
					<Text style = {styles.buttonText}>D Block</Text>
				</TouchableOpacity>
                </View>

                </View>

                <View style = {{flexDirection: 'row', flex: 1}}> 

                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity style = {styles.button} onPress={() => this.onPress('E')}>
					<Text style = {styles.buttonText}>E Block</Text>
				</TouchableOpacity>
                </View>

				<View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style = {styles.button} onPress={() => this.onPress('F')}>
					<Text style = {styles.buttonText}>F Block</Text>
				</TouchableOpacity>
                </View>

                </View>

                <View style = {{flexDirection: 'row', flex: 1}}> 

                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity style = {styles.button} onPress={() => this.onPress('G')}>
					<Text style = {styles.buttonText}>G Block</Text>
				</TouchableOpacity>
                </View>

				<View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style = {styles.button} onPress={() => this.onPress('Z')}>
					<Text style = {styles.buttonText}>Z Block</Text>
				</TouchableOpacity>
                </View>

                </View>

                <View style = {{flexDirection: 'row', flex: 1}}> 

                <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
				<TouchableOpacity style = {styles.button} onPress={() => this.onPress('T')}>
					<Text style = {styles.buttonText}>T Block</Text>
				</TouchableOpacity>
                </View>

				<View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style = {styles.button} onPress={() => this.onPress('X')}>
					<Text style = {styles.buttonText}>X Block</Text>
				</TouchableOpacity>
                </View>

                </View>

                
			</View>
		);
    }
	}
}

const styles = StyleSheet.create({
	
	container: {
    flex: 1,
    flexDirection: 'column',
		backgroundColor: '#0F182D',
		alignItems: 'center',
		justifyContent: 'center',
    },

    button: {
		backgroundColor: '#871609',
    margin: 10,
		padding: 20,
		borderRadius: 10,
				
    },
    buttonText: {
		fontSize: 20,
      color: '#fff',
      fontFamily: 'Red Hat Display',
	},
});
