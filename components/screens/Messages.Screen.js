import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import fire from '../../Fire';
import user from '../User'

class Chat extends React.Component {


  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
  };

  

  get user() {
    return {
      name: user.displayName,
      email: user.email,
      id: fire.uid,
      _id: fire.uid, // need for gifted-chat
    };
  }

  render() {
    const block = this.props.route.params.block;
    return (
      <GiftedChat
        renderUsernameOnMessage={true}
        alwaysShowSend={true}
        messages={this.state.messages}
        onSend={fire.send}
        user={this.user}
      />
    );
  }

  componentDidMount() {
    fire.refOn(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  
  componentWillUnmount() {
    fire.refOff();
  }
}

export default Chat;
