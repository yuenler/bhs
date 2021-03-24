import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import { Text, View, StyleSheet } from 'react-native';
import user from '../User'
import firebase from 'firebase';



class Chat extends React.Component {

  state = {
    messages: [],
    block: "",
    teacher: "",
  };
  

  get user() {
    return {
      _id: this.uid,
      name: user.displayName,
      avatar: user.photoURL
    
    };
  }

  

  
  componentDidMount() {
    this.state.block = this.props.route.params.block;
    console.log('messages' + this.props.route.params.block)
    this.state.teacher = this.props.route.params.teacher;
    this.refOn(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  
  componentWillUnmount() {
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

      <GiftedChat
        
        renderUsernameOnMessage={true}
        messages={this.state.messages}
        onSend={this.send}
        user={this.user}
        timeTextStyle={{ left: { color: 'red' }, right: { color: 'yellow' } }}
      />
      
      </View>
    );
}


}

export default Chat;
