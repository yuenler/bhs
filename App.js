import React from 'react';
import { StyleSheet, View, Platform, StatusBar, Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import ApiKeys from './ApiKeys';
import * as firebase from 'firebase';
import NotLoggedInScreen from './components/screens/NotLoggedIn.Screen';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './components/navigators/App.Navigator';
import * as Font from 'expo-font';
import { set } from './components/User';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
      user: null
    };

    if (!firebase.apps.length) { firebase.initializeApp(ApiKeys.FirebaseConfig); }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  _loadFonts() {
    return Font.loadAsync({
      'Red Hat Display': require('./assets/fonts/RedHatDisplay-Medium.ttf')
    })
  }

  onAuthStateChanged = (user) => {
    this.setState({ isAuthenticationReady: true });
    this.setState({ isAuthenticated: !!user });
    this.setState({ user });

    if (user) {
      var idxBrooklinek12 = user.email.indexOf('@brooklinek12.org');
        var idxPSBMA = user.email.indexOf('@psbma.org');
        if (idxBrooklinek12 == -1 && idxPSBMA == -1 && user.email != "theofficialbhsapptesting@gmail.com") {
          Alert.alert(
            "Please sign in using your school email address!",
            "",
            [
              { text: "Ok", onPress: () => firebase.auth().signOut()}
            ],
            { cancelable: false }
            );
        }
    }
  }

  

  _loadResourcesAsync = async () => {
    return Promise.all([
      this._loadFonts()
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };



  render() {
    if ((!this.state.isLoadingComplete || !this.state.isAuthenticationReady) && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      set(this.state.user);
      return (
        <NavigationContainer>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
            {(this.state.isAuthenticated) ? <AppNavigator /> : <NotLoggedInScreen />}
          </View>
        </NavigationContainer>
      );
    }
  }
}