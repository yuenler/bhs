import React from 'react';
import { SafeAreaView, StyleSheet, Text, Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Block from '../schedule/Block';

export default class ScheduleScreen extends React.Component {

	state = {isCustomized: false}

	scrollRef = null;
	block = 0;

	render() {

		let scheduleForToday;
		let today = new Date();
		let day = today.getDay();
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

		for (let i = 0, len = scheduleForToday.length; i < len; ++i) {
			const block = scheduleForToday[i];
			if (time > block.numbers.starts) {
				if (i - 1 in scheduleForToday) {
					this.block += scheduleForToday[i - 1].numbers.duration * 3 + 9;
				}
			}
		}

		return (
			<SafeAreaView>
				<ScrollView style={styles.view} ref={ref => this.scrollRef = ref}>
					{
						scheduleForToday.map((block, i) => {
							return <Block background={colors[block.color]} title={block.title} color="white" starts={block.starts} ends={block.ends} key={i} height={(block.numbers.duration) * 3} />;
						})
					}
				</ScrollView>
			</SafeAreaView>
		);
	}

	componentDidMount() {
		if (! this.state.isCustomized){
			Alert.alert(
				"You have not customized your classes yet!",
				"",
				[
				  {
					text: "Cancel",
					style: "cancel"
				  },
				  { text: "Customize", onPress: () => this.props.navigation.navigate('Customize') }
				],
				{ cancelable: false }
			  );
		}

		setTimeout(() => {
			this.scrollRef.scrollTo({ y: this.block, animate: true });
		}, 0);
	}
}

const styles = StyleSheet.create({
	view: {
		paddingTop: 4.5
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
			title: 'C - 1/2',
			starts: '11:30',
			ends: '12:05 pm',
			color: 'C',
			numbers: {
				starts: 1130,
				ends: 1205,
				duration: 35
			}
		},
		{
			title: 'Lunch',
			starts: '12:10',
			ends: '12:40 pm',
			color: 'L',
			numbers: {
				starts: 1210,
				ends: 1240,
				duration: 30
			}
		},
		{
			title: 'C - 2/2',
			starts: '12:45',
			ends: '1:25 pm',
			color: 'C',
			numbers: {
				starts: 1245,
				ends: 1325,
				duration: 40
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
			title: 'F - 1/2',
			starts: '11:30',
			ends: '12:05 pm',
			color: 'F',
			numbers: {
				starts: 1130,
				ends: 1205,
				duration: 35
			}
		},
		{
			title: 'Lunch',
			starts: '12:10',
			ends: '12:40 pm',
			color: 'L',
			numbers: {
				starts: 1210,
				ends: 1240,
				duration: 30
			}
		},
		{
			title: 'F - 2/2',
			starts: '12:45',
			ends: '1:25 pm',
			color: 'F',
			numbers: {
				starts: 1245,
				ends: 1325,
				duration: 40
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