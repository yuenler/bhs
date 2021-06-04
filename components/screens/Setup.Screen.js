import React from 'react';
import {Button, StyleSheet, Alert, View, Text, TouchableOpacity} from 'react-native';
import {globalStyles} from '../GlobalStyles';
import {Input} from 'react-native-elements'
import * as Location from 'expo-location';
import firebase from 'firebase';
import * as Permissions from "expo-permissions";
import { Touchable } from 'react-native';


export default class SetupScreen extends React.Component {

    state={
      question: 1,
      schoolType: '',
      us_state: '',
      city: '',
      zipCode: '',
      name: '',
      address: '',
      nearbySchools: [],
      similarAddressSchools: [],
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

    onNext(){
      this.setState({question: this.state.question + 1})
    }

    onGuessSchools(){
      this.guessSchools()
      this.setState({question: this.state.question + 1})
    }

    guessSchools(){
      this.schoolRef.on('child_added', (snapshot) => {
        var score = 0
        if (snapshot.val().state === this.state.us_state){
          score += 1
        }
        if (snapshot.val().city === this.state.city){
          score += 1
        }
        if (snapshot.val().zip === this.state.zipCode){
          score += 1
        }
        if (snapshot.val().name === this.state.name){
          score += 3
        }
        if (snapshot.val().address === this.state.address){
          score += 3
        }
        if (score >= 3){
          let school = snapshot.val()
          school.score = score
          this.state.similarAddressSchools = this.state.similarAddressSchools.concat(school)
          this.forceUpdate()
        }
        
        
      })
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

      // from https://www.geodatasource.com/developers/javascript
      distance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
          return 0;
        }
        else {
          var radlat1 = Math.PI * lat1/180;
          var radlat2 = Math.PI * lat2/180;
          var theta = lon1-lon2;
          var radtheta = Math.PI * theta/180;
          var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          if (dist > 1) {
            dist = 1;
          }
          dist = Math.acos(dist);
          dist = dist * 180/Math.PI;
          dist = dist * 60 * 1.1515;
          let kilos = dist * 1.609344
          let miles =  dist * 0.8684
          return {kilos, miles};
        }
      }

    getNearbySchools(latitude, longitude) {
      this.schoolRef.on('child_added', (snapshot) => {
        let distance = this.distance(latitude, longitude, snapshot.val().latitude, snapshot.val().longitude, "K")
        // We define a nearby school as being within a 5 kilometer distance
        if (distance.kilos < 5){
          let nearbySchool = snapshot.val()
          nearbySchool.kilos = distance.kilos
          nearbySchool.miles = distance.miles
          this.state.nearbySchools = this.state.nearbySchools.concat(nearbySchool)
          this.forceUpdate()
        }
        
      })
    }

    onSchoolSelection(){
      
    }
      

	  render() {

    var sortedNearbySchools = this.state.nearbySchools.sort(function(a, b) {
      return a.miles - b.miles;
    }) 
    if (sortedNearbySchools.length > 5){
      sortedNearbySchools = sortedNearbySchools.slice(0, 4);
    }

    var sortedSimilarAddressSchools = this.state.similarAddressSchools.sort(function(a, b) {
      return a.score - b.score;
    }) 
    if (sortedSimilarAddressSchools.length > 5){
      sortedSimilarAddressSchools = sortedSimilarAddressSchools.slice(0, 4);
    }
	
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
            <View key={i} style={styles.buttonContainer}>
            <TouchableOpacity 
            style={styles.button}
            onPress ={() => this.onSchoolSelection(l.id)}>
            <Text>{l.name}</Text>
            <Text>{l.address + ', ' + l.city + ' ' + l.state + ' ' + l.zip}</Text>
            <Text>{l.miles.toFixed(2) + ' mi (' + l.kilos.toFixed(2) + ' km)'}</Text>
            </TouchableOpacity>
            </View>
          ))
          }
        </View>
        : null
      }

    {this.state.question==6?
          <View>
          <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>My school is in...</Text>
          </View>

          <View style={{flex: 1}}>
          <Input placeholder="Alabama"
						label="State"
						onChangeText={us_state => this.setState({ us_state })}
						value={this.state.us_state}
				/> 
        </View>

        <Button 
          onPress={() => this.onNext()}
          title="Next"/>
      
          </View>
          : null
        }

    {this.state.question==7?
          <View>
          <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>My school's city/town is...</Text>
          </View>

          <View style={{flex: 1}}>
          <Input placeholder="Cambridge"
						label="City/town"
						onChangeText={city => this.setState({ city })}
						value={this.state.city}
				/> 
        
        </View>

        <Button 
          onPress={() => this.onNext()}
          title="Next"/>
      
          </View>
          : null
        }

        {this.state.question==8?
          <View>
          <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>My school's zip code is...</Text>
          </View>

          <View style={{flex: 1}}>
          <Input placeholder="XXXXX"
						label="Zip code"
						onChangeText={zipCode => this.setState({ zipCode })}
						value={this.state.zipCode}
				/> 
        </View>

        <Button 
          onPress={() => this.onNext()}
          title="Next"/>
      
          </View>
          : null
        }

      {this.state.question==9?
          <View>
          <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>My school's name is...</Text>
          </View>

          <View style={{flex: 1}}>
          <Input placeholder="Harvard College"
						label="School name"
						onChangeText={name => this.setState({ name })}
						value={this.state.name}
				/> 
        </View>

        <Button 
          onPress={() => this.onNext()}
          title="Next"/>
      
          </View>
          : null
        }

      {this.state.question==10?
          <View>
          <View style={{flex: 1, justifyContent: 'center'}}>
          <Text>My school's address is...</Text>
          </View>

          <View style={{flex: 1}}>
          <Input placeholder="86 Brattle Street"
						label="Address"
						onChangeText={address => this.setState({ address })}
						value={this.state.address}
				/> 

        </View>

        <Button 
          onPress={() => this.onGuessSchools()}
          title="Next"/>
      
          </View>
          : null
        }

        {this.state.question==11?
        <View style={{flex: 1}}>
          {
                sortedSimilarAddressSchools.map((l, i) => (
            <View key={i} style={styles.buttonContainer}>
            <TouchableOpacity 
            style={styles.button}
            onPress ={() => this.onSchoolSelection(l.id)}>
            <Text>{l.name}</Text>
            <Text>{l.address + ', ' + l.city + ' ' + l.state + ' ' + l.zip}</Text>
            </TouchableOpacity>
            </View>
          ))
          }
        </View>
        : null
      }

     

        
   



      </View>
		);
	}
}

const styles = StyleSheet.create({
  button: {
		backgroundColor: '#F7F6F9',
		padding: 10,
		paddingHorizontal: 30,
		alignItems: "center", 
		borderRadius: 10,
	},
  buttonContainer:{
    flex: 1
  }
	
});
