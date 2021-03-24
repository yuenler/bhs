import React from 'react';
import { SafeAreaView, StyleSheet, Text, Alert, TouchableOpacity, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Block from '../schedule/Block';
import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect from 'react-native-picker-select';

const schedule = [
	[
		{
			title: 'A',
			starts: '8:20',
			ends: '9:40 am',
			color: 'A',
			numbers: {
				starts: 820,
				ends: 940,
				duration: 80
			}
		},
		{
			title: 'B',
			starts: '9:55',
			ends: '11:15 am',
			color: 'B',
			numbers: {
				starts: 955,
				ends: 1115,
				duration: 80
			}
		},
		{
			title: 'C',
			starts: '11:30',
			ends: '1:25 pm',
			color: 'C',
			numbers: {
				starts: 1130,
				ends: 1325,
				duration: 115
			}
		
		},
		{
			title: 'D',
			starts: '1:40',
			ends: '3:00 pm',
			color: 'D',
			numbers: {
				starts: 1340,
				ends: 1500,
				duration: 80
			}
		}
	],
	[
		{
			title: 'E',
			starts: '8:20',
			ends: '9:40 am',
			color: 'E',
			numbers: {
				starts: 820,
				ends: 940,
				duration: 80
			}
		},
		{
			title: 'Advisory',
			starts: '9:55',
			ends: '10:30 am',
			color: 'T',
			numbers: {
				starts: 955,
				ends: 1030,
				duration: 35
			}
		},
		{
			title: 'X',
			starts: '10:40',
			ends: '11:15 am',
			color: 'X',
			numbers: {
				starts: 1040,
				ends: 1115,
				duration: 35
			}
		},
		{
			title: 'F',
			starts: '11:30',
			ends: '1:25 pm',
			color: 'F',
			numbers: {
				starts: 1130,
				ends: 1325,
				duration: 115
			}
		
			
		},
		{
			title: 'G',
			starts: '1:40',
			ends: '3:00 pm',
			color: 'G',
			numbers: {
				starts: 1340,
				ends: 1500,
				duration: 80
			}
		}
	],
	[
		{
			title: 'A',
			starts: '8:20',
			ends: '8:45 am',
			color: 'A',
			numbers: {
				starts: 820,
				ends: 845,
				duration: 25
			}
		},
		{
			title: 'B',
			starts: '8:55',
			ends: '9:20 am',
			color: 'B',
			numbers: {
				starts: 855,
				ends: 920,
				duration: 25
			}
		},
		{
			title: 'C',
			starts: '9:30',
			ends: '9:55 am',
			color: 'C',
			numbers: {
				starts: 930,
				ends: 955,
				duration: 25
			}
		},
		{
			title: 'D',
			starts: '10:05',
			ends: '10:30 am',
			color: 'D',
			numbers: {
				starts: 1005,
				ends: 1030,
				duration: 25
			}
		},
		{
			title: 'E',
			starts: '10:40',
			ends: '11:05 am',
			color: 'E',
			numbers: {
				starts: 1040,
				ends: 1105,
				duration: 25
			}
		},
		{
			title: 'F',
			starts: '11:15',
			ends: '11:40 am',
			color: 'F',
			numbers: {
				starts: 1115,
				ends: 1140,
				duration: 25
			}
		},
		{
			title: 'G',
			starts: '11:50',
			ends: '12:15 pm',
			color: 'G',
			numbers: {
				starts: 1150,
				ends: 1215,
				duration: 25
			}
		},
	]
]


export default class ScheduleScreen extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			ready: false,
			endOfSchool: "",
			day: "",
			timer: "",
			block: {
			'A' : '' , 

			'B' : '' , 

			'C' : '' , 

			'D' : '' , 

			'E' : '' , 

			'F' : '' , 

			'G' : '',
			'T' : '',
			'X' : ''
		  }}
	}

	options = {
		days:['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'],
	}

	  retrieveData = async()  => {
        try{
			this.state.block['A'] = await AsyncStorage.getItem('Aclass');
			this.state.block['B'] = await AsyncStorage.getItem('Bclass');
			this.state.block['C'] = await AsyncStorage.getItem('Cclass');
			this.state.block['D'] = await AsyncStorage.getItem('Dclass');
			this.state.block['E'] = await AsyncStorage.getItem('Eclass');
			this.state.block['F'] = await AsyncStorage.getItem('Fclass');
			this.state.block['G'] = await AsyncStorage.getItem('Gclass');
			this.state.block['T'] = await AsyncStorage.getItem('Tclass');
			this.state.block['X'] = await AsyncStorage.getItem('Xclass');
			
        }
        catch(error){
            console.info(error);
		}
		let today = new Date();
		this.state.day = today.getDay().toString();
		this.setState({ready: true})

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

		let letters = ['A','B','C','D','E','F','G','T',"X"]
		for (let i=0; i<letters.length; i++){
			if (this.state.block[letters[i]] == null){
				this.state.block[letters[i]] = "";
				
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
		else
		{
			scheduleForToday = []
		}

		//traversing each block that has passed to calculate scroll amount
		this.block = 0
		this.state.endOfSchool = "";
		var currentBlock = "";
		for (let i = 0, len = scheduleForToday.length; i < len; ++i) {
			const block = scheduleForToday[i];
			if (time > block.numbers.ends) {
				this.block += scheduleForToday[i].numbers.duration * 3 + 9;
				if (i == len-1){
					this.state.endOfSchool = "School is Over!";
					currentBlock = ""
				}
				else{
					currentBlock = scheduleForToday[i+1].title
				}
			}
			
			
		}

		if (day == 6 || day == 0){
			this.state.endOfSchool = "No school on weekends!"
		}
		
		let days = [];
		for (let i = 0; i < 7; i++) {
			let day = this.options.days[i]
			days.push({label: day, value: i.toString() })
		}


		if (this.state.ready){
			
			if (!this.state.ready){
				return(null)
			}
		return (
			
			<SafeAreaView style={{backgroundColor: '#ededed'}}>
				<View style={{  backgroundColor: '#FFFFFF', borderRadius: 10, marginHorizontal: 30, marginVertical: 10}}>
				<RNPickerSelect
				placeholder={{}}
				style={ {inputAndroid: {color: 'black'}, inputIOSContainer: {margin: 10} }}
				onValueChange={(day) => this.dayChange({ day })}
				value  = {this.state.day}
				items={days}		
        		/>
				</View>

				<ScrollView
				ref={ref => {
					this.scrollRef = ref;
				  }}>
					{
						scheduleForToday.map((block, i) => {
							return <Block background={colors[block.color]} title={block.title + "  " + this.state.block[block.title]} color="#454545" starts={block.starts} ends={block.ends} startNum={block.numbers.start} endNum={block.numbers.end}  timer = {currentBlock == block.title} key={i} height={(block.numbers.duration) * 3} navigation={this.props.navigation} />;
						})
					}
					<View style={{height: 900}}>
						<Text style={{fontFamily: 'Red Hat Display', margin: 20, textAlign: 'center', fontSize: 30, color: '#454545'}}>{this.state.endOfSchool}</Text>
					</View>
					
					
				</ScrollView>
				
			</SafeAreaView>
		);
		}
		return null;
	}

	componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
			this.retrieveData();
			setTimeout(() => {
				if (this.scrollRef !== null) {
					this.scrollRef.scrollTo({
						y: this.block,
						animated: true
					});
				}
			}, 100);  

		  });
		  
		  this.retrieveData();	

		  setTimeout(() => {
			if (this.scrollRef !== null && this.state.ready) {
				this.scrollRef.scrollTo({
					y: this.block,
					animated: true
				});
			}
		}, 500);  
	}
	
	componentWillUnmount() {
		  this._unsubscribe();
		}
}

const styles = StyleSheet.create({
	view: {
		paddingTop: 4.5,
	}
})

const colors = {
	// A: '#7ea8be',
	// B: '#3f6c51',
	// C: '#b38cb4',
	// D: '#6d4c3d',
	// E: '#6610f2',
	// F: '#a30000',
	// G: '#ff7700',
	// T: '#1a8fe3',
	// L: '#272727',
	// X: '#0d1317'

	A: '#c2b8ff',
	B: '#c2b8ff',
	C: '#c2b8ff',
	D: '#c2b8ff',
	E: '#c2b8ff',
	F: '#c2b8ff',
	G: '#c2b8ff',
	T: '#c2b8ff',
	L: '#c2b8ff',
	X: '#c2b8ff'
}

