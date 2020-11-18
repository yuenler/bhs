import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Red Hat Display',
    fontSize: 30,
    marginLeft: 12,
    marginTop: 20
  }
})

export default class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <Text style={styles.title}>Home</Text>
      </SafeAreaView>
    );
  }
}