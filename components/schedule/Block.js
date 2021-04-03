import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {Ionicons} from '@expo/vector-icons';
import {colorCode} from '../GlobalColors';


export default class Block extends React.Component {

  state={
    timer: '',
  };

  componentDidMount() {
    if (this.props.currentBlock){
      setInterval(() => this.setState({ timer: this.determineTimer()}), 100);
    }
  }

  determineTimer(){
    var currentDate = new Date();
    //code to determine ....not done yet so it's just returning current date for now
    return currentDate.getSeconds();
  }

  render() {
    const styled = styles(this.props.color, this.props.background, this.props.height, this.props.currentBlock);
    return (
      <View style={styled.block}>
        <View style={{flexDirection: 'row', flex: 2}}>
        <View style={{flex: 1}}>
        <Text style={styled.title}>{this.props.title + " " + this.props.name}</Text>
        </View>
        <View style={styled.timeContainer}>
            <Text style={styled.time}>{this.state.timer}</Text>
        </View>
        <View style={styled.buttonContainer}>
          
        <View style={{marginRight: 10}}>
             <Ionicons.Button
              name = "ios-chatbubbles"
              style={styled.button}
              onPress={() => this.props.navigation.navigate('Messages',{block:this.props.title, teacher:null})}
            />  
            </View>
          <View>
        <Ionicons.Button
              name = "ios-eye"
              style={styled.button}
              onPress={() => this.props.navigation.navigate('View Classmates',{block:this.props.title, teacher:null})}
            />
            </View>
            
          </View>
        </View>
        <View style={{flex:1}}>
        
        {this.props.starts != ''? 
                <Text style={styled.times}>{this.props.starts} - {this.props.ends}</Text>
              : null }
        </View>
      </View>
    )
  }
}

const styles = (color, bg, height, currentBlock) => StyleSheet.create({
  block: {
    flex:1,
    marginLeft: 9,
    marginTop: 4.5,
    marginBottom: 4.5,
    marginRight: 9,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: '#27187E',
    borderWidth: currentBlock*3,
    borderRadius: 10,
    backgroundColor: colorCode.scheduleBlockLavender,
    flexDirection: 'column',
  },
  title: {
    fontSize: 25,
    fontFamily: 'Red Hat Display',
    color: '#454545'
  },
  times: {
    fontSize: 14,
    fontFamily: 'Red Hat Display',
    position: 'absolute',
    width: '100%',
    textAlign: 'right',
    color: "#454545"
  },
  button: {
    paddingVertical: 2,
    paddingLeft: 7,
    paddingRight: 0,
  },
  buttonContainer:{
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  time:{
    fontFamily: 'Red Hat Display',
    color: "#000000"
  
  },
  timeContainer:{
    flex: 1,

  }

})