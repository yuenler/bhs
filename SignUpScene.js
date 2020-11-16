import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert} from 'react-native';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
    sceneContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
  });


export default class SignUpScene extends React.Component{

  constructor(props){
    super(props);
    this.state = {isLoadingComplete : false,
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  passwordConfirm: "",
                  };
    }

    
    onCreateAccountPress = () => {
      if (this.state.password != this.state.passwordConfirm){
        Alert.alert("Passwords do not match")
        return;
      }
      else if (this.state.password.length < 6){
        Alert.alert("Your password must be at least 6 characters long.")
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {

        }, (error) => {
          Alert.alert(error.message)
        })
    }

    onBackToLoginPress = () => {
      this.props.navigation.navigate("Login");
    }

    render(){
      const { navigate } = this.props.navigation
      return(
      
        <View style = {styles.sceneContainer}>
         
         <TextInput
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1,  }}
              value = {this.state.firstName}
              onChangeText={text => {this.setState({firstName: text})}}
              placeholder="First Name"
              autoCorrect = {false}
            />

          <View style = {{paddingTop:10}}/>

          <TextInput
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1,  }}
              value = {this.state.lastName}
              onChangeText={text => {this.setState({lastName: text})}}
              placeholder="Last Name"
              autoCorrect = {false}
          />

            <View style = {{paddingTop:10}}/>

            <TextInput
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1,  }}
              value = {this.state.email}
              onChangeText={text => {this.setState({email: text})}}
              placeholder="Email"
              keyboardType = "email-address"
              autoCapitalize = 'none'
              autoCorrect = {false}
            />

            {/* <View style = {{paddingTop:10}}/>

            <TextInput
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1,  }}
              value = {this.state.username}
              onChangeText={text => {this.setState({username: text})}}
              placeholder="Username"
              autoCorrect = {false}
            /> */}
            
            <View style = {{paddingTop:10}}/>
  
            <TextInput
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1,  }}
              value = {this.state.password}
              onChangeText={text => {this.setState({password: text})}}
              placeholder="Password"
              secureTextEntry = {true}
              autoCapitalize = 'none'
              autoCorrect = {false}
            />

            <View style = {{paddingTop:10}}/>

            <TextInput
              style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1,  }}
              value = {this.state.passwordConfirm}
              onChangeText={text => {this.setState({passwordConfirm: text})}}
              placeholder="Confirm Password"
              secureTextEntry = {true}
              autoCapitalize = 'none'
              autoCorrect = {false}
            />

            <TouchableOpacity onPress={this.onCreateAccountPress}>
                <Text style = {{fontSize: 30}}>Create Account</Text>
            </TouchableOpacity>
  
            <TouchableOpacity onPress={this.onBackToLoginPress}>
                <Text style = {{fontSize: 30}}>Back to Login</Text>
            </TouchableOpacity>
        </View>
      );
      
    }
  }