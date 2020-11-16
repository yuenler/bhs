import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Alert } from 'react-native';
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  sceneContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      email: "",
      password: ""
    };
  }

  onLoginPress = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch(({ message }) => {
        Alert.alert(message);
      })
  }

  render() {
    return (
      <View style={styles.sceneContainer}>
        <Text style={{ fontSize: 50 }}>DayLites</Text>
        <TextInput
          style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, }}
          value={this.state.email}
          onChangeText={text => { this.setState({ email: text }) }}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize='none'
          autoCorrect={false}
        />
        <View style={{ paddingTop: 10 }} />
        <TextInput
          style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, }}
          value={this.state.password}
          onChangeText={text => { this.setState({ password: text }) }}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize='none'
          autoCorrect={false}
        />
        <TouchableOpacity onPress={this.onLoginPress}>
          <Text style={{ fontSize: 30 }}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}