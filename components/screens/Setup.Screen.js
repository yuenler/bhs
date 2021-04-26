import React from 'react';
import {Button, StyleSheet, Alert, View, Text} from 'react-native';
import {globalStyles} from '../GlobalStyles';
import {Input} from 'react-native-elements'
import * as Location from 'expo-location';
import firebase from 'firebase';

export default class SetupScreen extends React.Component {

    state={
      question: 1,
      schoolType: '',
      zipCode: '',
      nearbySchools: [],
    }

    get schoolRef(){
      return firebase.database().ref('publicSchools')
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

    onGPS(){
      this.setState({question: 5})
    }

    onAddress(){
      this.setState({question: 6})
    }

    getLocation = async() => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permission to access location was denied');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            this.getNearbySchools(location.latitude, location.longitude);
      }

    getNearbySchools(latitude, longitude) {
      this.ref.on('child_added', (snapshot) => {
        // use distance formula to calculate distance
        let latitudeDifference = latitude - snapshot.val().latitude
        let longitudeDifference = longitude - snapshot.val().longitude

        let latitudeDifferenceKM = latitudeDifference/110.574
        let longitudeDifferenceKM = Math.acos(longitudeDifference/111.320)

        let distance = Math.sqrt(latitudeDifferenceKM **2 + longitudeDifferenceKM**2)

        // We define a nearby school as being within a 5 kilometer distance
        if (distance < 5){
          let nearbySchool = snapshot.val()
          nearbySchool[distance] = distance
          this.state.nearbySchools = this.state.nearbySchools.concat(nearbySchool)
          this.forceUpdate()
        }
        
      })
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
          <Text>We need to find your school! How would you like to find your school?</Text>
          </View>

          <View style={{flex: 1}}>
          <Button 
          onPress={() => this.onGPS()}
          title="Use my phone's GPS to find schools nearby"/>
          </View>

          <View style={{flex: 1}}>
          <Button 
          onPress={() => this.onAddress()}
          title="Enter school address"/>
          </View>

          </View>
          : null
        }

        {this.state.question==6?
          <View>
          <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>We need to find your school! My school's zip code is...</Text>
          </View>

          <View style={{flex: 1}}>
          <Input placeholder="XXXXX"
						label="Zip code"
						onChangeText={zipCode => this.setState({ zipCode })}
						value={this.state.zipCode}
				/> 
        </View>

          </View>
          : null
        }


      </View>
		);
	}
}

const styles = StyleSheet.create({
	
});
