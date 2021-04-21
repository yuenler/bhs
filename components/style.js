import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    button: {
		backgroundColor: '#871609',
		padding: 10,
		paddingHorizontal: 30,
		alignItems: "center", 
		borderRadius: 10,
	},

    button_pf: { /* Create Club Profile + Customization */
		backgroundColor: '#871609',
		padding: 10,
		borderRadius: 10,
	},

    button2: { /* Friends */
		backgroundColor: '#0e4bb0',
		padding: 20,
		borderRadius: 10,
		
	},

    button3: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4285F4',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 60,
        borderRadius: 10,
        margin: 5,
        padding: 5
      },

    buttonText: {
		fontSize: 20,
		color: '#fff',
		fontFamily: 'Red Hat Display'
	},

    buttonText_pf: {
		fontSize: 15,
		color: '#fff',
		textAlign: 'center',
		fontFamily: 'Red Hat Display'
	},

    buttonText3: {
        fontSize: 20,
        fontWeight: 'bold',
          color: '#fff',
          padding: 20
    },

    container: { /* Announcement */
		flex: 1,
		backgroundColor: colorCode.backgroundWhite,
		justifyContent: 'center',
	},

    container_col: { /* Club Profile */
        flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#ededed',
	},

    container_create: { /* Create Announcement + Club Profile*/
		flex: 1, 
		alignItems: "center", 
		justifyContent: "center", 
		backgroundColor: "#ededed", 
	}, 

    container_custom: { /* Customization only */
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#ededed',
	},

    container_friends: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#ededed',
		// alignItems: 'center',
		// justifyContent: 'center',
	},

    container_profile: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: colorCode.backgroundWhite,
	},

    contactButton: {
		padding: 20,
		borderRadius: 10,
	},

	contactContainer: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		 justifyContent: 'center'
		
	},

	displayName: {
		color: 'white'
	},

    displayName2: {
		color: 'black'
	},

    deleteFriendButton: {
		backgroundColor: '#871609',
		padding: 20,
		borderRadius: 10,
	},

    editContainer:{
		marginLeft: 100,
		marginTop: -35,	
	},

    edit:{
		paddingRight: 0,
	},

    editProfileButton: {
		backgroundColor: colorCode.buttonPurple,
		padding: 10,
		borderRadius: 10,
	},

    editProfileButton2: {
		backgroundColor: '#871609',
		padding: 10,
		borderRadius: 10,
	},

    headerText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 20
	},

    imageContainer: {
        margin: 0,
    },

    inputContainer: {
        width: '100%',
		position: 'absolute',
        bottom: 0, 
	},

    matchAnnouncementContainer:{
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},

    pfp:{
		width: 150,
    	height: 150,
		borderRadius: 100
	},

	printedNames: {
		color: '#000000'
	},
    
	result: {
	    color:'black', 
	    fontSize: 30, 
	    fontFamily: 'Red Hat Display',
	    textAlign: 'center'
	},

	scheduleText: {
		color: 'white'
	},

    scheduleText2: {
		color: 'black'
	},

    scheduleSection:{
		margin: 100,
		backgroundColor: 'white',
	},

    textLabel:{
		color: 'white',
		marginLeft: 20
	},

    title: {
        fontSize: 30,
        fontFamily: 'Red Hat Display',
        textAlign: 'center',
        color: '#fff',
    },

    titleContainer: {
        marginHorizontal: 10,
        marginBottom: 80
    },

	textInput: { 
		width: "80%", 
		borderRadius: 10, 
		paddingVertical: 8, 
		paddingHorizontal: 16, 
		borderColor: "rgba(0, 0, 0, 0.2)", 
		borderWidth: 1, 
		marginBottom: 8, 
		backgroundColor: '#FFF'
	}, 

    textInput2: { 
		borderRadius: 10, 
		paddingVertical: 8, 
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 16, 
		borderColor: "rgba(0, 0, 0, 0.2)", 
		borderWidth: 1, 
		marginHorizontal: 20,
		marginBottom: 10,
		fontFamily: 'Red Hat Display'
	}, 

	venmo: {
		width: 180,
		height: 60
	},

  view: {
		paddingTop: 4.5,
	},

	
  warning:{
    color: "#FFF",
    fontFamily: 'Red Hat Display',
  },

  tinyLogo: {
     width: 50,
     height: 50,
  },
      
  bhsLogo: {
     width: 150,
     height: 150,
  },

  block: {
     marginLeft: 10,
     marginTop: 10,
     marginBottom: 10,
     marginRight: 10,
     paddingLeft: 15,
     paddingRight: 15,
     paddingTop: 10,
     paddingBottom: 10,
     borderRadius: 10,
     borderWidth: 3, 
     width: '95%',
     height: 210,
  },

  title_block: {
     fontSize: 25,
     marginTop: 0,
     fontFamily: 'Red Hat Display',
  },

  text_block: {
     fontSize: 14,
     fontFamily: 'Red Hat Display',
     position: 'absolute',
     marginTop: 10,
  },

  name_block:{
     fontSize: 10,
     position: 'absolute',
  },

  date:{
     fontSize: 10,
     position: 'absolute',
     marginTop: 10,
  },
    
});

export default style.js;
