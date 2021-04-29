import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import {Input, Icon, ListItem, Avatar} from 'react-native-elements';
import firebase from "firebase";
import user from "../User";
import formatTime from "../../FormatTime";
import {globalStyles} from '../GlobalStyles';

export default class ViewFullAnnouncement extends React.Component {
  
  state = {
    comment: '',
    comments: [],
  }

  get ref(){
    return firebase.database().ref('Announcements/' + this.props.route.params.id  + '/comments');
  }

  componentDidMount(){
    //get all previous comments
    this.ref.on('child_added', (snapshot) =>{
      if (snapshot.exists()){
        let comment = snapshot.val().comment
        let uid = snapshot.val().uid
        let date = snapshot.val().date
        firebase.database().ref('Users/' + uid).on('value', (snapshot) =>{
            let name = snapshot.val().name
            let pfp = snapshot.val().pfp
            let comments = this.state.comments.concat({
              uid: uid,
              comment: comment,
              name: name,
              pfp: pfp,
              date: date
            })
            this.state.comments = comments
            this.forceUpdate()
        })
        
      }
    })

  }


  onComment(){
    this.setState({ comment: ''})
    this.saveComment(this.state.comment)
  }

  saveComment(comment){
    let today = formatTime()
    this.ref.push({
      comment: comment,
      date: today,
      uid: user.uid
    })
  }

  render() {
    // We reverse the list so that recent comments are at the top instead of the bottom
    let commentsReversed = this.state.comments.map((x) => x).reverse()

    return (
      <View style={globalStyles.container2}>
          <ScrollView>
          <Text>{this.props.route.params.text}</Text>
          {
            commentsReversed.map((l, i) => (
              <ListItem key={i} bottomDivider>
                <Avatar source={{uri: l.pfp}} />
                <ListItem.Content>
                <ListItem.Subtitle>{l.name + " " + l.date}</ListItem.Subtitle>
                  <ListItem.Title>{l.comment}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))
          }
        </ScrollView>


      <View style={styles.inputContainer}>
      <Input placeholder="Type a comment..."
						onChangeText={comment => this.setState({ comment })}
						value={this.state.comment}
            rightIcon={
              <Icon
                name='send'
                size={24}
                color='#278adb'
                onPress={() => this.onComment()}
              />
            }
					/> 
          </View>
        </View>
      
    )
  }
}

const styles = StyleSheet.create({
	/*container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#ededed',
	},*/
	inputContainer: {
    backgroundColor: 'white',
    width: '100%',
		position: 'absolute',
    bottom: 0, 
	}

});
