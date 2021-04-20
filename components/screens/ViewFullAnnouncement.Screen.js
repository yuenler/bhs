import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import {Input, Icon, ListItem, Avatar} from 'react-native-elements';

export default class ViewFullAnnouncement extends React.Component {
  
  state = {
    comment: '',
    comments: [],
  }

  componentDidMount(){
    //get all previous comments
    // const comments = []
    // this.setState({ comments: comments})
  }


  onComment(){
    var comments = this.state.comments.concat({comment: this.state.comment})
    this.setState({ comment: '', comments: comments})
  }

  render() {
   
    return (
      <View style={styles.container}>
                <View>
          {
            this.state.comments.map((l, i) => (
              <ListItem key={i} bottomDivider>
                {/* <Avatar source={{uri: l.avatar_url}} /> */}
                <ListItem.Content>
                  <ListItem.Title>{l.comment}</ListItem.Title>
                  {/* <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle> */}
                </ListItem.Content>
              </ListItem>
            ))
          }
        </View>


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
    width: '100%',
		position: 'absolute',
    bottom: 0, 
	}

});