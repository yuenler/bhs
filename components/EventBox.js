import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default class EventBox extends React.Component {
  render() {
    const styled = styles(this.props.color, this.props.background, this.props.height);
    return (
      <LinearGradient
        // Button Linear Gradient
        colors={['#5a5e82', '#4a5087', '#1d2a99']}
        style={styled.block}>
        <Text style={styled.title}>{this.props.title}</Text>
        <Text style={styled.text}>{this.props.text}</Text>
        <Text style={styled.name}>{this.props.date}</Text>
        <Text style={styled.date}>{this.props.userName}</Text>
      </LinearGradient>
      
    )
  }
}

const styles = (color, bg, height) => StyleSheet.create({
  block: {
    marginLeft: 9,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 9,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
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
  date:{
    fontSize: 10,
    position: 'absolute',
    marginTop: 180,
    marginLeft: 10,
    color
  },
  name:{
    fontSize: 10,
    position: 'absolute',
    marginTop: 190,
    marginLeft: 10,
    color
  }
})