import React from 'react';
import {Button, StyleSheet, Alert, View, Text} from 'react-native';
import {globalStyles} from '../GlobalStyles';
import {Input} from 'react-native-elements'
import firebase from 'firebase';

export default class SetupScreen extends React.Component {

    state={
      question: 1,
      schoolType: ''
    }

    onStudent(){
      this.setState({question: 2})
    }

    onNotStudent(){
      Alert.alert("Sorry, this app is currently only available for students.")
    }

    onK12(){
      this.setState({question: 3})
    }

    onCollege(){
      this.setState({question: 4})
      this.state.schoolType = 'college'
    }

    onPublic(){
      this.setState({question: 4})
      this.state.schoolType = 'public'
    }

    onPrivate(){
      this.setState({question: 4})
      this.state.schoolType = 'private'
    }

	  render() {
	
		return (
      <View style={globalStyles.centeredContainer}>
          {this.state.question==1?
          <View>
          <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>I am a...</Text>
          </View>

          <View style={{flex: 1}}>
          <Button 
          onPress={() => this.onStudent()}
          title="Student"/>
          </View>

          <View style={{flex: 1}}>
          <Button 
          onPress={() => this.onNotStudent()}
          title="Teacher"/>
          </View>

          <View style={{flex: 1}}>
          <Button 
          onPress={() => this.onNotStudent()}
          title="Other"/>
          </View>
          </View>
          : null
        }

          {this.state.question==2?
          <View>
          <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>I attend a...</Text>
          </View>

          <View style={{flex: 1}}>
          <Button 
          onPress={() => this.onK12()}
          title="Elementary/ Middle/ High School"/>
          </View>

          <View style={{flex: 1}}>
          <Button 
          onPress={() => this.onCollege()}
          title="College/ University"/>
          </View>

          </View>
          : null
        }

        {this.state.question==3?
          <View>
          <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>My school is...</Text>
          </View>

          <View style={{flex: 1}}>
          <Button 
          onPress={() => this.onPublic()}
          title="Public"/>
          </View>

          <View style={{flex: 1}}>
          <Button 
          onPress={() => this.onPrivate()}
          title="Private"/>
          </View>

          </View>
          : null
        }

        {this.state.question==4?
          <View>
          <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>We need to find your school! My school's zip code is...</Text>
          </View>

          <Input placeholder="XXXXX"
						label="Zip code"
						// onChangeText={activities => this.setState({ activities })}
						// value={this.state.activities}
				/> 

          

          </View>
          : null
        }

      </View>
		);
	}
}

const styles = StyleSheet.create({
	
});
