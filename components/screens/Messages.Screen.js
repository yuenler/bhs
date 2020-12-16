import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import fire from '../../Fire';

// type Props = {
//   name?: string,
//   email?: string,
//   avatar?: string,
// };

class Chat extends React.Component {

//   constructor(props) {
//     super(props);
//   }
  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
  };

  get user() {
    return {
    //   name: user.name,
    //   email: user.email,
      id: fire.uid,
      _id: fire.uid, // need for gifted-chat
    };
  }

  render() {
    return (
      <GiftedChat
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
