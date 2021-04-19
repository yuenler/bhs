import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import { Text, View, StyleSheet } from 'react-native';
import user from '../User'
import firebase from 'firebase';
import {Header} from 'react-native-elements'
import {Ionicons} from '@expo/vector-icons';



class Chat extends React.Component {

  state = {
    messages: [],
    block: "",
    teacher: "",
    name: "",
  };
  

  get user() {
    return {
      _id: this.uid,
      name: this.state.name,
      avatar: user.photoURL
    };
  }

  

  
  componentDidMount() {
    this.state.block = this.props.route.params.block;
    this.state.teacher = this.props.route.params.teacher;
    this.refOn(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
    firebase.database().ref('Users/' + this.uid).on('value', (snapshot) => {
      this.setState({name: snapshot.val().name})
    });
  }
  
  componentWillUnmount() {
    firebase.database().ref('Users/' + this.uid).update({["last_read" + this.state.block]: Date()})
    this.refOff();
  }

  get uid() {
    return (user.uid);
  }

  get ref() {
    return firebase.database().ref('Messages/' + this.state.block + '/' + this.state.teacher);
  }

  parse = snapshot => {
    const { createdAt, text, user } = snapshot.val();
    const { key: _id } = snapshot; //needed for giftedchat
    // const timestamp = new Date(numberStamp);
    const message = {
      _id,
      createdAt,
      text,
      user,
    };
    return message;
  };

  refOn = callback => {
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  }

  get timestamp() {
    return Date(firebase.database.ServerValue.TIMESTAMP);
  }
  
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        createdAt: this.timestamp,
      };
      this.ref.push(message);
    }
  };

  refOff() {
    this.ref.off();
  }
 
  

  render() {
    return (
      <View style={{backgroundColor: '#ededed', flex: 1}}>
      
      <Header
      centerComponent={{text: this.state.block + ' Block - ' + this.state.teacher}}
      rightComponent={<Ionicons.Button
        name = "ios-eye"
        onPress={() => this.props.navigation.navigate('View Classmates',{block:this.state.block, teacher:this.state.teacher})}
      />
    }
      
      />

      <GiftedChat
        
        renderUsernameOnMessage={true}
        messages={this.state.messages}
        onSend={this.send}
        user={this.user}
        timeTextStyle={{ left: { color: 'red' }, right: { color: 'yellow' } }}
        scrollToBottom
        // onLongPressAvatar={user => alert(JSON.stringify(user))}
        onPressAvatar={() => this.props.navigation.navigate('View Profile', {uid: user.uid})}
        keyboardShouldPersistTaps='never'
        infiniteScroll
      />
      
      </View>
    );
}


}

export default Chat;
