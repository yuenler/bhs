import React from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {colorCode} from '../GlobalColors';
import firebase from 'firebase';
import {Badge} from 'react-native-elements'
import user from '../User'


export default class Block extends React.Component {

  state={
    timer: '',
    unread: false
  };

  componentDidMount() {
    if (this.props.isCurrentBlock){
      setInterval(() => this.setState({ timer: this.determineTimer()}), 100);
    }
    this.checkForNewMessages(this.props.title)
  }

  determineTimer(){
    var currentDate = new Date();
    //code to determine ....not done yet so it's just returning current date for now
    return currentDate.getSeconds();
  }

  checkForNewMessages(block) {
    if (this.props.teacher != null) {
      firebase.database().ref('Messages/' + block + '/' + this.props.teacher)
      .limitToLast(1)
      .on('child_added', (snapshot) => {
      this.setState({unread: false},
      () => this.determineIfUnread(snapshot.val().createdAt, block));
      
        });

    }
  }

  determineIfUnread(createdAt, block){
    firebase.database().ref('Users/' + user.uid)
    .on('value', (snapshot) => {
      if (new Date(createdAt) > new Date(snapshot.val()['last_read' + block])){
        this.setState({unread: true})
      }
    })
  }

  onPressMessage(){
    if (this.props.teacher != null){
    this.props.navigation.navigate('Messages',{block:this.props.title, teacher:this.props.teacher})
    }
    else{
      this.needToCustomizeAlertMessage(this.props.title);
    }
  }

  onPressViewClassmates(){
    if (this.props.teacher != null){
      this.props.navigation.navigate('View Classmates',{block:this.props.title, teacher:this.props.teacher})
    }
    else{
      this.needToCustomizeAlertMessage(this.props.title)
    }
  }

  needToCustomizeAlertMessage(block){
    Alert.alert(
      "You need to customize your " + block + " Block class first!",
      "",
      [
        {
        text: "Cancel",
        style: "cancel"
        },
        { text: "Customize", onPress: () => this.props.navigation.navigate('Profile')}
      ],
      { cancelable: false }
      );
  }
  

  render() {
    const styled = styles(this.props.color, this.props.background, this.props.height, this.props.isCurrentBlock);
    return (
      <View style={styled.block}>
        <View style={{flexDirection: 'row', flex: 2}}>
        <View style={{flex: 1}}>
        <Text style={styled.title}>{this.props.title + " " + this.props.name}</Text>
        </View>
        <View style={styled.timeContainer}>
            <Text style={styled.time}>{this.state.timer}</Text>
        </View>
        <View style={styled.buttonContainer}>
          
        <View style={{marginRight: 10}}>
            <View style={{marginLeft: 20}}>
            {this.state.unread == true? 
                    <Badge status="primary" />
                  : null }
            </View>
             <Ionicons.Button
              name = "ios-chatbubbles"
              style={styled.button}
              onPress={() => this.onPressMessage()}
            />  
          </View>
          <View>
        <Ionicons.Button
              name = "ios-eye"
              style={styled.button}
              onPress={() => this.onPressViewClassmates()}
            />
            </View>
            
          </View>
        </View>
        <View style={{flex:1}}>
        
        {this.props.starts != ''? 
                <Text style={styled.times}>{this.props.starts} - {this.props.ends}</Text>
              : null }
        </View>
      </View>
    )
  }
}

const styles = (color, bg, height, isCurrentBlock) => StyleSheet.create({
  block: {
    flex:1,
    marginLeft: 9,
    marginTop: 4.5,
    marginBottom: 4.5,
    marginRight: 9,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#27187E',
    borderWidth: isCurrentBlock*3,
    borderRadius: 10,
    backgroundColor: colorCode.scheduleBlockLavender,
    flexDirection: 'column',
  },
  title: {
    fontSize: 25,
    fontFamily: 'Red Hat Display',
    color: '#454545'
  },
  times: {
    fontSize: 14,
    fontFamily: 'Red Hat Display',
    position: 'absolute',
    width: '100%',
    textAlign: 'right',
    color: "#454545"
  },
  button: {
    paddingVertical: 2,
    paddingLeft: 7,
    paddingRight: 0,
  },
  buttonContainer:{
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  time:{
    fontFamily: 'Red Hat Display',
    color: "#000000"
  
  },
  timeContainer:{
    flex: 1,

  }

})