import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default class EventBox extends React.Component {
  
  
  viewProfile(uid){
    this.props.navigation.navigate('View Profile', {uid: uid })
  }

  render() {
    const styled = styles(this.props.color, this.props.background, this.props.height);
    return (
      <LinearGradient
        // Button Linear Gradient
        colors={['#871609', '#871609', '#871609']}
        style={styled.block}>
        <Text style={styled.title}>{this.props.title}</Text>
        <Text style={styled.text}>{this.props.text}</Text>
        <Text style={styled.date}>{this.props.date}</Text>
        <Text style={styled.name} onPress={() => this.viewProfile(this.props.uid)}>{this.props.userName}</Text>
      </LinearGradient>
      
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
    width: '95%',
    height: 210,
  },
  title: {
    fontSize: 25,
    marginTop: 0,
    fontFamily: 'Red Hat Display',
    color
  },
  text: {
    fontSize: 14,
    fontFamily: 'Red Hat Display',
    position: 'absolute',
    marginLeft: 20,
    marginTop: 50,
    color
  },
  name:{
    fontSize: 10,
    position: 'absolute',
    marginTop: 180,
    marginLeft: 10,
    color
  },
  date:{
    fontSize: 10,
    position: 'absolute',
    marginTop: 190,
    marginLeft: 10,
    color
  }
})