import React from 'react';
import { SafeAreaView, StyleSheet, Text, Alert, TouchableOpacity, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Block from '../schedule/Block';
import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect from 'react-native-picker-select';


export default class ScheduleScreen extends React.Component {


	constructor(props){
		super(props);
		this.state = {
			ready: false,
			endOfSchool: "",
			day: "",
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
		days:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
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
		let today = new Date();
		if (this.scrollRef !== null && this.state.ready && this.state.day != today.getDay().toString()) {
			this.scrollRef.scrollTo({
				y: 0,
				animated: true
			});
		}
	  }

	scrollRef = null;
	block = 0;

	render() {

		let letters = ['A','B','C','D','E','F','G']
		for (let i=0; i<letters.length; i++){
			if (this.state.block[letters[i]] == null){
				this.state.block[letters[i]] = "";
				
			}
		}

		const schedule = [
			[
				{
					title: 'A  ' + this.state.block['A'],
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
					title: 'B  ' + this.state.block['B'],
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
					title: 'C  ' + this.state.block['C'],
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
					title: 'D  ' + this.state.block['D'],
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
					title: 'E  ' + this.state.block['E'],
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
					title: 'F ' + this.state.block['F'],
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
					title: 'G  ' + this.state.block['G'],
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
					title: 'A  ' + this.state.block['A'],
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
					title: 'B  ' + this.state.block['B'],
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
					title: 'C  ' + this.state.block['C'],
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
					title: 'D  ' + this.state.block['D'],
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
					title: 'E  ' + this.state.block['E'],
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
					title: 'F  ' + this.state.block['F'],
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
					title: 'G  ' + this.state.block['G'],
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
		for (let i = 0, len = scheduleForToday.length; i < len; ++i) {
			const block = scheduleForToday[i];
			if (time > block.numbers.ends) {
				this.block += scheduleForToday[i].numbers.duration * 3 + 8;
				if (i == len-1){
					this.state.endOfSchool = "School is Over!";
				}
			}
		}
		
		let days = [];
		for (let i = 1; i <= 5; i++) {
			let day = this.options.days[i-1]
			days.push({label: day, value: i.toString() })
		}


		if (this.state.ready){
			
			if (!this.state.ready){
				return(null)
			}
		return (
			
			<SafeAreaView style={{backgroundColor: '#0F182D'}}>
				<View style={{  backgroundColor: 'white', borderRadius: 20, marginHorizontal: 20}}>
				<RNPickerSelect
				placeholder={{}}
				style={ {inputAndroid: {color: 'black'} }}
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
							return <Block background={colors[block.color]} title={block.title} color="white" starts={block.starts} ends={block.ends} key={i} height={(block.numbers.duration) * 3} />;
						})
					}
					<View style={{height: 900}}>
						<Text style={{fontFamily: 'Red Hat Display', margin: 20, textAlign: 'center', fontSize: 30, color: 'white'}}>{this.state.endOfSchool}</Text>
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
			}, 500);  
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
	A: '#7ea8be',
	B: '#3f6c51',
	C: '#b38cb4',
	D: '#6d4c3d',
	E: '#6610f2',
	F: '#a30000',
	G: '#ff7700',
	T: '#1a8fe3',
	L: '#272727',
	X: '#0d1317'
}

