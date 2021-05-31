import { StyleSheet} from 'react-native';

const globalStyles = StyleSheet.create({
    container: {
		backgroundColor: 'white',
		flexDirection: 'column', 
		flex: 1,
	},
	container2: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#ededed',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	container3: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#ededed',
	},
	centeredContainer: {
		backgroundColor: 'white',
		flexDirection: 'column', 
		flex: 1,
		alignItems: 'center',
	},
	button: {
		backgroundColor: '#871609',
		padding: 10,
		borderRadius: 10,
	},
	buttonText: {
		fontSize: 15,
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'Red Hat Display'
	},
	buttonText2: {
		fontSize: 20,
		color: '#fff',
		fontFamily: 'Red Hat Display'
	},
	editContainer:{
		marginLeft: 100,
		marginTop: -35,	
	},
	edit:{
		paddingRight: 0,
	},
	textLabel:{
		color: 'white',
		marginLeft: 20
	},
	pfp:{
		width: 150,
    		height: 150,
		borderRadius: 100
	},
	scheduleSection:{
		margin: 100,
		backgroundColor: 'white',
	},

});

export { globalStyles };
