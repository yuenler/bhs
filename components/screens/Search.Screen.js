import React, { useReducer } from 'react';
import { Text, View, Button, StyleSheet, Alert, TextInput, Linking, ScrollView, FlatList, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import firebase from "firebase";
import user from "../User";
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons} from '@expo/vector-icons';
import { TabView, SceneMap } from 'react-native-tab-view';
import {SearchBar, Header, Icon} from 'react-native-elements';


export default class SearchScreen extends React.Component {

  state = {
    index: 0,
    routes: 
    [
      { key: 'top', title: 'Top' },
      { key: 'student', title: 'Students' },
      { key: 'club', title: 'Clubs' },
    ],
    topSearchResults: [],
    studentSearchResults: [],
    clubSearchResults: [],
    search: '',

  }



  updateSearch = (search) => {
		this.setState({search})
		firebase.database().ref('Users').orderByChild('name').equalTo(search).on("child_added", (snapshot) => {
			this.setState({ 
				studentSearchResults: [this.state.studentSearchResults, ({title: snapshot.val().name})],
        topSearchResults: [this.state.topSearchResults, ({title: snapshot.val().name})]

			});
		})		
    firebase.database().ref('Clubs').orderByChild('name').equalTo(search).on("child_added", (snapshot) => {
			this.setState({ 
				clubSearchResults: [this.state.clubSearchResults, ({title: snapshot.val().name})],
        topSearchResults: [this.state.topSearchResults, ({title: snapshot.val().name})]
			});
		})

	  };

    TopRoute = () =>{
      return(<View style={{ flex: 1, backgroundColor: '#673ab7' }}>
        <FlatList
						data={this.state.topSearchResults}
						renderItem={({ item }) => (
							// Single Comes here which will be repeatative for the FlatListItems
							<Text style={styles.textStyle}>{item.title}</Text>
						  )}
						  keyExtractor={(index) => index.toString()}
					/> 
        </View>)
    }

    StudentRoute = () => {
      return(<View style={{ flex: 1, backgroundColor: '#ff4081' }}>
        			<FlatList
						data={this.state.studentSearchResults}
						renderItem={({ item }) => (
							// Single Comes here which will be repeatative for the FlatListItems
							<Text style={styles.textStyle}>{item.title}</Text>
						  )}
						  keyExtractor={(index) => index.toString()}
					/> 

      </View>)
    }
    
    ClubRoute = () =>{
      return(<View style={{ flex: 1, backgroundColor: '#673ab7' }}>
        <FlatList
						data={this.state.clubSearchResults}
						renderItem={({ item }) => (
							// Single Comes here which will be repeatative for the FlatListItems
							<Text style={styles.textStyle}>{item.title}</Text>
						  )}
						  keyExtractor={(index) => index.toString()}
					/> 
      </View>)
    }
	

	  render() {

     
  
      return (
      <View style={{flex: 1}}>
        <Header
        leftComponent = {<Icon name= "arrow-left" type="font-awesome-5" onPress={() => this.props.navigation.navigate('Friends')}/>}
        rightComponent = {<SearchBar
            round
            containerStyle={{width: 250}}
						placeholder="Type Here..."
						onChangeText={this.updateSearch}
						value={this.state.search}
					/>}
        />
        <TabView
      navigationState= {{ index: this.state.index, routes: this.state.routes}}
      renderScene={SceneMap({
        top: this.TopRoute,
        student: this.StudentRoute,
        club: this.ClubRoute,
      })}
      onIndexChange={() => this.setState({index: this.state.index})}
    />
    </View>
      
		);
	}
}

const styles = StyleSheet.create({
	
});