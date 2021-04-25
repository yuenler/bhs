import React from 'react';
import { SafeAreaView, StyleSheet, Text, Alert, TouchableOpacity, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Block from '../schedule/Block';
import RNPickerSelect from 'react-native-picker-select';
import firebase from 'firebase';
import user from '../User'
import {globalStyles} from '../GlobalStyles';
import {schedule} from '../schedule/Schedule';




export default class ScheduleScreen extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			ready: false,
			endOfSchool: "",
			day: "",
			timer: "",
			className: {
			'A' : '' , 
			'B' : '' , 
			'C' : '' , 
			'D' : '' , 
			'E' : '' , 
			'F' : '' , 
			'G' : '',
			'Z' : '',
			'T' : '',
			'X' : ''
		  },
		  teacher: {
			'A' : '' , 
			'B' : '' , 
			'C' : '' , 
			'D' : '' , 
			'E' : '' , 
			'F' : '' , 
			'G' : '',
			'Z' : '',
			'T' : '',
			'X' : ''
		  },
	}
}

	options = {
		days:['View all classes','Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'],
	}


	  retrieveData(){
        firebase.database().ref('Users/' + user.uid).on('value', (snapshot) => {
			if (snapshot.hasChild('teacher')){
				firebase.database().ref('Users/' + user.uid + '/teacher').on('value', (snapshot) => {
					this.setState(
					  {
						  teacher:{
							'A' : snapshot.val().A , 
							'B' : snapshot.val().B , 
							'C' : snapshot.val().C , 
							'D' : snapshot.val().D , 
							'E' : snapshot.val().E ,
							'F' : snapshot.val().F , 
							'G' : snapshot.val().G,
							'Z' : snapshot.val().Z,
							'T' : snapshot.val().T,
							'X' : snapshot.val().X
						  }
					}
					);
					
				})
			}
			if (snapshot.hasChild('className')){
				firebase.database().ref('Users/' + user.uid + '/className').on('value', (snapshot) => {
					this.setState(
					  {
						  className:{
							'A' : snapshot.val().A , 
							'B' : snapshot.val().B , 
							'C' : snapshot.val().C , 
							'D' : snapshot.val().D , 
							'E' : snapshot.val().E ,
							'F' : snapshot.val().F , 
							'G' : snapshot.val().G,
							'Z' : snapshot.val().Z,
							'T' : snapshot.val().T,
							'X' : snapshot.val().X
						  }
					}
					);
					
				})
			}
			
		})

		let today = new Date();
		this.setState({ day: today.getDay().toString()});
	  }

	  dayChange(day){
		this.setState(day)
		if (this.scrollRef !== null && this.state.ready) {
			this.scrollRef.scrollTo({
				y: 0,
				animated: true
			});
		}
	  }



	scrollRef = null;
	block = 0;

	render() {


		let letters = ['A','B','C','D','E','F','G','Z','T',"X"]
		for (let i=0; i<letters.length; i++){
			if (this.state.className[letters[i]] == null){
				this.state.className[letters[i]] = "";
				
			}
		}


		let scheduleForToday;
		let today = new Date();
		let day = parseInt(this.state.day);
		let minutes = today.getMinutes();
		let time = parseInt(`${today.getHours()}${minutes < 10 ? '0' + minutes : minutes}`);
		
		if (day === 1 || day === 4) {
			scheduleForToday = schedule[0];
		}
		else if (day === 2 || day === 5) {
			scheduleForToday = schedule[1];
		}
		else if (day === 3) {
			scheduleForToday = schedule[2];
		}
		else if (day === -1){
			scheduleForToday = schedule[3]
		}
		else
		{
			scheduleForToday = []
		}

		//traversing each block that has passed to calculate scroll amount
		// this.block = 0
		this.state.endOfSchool = "";
		var currentBlock = "";
		for (let i = 0, len = scheduleForToday.length; i < len; ++i) {
			const block = scheduleForToday[i];
			if (time > block.numbers.ends) {
				// this.block += scheduleForToday[i].numbers.duration * 3 + 9;
				if (i == len-1){
					this.state.endOfSchool = "School is Over!";
					currentBlock = ""
				}
				else{
					currentBlock = scheduleForToday[i+1].title
				}
			}
			
			
		}

		if (day === 6 || day === 0){
			this.state.endOfSchool = "No school on weekends!"
		}

		if (day === -1){
			this.state.endOfSchool = ""
		}
		
		let days = [];
		for (let i = -1; i < 7; i++) {
			let day = this.options.days[i+1]
			days.push({label: day, value: i.toString() })
		}


			
			
		return (
			
			<View style={globalStyles.container}>
				<View style={{ alignSelf: 'center', width: '50%', flex: 1, backgroundColor: '#FFFFFF', borderRadius: 10, marginHorizontal: 30, marginVertical: 10}}>
				<RNPickerSelect
				placeholder={{}}
				style={ {inputAndroid: {color: 'black'}, inputIOSContainer: {margin: 10} }}
				onValueChange={(day) => this.dayChange({ day })}
				value  = {this.state.day}
				items={days}		
        		/>
				</View>

				<View
				  style={{
					  flex: 10,
					flexDirection: 'column',
					}}
				  >
				
					{
						scheduleForToday.map((block, i) => {
							return (
							<View style={{flex:1}} key={i}>
								<Block title={block.title} name={this.state.className[block.title]}  starts={block.starts} ends={block.ends} startNum={block.numbers.start} endNum={block.numbers.end}  isCurrentBlock = {currentBlock == block.title} teacher={this.state.teacher[block.title]} navigation={this.props.navigation} />
							</View>
							);
						})
					}

					{this.state.endOfSchool != ""? 
							<Text style={{fontFamily: 'Red Hat Display', margin: 20, textAlign: 'center', fontSize: 30, }}>{this.state.endOfSchool}</Text>
						: null }
					
					
					
					
				</View>			
				
			</View>
			
		);
		
	}

	componentDidMount() {	
		  this.retrieveData();
	}
	
	
}


