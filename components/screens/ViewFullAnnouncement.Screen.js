import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import {Input, Icon, ListItem, Avatar} from 'react-native-elements';
import firebase from "firebase";
import user from "../User";
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
        firebase.database().ref('Users/' + uid).on('value', (snapshot) =>{
            let name = snapshot.val().name
            let pfp = snapshot.val().pfp
            let comments = this.state.comments.concat({
              uid: uid,
              comment: comment,
              name: name,
              pfp: pfp
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

  saveComment(){
    this.ref.push({
      comment: this.state.comment,
      uid: user.uid
    })
  }

  render() {
    return (
      <View style={styles.container}>
          <ScrollView>
          {
            this.state.comments.map((l, i) => (
              <ListItem key={i} bottomDivider>
                <Avatar source={{uri: l.pfp}} />
                <ListItem.Content>
                <ListItem.Subtitle>{l.name}</ListItem.Subtitle>
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
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#ededed',
	},
	inputContainer: {
    backgroundColor: 'white',
    width: '100%',
		position: 'absolute',
    bottom: 0, 
	}

});