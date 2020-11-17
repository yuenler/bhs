import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import ScheduleReader from '../ScheduleReader';

export default class ScheduleScreen extends React.Component {
	render() {
		return (
			<SafeAreaView>
				<Text>Schedule</Text>
				{/* <ScheduleReader /> */}
			</SafeAreaView>
		);
	}
}