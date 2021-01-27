import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default class EventBox extends React.Component {
  render() {
    const styled = styles(this.props.color, this.props.background, this.props.height);
    return (
      <View style={styled.block}>
        <Text style={styled.title}>{this.props.title}</Text>
        <Text style={styled.text}>{this.props.text}</Text>
      </View>
    )
  }
}

const styles = (color, bg, height) => StyleSheet.create({
  block: {
    marginLeft: 9,
    marginTop: 4.5,
    marginBottom: 4.5,
    marginRight: 9,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 3,
    backgroundColor: bg,
    width: '100%',

  },
  title: {
    fontSize: 25,
    marginTop: 7.5,
    fontFamily: 'Red Hat Display',
    width: '100%',

    color
  },
  text: {
    fontSize: 14,
    fontFamily: 'Red Hat Display',
    position: 'absolute',
    width: '100%',
    marginLeft: 15,
    textAlign: 'right',
    color
  }
})