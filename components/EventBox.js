import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class EventBox extends React.Component {
  render() {
    const styled = styles(this.props.color, this.props.background, this.props.height);
    return (
      <View style={styled.block}>
        <Text style={styled.title}>{this.props.title}</Text>
        <Text style={styled.text}>{this.props.text}</Text>
        <Text style={styled.name}>{this.props.date}</Text>
        <Text style={styled.date}>{this.props.userName}</Text>
      </View>
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
    backgroundColor: '#871609',
    width: '100%',
    height: 200,
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
    marginTop: 170,
    marginLeft: 10,
    color
  },
  name:{
    fontSize: 10,
    position: 'absolute',
    marginTop: 180,
    marginLeft: 10,
    color
  }
})