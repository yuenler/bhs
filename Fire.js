import firebase from 'firebase';
import uuid from 'uuid';
import user from './components/User';



class Fire {

  get uid() {
    return (user.uid);
  }

  get ref() {
    return firebase.database().ref('Messages');
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
}


const fire = new Fire();
export default fire;
