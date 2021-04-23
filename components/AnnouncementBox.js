import React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import {Icon} from 'react-native-elements';
import user from './User';
import firebase from 'firebase';

export default class AnouncementBox extends React.Component {
  
  state = {
    liked: false,
  }

  get announcementRef(){
    return firebase.database().ref('Announcements/' + this.props.announcementID);
  }

  get likesRef(){
    return firebase.database().ref('Announcements/' + this.props.announcementID  + '/likes');
  }

  

  

  viewProfile(uid){
    this.props.navigation.navigate('View Profile', {uid: uid })
  }

  onLike(liked){
    if (liked){
    this.setState({liked: true})
    this.likesRef.push({
      uid: user.uid,
    })
    }
    else{
      this.setState({liked: false})
      alert('does not do anything to database yet')
    }
  }

  viewFullAnnouncement(){
    this.props.navigation.navigate('View Full Announcement', {id: this.props.announcementID})
  }

  deletePostWarning(){
    Alert.alert("Are you sure?", 
    "Your post will be permanently deleted if you press continue.",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      { text: "Yes", onPress: () => this.deletePost() }
    ]
    )
  }

  deletePost() {
    this.announcementRef.remove();
  }

  render() {
    const styled = styles(this.props.color, this.props.background, this.props.height);
    return (
      <View
        style={styled.block}>

        <View style={{flex:1, flexDirection: 'row',}}>
          <View style={{flex:1}}>
          <Text style={styled.date}>{this.props.date}</Text>
          <Text style={styled.name} onPress={() => this.viewProfile(this.props.uid)}>{this.props.userName}</Text>
          </View>
          {this.props.isOwnPost?
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Icon name='trash' type='evilicon' color='#943623' onPress={() => this.deletePostWarning()}/>
          </View>
          : null 
          }
        </View>

        <View style={{flex:1}}>
        <Text style={styled.title}>{this.props.title}</Text>
        </View>

        <View style={{flex:5}}>
        <Text style={styled.text}>{this.props.text}</Text>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex:1}}>
        {this.state.liked? 
        <Icon name = 'heart' type='ant-design' color='#d4203e' onPress={() => this.onLike(false)}/>: 
        <Icon name = 'hearto' type='ant-design' onPress={() => this.onLike(true)}/>}
        </View>
        <View style={{flex:1}}>
        <Icon name = 'comment' onPress={() => this.viewFullAnnouncement()}/>
        </View>
        </View>
      </View>
      
    )
  }
}

const styles = (color, bg, height) => StyleSheet.create({
  block: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderWidth: 3,
    width: '95%',
    height: 210,
  },
  title: {
    fontSize: 25,
    marginTop: 0,
    fontFamily: 'Red Hat Display',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Red Hat Display',
    position: 'absolute',
    marginTop: 10,
  },
  name:{
    fontSize: 10,
    position: 'absolute',
    
  },
  date:{
    fontSize: 10,
    position: 'absolute',
    marginTop: 10,
  }
})