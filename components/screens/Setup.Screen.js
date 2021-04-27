import React from 'react';
import {Button, StyleSheet, Alert, View, Text} from 'react-native';
import {globalStyles} from '../GlobalStyles';
import {Input} from 'react-native-elements'
import * as Location from 'expo-location';
import firebase from 'firebase';
import * as Permissions from "expo-permissions";


export default class SetupScreen extends React.Component {

    state={
      question: 1,
      schoolType: '',
      zipCode: '',
      nearbySchools: [],
    }

    get schoolRef(){
      return firebase.database().ref('publicSchools/')
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
      this.getLocation()
    }

    onAddress(){
      this.setState({question: 6})
    }

    getLocation = async() => {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
              Alert.alert('Permission to access location was denied');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            this.getNearbySchools(location.coords.latitude, location.coords.longitude);
      }

    getNearbySchools(latitude, longitude) {
      this.schoolRef.on('child_added', (snapshot) => {
        // use distance formula to calculate distance
        let latitudeDifference = latitude - snapshot.val().latitude
        let longitudeDifference = longitude - snapshot.val().longitude

        let latitudeDifferenceKM = 110.574 * latitudeDifference
        let longitudeDifferenceKM = 111.320 * Math.cos(latitudeDifferenceKM) * longitudeDifference

        let distance = Math.sqrt(latitudeDifferenceKM **2 + longitudeDifferenceKM**2)
        // We define a nearby school as being within a 5 kilometer distance
        if (distance < 3){
          let nearbySchool = snapshot.val()
          nearbySchool.distance = distance
          this.state.nearbySchools = this.state.nearbySchools.concat(nearbySchool)
          this.forceUpdate()
        }
        
      })
    }
      

	  render() {

    var sortedNearbySchools = this.state.nearbySchools.sort(function(a, b) {
      return a.distance - b.distance;
    })    
	
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

        {this.state.question==5?
        <View style={{flex: 1}}>
          {
                sortedNearbySchools.map((l, i) => (
            <View key={i}>
            <Text>{l.name}</Text>
            </View>
          ))
          }
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
