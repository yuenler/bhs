import React, { useReducer } from 'react';
import { Text, View, StyleSheet, Alert, TextInput, Linking} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect from 'react-native-picker-select';

export default class CustomizationScreen extends React.Component {
    state = {
        block: "",
		teacher: "",
		className: "",
		phoneNumber: "",
	};

	options = {
		blocks:['','A','B','C','D','E','F','G','Z','T','X'],
		teachers: ['','Free','Alexander, Melanee', 'Alibhai, Marika', 'Allegrezza, Christina', 'Allen, Astrid', 'Anderson, Marcella', 'Angione, Mary', 'Asselin, Lindsay', 'Babitskaya, Katya', 'Bader, Alex', 'Barkett, Scott', 'Barrer-Gall, Jennifer', 'Barrett, Jake', 'Bayer, Amy', 'Beaulieu-Jones, Kyle', 'Berman, Ben', 'Bernier, Kathleen', 'Bishop, Nina', 'Blette, Erin', 'Breneisen, Jennifer', 'Brennan, Elizabeth', 'Broken Rope, Zac', 'Brown, Briana', 'Brown, Tyler', 'Buhl, Elizabeth', 'Burke-Hunter, Joanne', 'Burns, Amy', 'Buys, Kari', 'Camara, Monica', 'Carpenter, Paul', 'Carruthers, Christine', 'Castellano, Carolyn', 'Cawthorne, Malcolm', 'Cells, Meaghan', 'Chang, Fu-Tseng', 'Chiu, Linda', 'Colburn, Eric', 'Conner, Alisa', 'Crane, Elizabeth', 'Crepeau, Andy', 'Crocker, Alison', 'Crossen, Heather', 'Crusberg, Gretchen', 'Cruz-López, Elena', 'Davis, Elizabeth', 'Davis, Lindsay', 'DeGrace, Matthew', 'DeYoung, Mike', 'Derrien, Andre', 'Dickerman, Sam', 'Differ, Betty', 'Dillon, Colleen', 'Dondero, Ali', 'Driscoll, Michael', 'DuBois, Matthew', 'Eio, Rachel', 'Fiedor, Mark', 'Fischer, Elon', 'Flynn-Carson, Keira', 'Ford, David', 'Frey, Jennifer', 'Fried, Adam', 'Friedland, Craig', 'Fuertes, Marta', 'Giblin, Heather', 'Glazer, Caryn', 'Goose, Stephen', 'Gorlin, Sophie', 'Gorman, Elizabeth', 'Graham, Billy', 'Grande, Roger', 'Gray, Emily', 'Griffin, Kelle', 'Gronlund-Jacob, Noah', 'Grubb, Jennifer', 'Grunseich, Ivonne', 'Gurner, Glen', 'Gurry, Laura', 'Hanaghan, Jennifer', 'Harrington, Gaelen', 'Hayden, Rebecca', 'Hemphill, Sarah', 'Henry, Jim', 'Hernandez, Mayra', 'Hitchcock, Kathy', 'Honeywood, Laura', 'Hunt, Emily', 'Hunt, Stephanie', 'Irabarren-Lopez, Gisela', 'Irvin, Holly', 'James, Julia', 'Jaruse, Jennifer', 'Joyal, Julie', 'Juo, Jasmine', 'Kanter-Caruso, Kathryn', 'Keenan, Barbara', 'Kelly, Andy', 'Kennedy-Justice, Meghan', 'Kimball, Andrew', 'Kissel, Stacy', 'Knott, David', 'Kobus, Brendan', 'Kornell, Sarah', 'Kostant, Shoshanna', 'Kozel, Brad', 'Kramer, Jason', 'Labouchere, Natalie', 'Ladner, Sarah', 'Lamb, Dorian', 'Lantos, Steve', 'Latimer, Eric', 'Lauro-Priestly, Paul', 'Lee, John', 'Lehman, Amanda', 'Leonard, Sarah', 'Leslie, Elsbeth', 'Leslie, Kathryn', 'Lima, Gretchen', 'Little, Benjamin', 'Longmire, Jenny', 'Lopez, Kara', 'Love, Aubrey', 'Lowe, Kathleen', 'Lynch, Andrea', 'Lynn, Lori', 'Maglathlin, Andrew', 'Maimonis, Elena', 'Mangan, Julia', 'Marcos, Reiko', 'Martin, Jennifer', 'Mastandrea, Mary', 'McAllister, Stephanie', 'McCarthy, Brendan', 'McElroy, Sandra', 'McGee, Patrick', 'McGinnis, Emily', 'Meagher, Peter', 'Mendez, Pedro', 'Meyers, Wes', 'Miller, Marcie', 'Mitchell, Dave', 'Mohamedi, Graciela', 'Montrose, Jason', 'Morimando, Beau', 'Morris, Ian', 'Morrow, Kelly', 'Mousseau, Evan', 'Muldowney, Nicole', 'Murphy, Alexis', 'Murphy, Kristen', 'Mwosa, Thato', 'Mylchreest, Tom', 'Naimy, Julia', 'Nardi, Talmadge', 'Normant, Michael', "O'Connell, Brendan", "O'Mahony, Erica", 'Ouellette, Katy Frost', 'Padgett, Julie', 'Page, Jacob', 'Paniagua, Juan', 'Parisi, Katelyn', 'Parker, Alissa', 'Pero, Nick', 'Petty, David', 'Poon, Brian', 'Primmer, Robert', 'Proctor, Michael', 'Putnam, Dean', 'Rabina, Danielle', 'Reagan, Rachel', 'Richer, Meghan', 'Rocco, Julia', 'Rodriguez, Lisa', 'Rose-Wood, Jennifer', 'Ross, Robin', 'Rothstein, Nicholas', 'Sakaria, Devina', 'Saler, Judy', 'Sartanowicz, Donna', 'Sawyer Delano, Amy', 'Schiff, Matt', 'Sedlak, Peter', 'Shapiro, Fukiko', 'Shen, Christine', 'Shields, Elaine', 'Shorter, Lihua', 'Shuster, Sarah', 'Siver, Emma', 'Skeen, Hayley', 'Spencer, Jennifer', 'Speyer, Julia', 'Stevens, Britt', 'Strauss, Lindsay', 'Strong, Betty', 'Thomas, Keith', 'Toback, Robin', 'Tobey, Kristina', 'Tong, Jason', 'VanDerzee, Mark', 'Vanderclock, Perri', 'Vassallo, Cassie', 'Veader, Mark', 'Vendola, Joslyn', 'Wallace, Erin', 'Wang, Grace', 'Wang, Kevin', 'Wells, Hayley', 'Wheeler, Mark', 'Whitebone, Alison', 'Whitehead, Kevin', 'Williams, Eli', 'Williams, Summer', 'Winkler, Deborah', 'Wise, Lindsay', 'Wiser, Ed', 'Wolf, Catherine', 'Wong, Karen', 'Woolever, Chloe', 'Wooley, Kate', 'Yazdiha, Solmaaz', 'Zembruski, Alexandra']
	}

	saveClass = async (block, teacher, className) => {
		error = false
		try {
		  await AsyncStorage.setItem(block+"teacher", teacher)
		} catch (e) {
			error = true;
		}

		try {
			await AsyncStorage.setItem(block+"class", className)
		  } catch (e) {
			error = true;
		  }

		  if (error){
			  Alert.alert("Error saving changes. Please try again.")
		  }
		  else{
			Alert.alert(
				"The following class has successfully been saved!",
				block + " Block: " + className + " - " + teacher
				
			  );
			  
		  }
		
	  }

	  savePhoneNumber = async (phoneNumber) => {
		error = false;
		try {
		  await AsyncStorage.setItem('phoneNumber', phoneNumber)
		} catch (e) {
		  error = true;
		}

		if (error){
			Alert.alert("Error saving changes. Please try again.")
		}
		else{
		  Alert.alert(
			  "Your phone number has been saved: " + phoneNumber
			);
			
		}
	  }
	

	  render() {

		let blocks = this.options.blocks.map( (s) => {
            return <Picker.Item key={s} value={s} label={s} />
		});
		
		let teachers = this.options.teachers.map( (s) => {
            return <Picker.Item key={s} value={s} label={s} />
        });
		
		console.log(this.state.block)

		return (
			<View style={styles.container}>
				<View style={{flexDirection: 'row'}}>
				<View style={{flex:1, margin: 20}}>
					<Text style = {{color: 'white', fontFamily: 'Red Hat Display'}}>Block</Text>
					<View style={{ height: 50, width: 100, backgroundColor: 'white' }}>
					<RNPickerSelect
			onValueChange={(block) => this.setState({ block})}
            items={[

                { label: 'A', value: 'A' },
                { label: 'B', value: 'B' },
                { label: 'C', value: 'C' },
				{ label: 'D', value: 'D' },
				{ label: 'E', value: 'E' },
				{ label: 'F', value: 'F' },
				{ label: 'G', value: 'G' },
				{ label: 'Z', value: 'Z' },
				{ label: 'T', value: 'T' },
				{ label: 'X', value: 'X' },
            ]}
        />
		</View>
		
				</View>

				<View style={{flex:2, margin: 20}}>
				<Text style = {{color: 'white', fontFamily: 'Red Hat Display'}}>Teacher</Text>
				<View style={{ height: 50, width: 200, backgroundColor: 'white' }}>
				<RNPickerSelect
				onValueChange={(teacher) => this.setState({ teacher })}
				items={[
	
					{ label: 'Free', value: 'Free', displayValue: true},
					{ label: 'Alexander, Melanee', value: 'Alexander, Melanee', displayValue: true },
					{ label: 'Alibhai, Marika', value: 'Alibhai, Marika', displayValue: true },
					{ label: 'Allegrezza, Christina', value: 'Allegrezza, Christina', displayValue: true },
					{ label: 'Allen, Astrid', value: 'Allen, Astrid', displayValue: true },
					{ label: 'Anderson, Marcella', value: 'Anderson, Marcella', displayValue: true },
					{ label: 'Angione, Mary', value: 'Angione, Mary', displayValue: true },
					{ label: 'Asselin, Lindsay', value: 'Asselin, Lindsay', displayValue: true },
					{ label: 'Babitskaya, Katya', value: 'Babitskaya, Katya', displayValue: true },
					{ label: 'Bader, Alex', value: 'Bader, Alex', displayValue: true },
					{ label: 'Barkett, Scott', value: 'Barkett, Scott', displayValue: true },
					{ label: 'Barrer-Gall, Jennifer', value: 'Barrer-Gall, Jennifer', displayValue: true },
					{ label: 'Barrett, Jake', value: 'Barrett, Jake', displayValue: true },
					{ label: 'Bayer, Amy', value: 'Bayer, Amy', displayValue: true },
					{ label: 'Beaulieu-Jones, Kyle', value: 'Beaulieu-Jones, Kyle', displayValue: true },
					{ label: 'Berman, Ben', value: 'Berman, Ben', displayValue: true },
					{ label: 'Bernier, Kathleen', value: 'Bernier, Kathleen', displayValue: true },
					{ label: 'Bishop, Nina', value: 'Bishop, Nina', displayValue: true },
					{ label: 'Blette, Erin', value: 'Blette, Erin', displayValue: true },
					{ label: 'Breneisen, Jennifer', value: 'Breneisen, Jennifer', displayValue: true },
					{ label: 'Brennan, Elizabeth', value: 'Brennan, Elizabeth', displayValue: true },
					{ label: 'Broken Rope, Zac', value: 'Broken Rope, Zac', displayValue: true },
					{ label: 'Brown, Briana', value: 'Brown, Briana', displayValue: true },
					{ label: 'Brown, Tyler', value: 'Brown, Tyler', displayValue: true },
					{ label: 'Buhl, Elizabeth', value: 'Buhl, Elizabeth', displayValue: true },
					{ label: 'Burke-Hunter, Joanne', value: 'Burke-Hunter, Joanne', displayValue: true },
					{ label: 'Burns, Amy', value: 'Burns, Amy', displayValue: true },
					{ label: 'Buys, Kari', value: 'Buys, Kari', displayValue: true },
					{ label: 'Camara, Monica', value: 'Camara, Monica', displayValue: true },
					{ label: 'Carpenter, Paul', value: 'Carpenter, Paul', displayValue: true },
					{ label: 'Carruthers, Christine', value: 'Carruthers, Christine', displayValue: true },
					{ label: 'Castellano, Carolyn', value: 'Castellano, Carolyn', displayValue: true },
					{ label: 'Cawthorne, Malcolm', value: 'Cawthorne, Malcolm', displayValue: true },
					{ label: 'Cells, Meaghan', value: 'Cells, Meaghan', displayValue: true },
					{ label: 'Chang, Fu-Tseng', value: 'Chang, Fu-Tseng', displayValue: true },
					{ label: 'Chiu, Linda', value: 'Chiu, Linda', displayValue: true },
					{ label: 'Colburn, Eric', value: 'Colburn, Eric', displayValue: true },
					{ label: 'Conner, Alisa', value: 'Conner, Alisa', displayValue: true },
					{ label: 'Crane, Elizabeth', value: 'Crane, Elizabeth', displayValue: true },
					{ label: 'Crepeau, Andy', value: 'Crepeau, Andy', displayValue: true },
					{ label: 'Crocker, Alison', value: 'Crocker, Alison', displayValue: true },
					{ label: 'Crossen, Heather', value: 'Crossen, Heather', displayValue: true },
					{ label: 'Crusberg, Gretchen', value: 'Crusberg, Gretchen', displayValue: true },
					{ label: 'Cruz-López, Elena', value: 'Cruz-López, Elena', displayValue: true },
					{ label: 'Davis, Elizabeth', value: 'Davis, Elizabeth', displayValue: true },
					{ label: 'Davis, Lindsay', value: 'Davis, Lindsay', displayValue: true },
					{ label: 'DeGrace, Matthew', value: 'DeGrace, Matthew', displayValue: true },
					{ label: 'DeYoung, Mike', value: 'DeYoung, Mike', displayValue: true },
					{ label: 'Derrien, Andre', value: 'Derrien, Andre', displayValue: true },
					{ label: 'Dickerman, Sam', value: 'Dickerman, Sam', displayValue: true },
					{ label: 'Differ, Betty', value: 'Differ, Betty', displayValue: true },
					{ label: 'Dillon, Colleen', value: 'Dillon, Colleen', displayValue: true },
					{ label: 'Dondero, Ali', value: 'Dondero, Ali', displayValue: true },
					{ label: 'Driscoll, Michael', value: 'Driscoll, Michael', displayValue: true },
					{ label: 'DuBois, Matthew', value: 'DuBois, Matthew', displayValue: true },
					{ label: 'Eio, Rachel', value: 'Eio, Rachel', displayValue: true },
					{ label: 'Fiedor, Mark', value: 'Fiedor, Mark', displayValue: true },
					{ label: 'Fischer, Elon', value: 'Fischer, Elon', displayValue: true },
					{ label: 'Flynn-Carson, Keira', value: 'Flynn-Carson, Keira', displayValue: true },
					{ label: 'Ford, David', value: 'Ford, David', displayValue: true },
					{ label: 'Frey, Jennifer', value: 'Frey, Jennifer', displayValue: true },
					{ label: 'Fried, Adam', value: 'Fried, Adam', displayValue: true },
					{ label: 'Friedland, Craig', value: 'Friedland, Craig', displayValue: true },
					{ label: 'Fuertes, Marta', value: 'Fuertes, Marta', displayValue: true },
					{ label: 'Giblin, Heather', value: 'Giblin, Heather', displayValue: true },
					{ label: 'Glazer, Caryn', value: 'Glazer, Caryn', displayValue: true },
					{ label: 'Goose, Stephen', value: 'Goose, Stephen', displayValue: true },
					{ label: 'Gorlin, Sophie', value: 'Gorlin, Sophie', displayValue: true },
					{ label: 'Gorman, Elizabeth', value: 'Gorman, Elizabeth', displayValue: true },
					{ label: 'Graham, Billy', value: 'Graham, Billy', displayValue: true },
					{ label: 'Grande, Roger', value: 'Grande, Roger', displayValue: true },
					{ label: 'Gray, Emily', value: 'Gray, Emily', displayValue: true },
					{ label: 'Griffin, Kelle', value: 'Griffin, Kelle', displayValue: true },
					{ label: 'Gronlund-Jacob, Noah', value: 'Gronlund-Jacob, Noah', displayValue: true },
					{ label: 'Grubb, Jennifer', value: 'Grubb, Jennifer', displayValue: true },
					{ label: 'Grunseich, Ivonne', value: 'Grunseich, Ivonne', displayValue: true },
					{ label: 'Gurner, Glen', value: 'Gurner, Glen', displayValue: true },
					{ label: 'Gurry, Laura', value: 'Gurry, Laura', displayValue: true },
					{ label: 'Hanaghan, Jennifer', value: 'Hanaghan, Jennifer', displayValue: true },
					{ label: 'Harrington, Gaelen', value: 'Harrington, Gaelen', displayValue: true },
					{ label: 'Hayden, Rebecca', value: 'Hayden, Rebecca', displayValue: true },
					{ label: 'Hemphill, Sarah', value: 'Hemphill, Sarah', displayValue: true },
					{ label: 'Henry, Jim', value: 'Henry, Jim', displayValue: true },
					{ label: 'Hernandez, Mayra', value: 'Hernandez, Mayra', displayValue: true },
					{ label: 'Hitchcock, Kathy', value: 'Hitchcock, Kathy', displayValue: true },
					{ label: 'Honeywood, Laura', value: 'Honeywood, Laura', displayValue: true },
					{ label: 'Hunt, Emily', value: 'Hunt, Emily', displayValue: true },
					{ label: 'Hunt, Stephanie', value: 'Hunt, Stephanie', displayValue: true },
					{ label: 'Irabarren-Lopez, Gisela', value: 'Irabarren-Lopez, Gisela', displayValue: true },
					{ label: 'Irvin, Holly', value: 'Irvin, Holly', displayValue: true },
					{ label: 'James, Julia', value: 'James, Julia', displayValue: true },
					{ label: 'Jaruse, Jennifer', value: 'Jaruse, Jennifer', displayValue: true },
					{ label: 'Joyal, Julie', value: 'Joyal, Julie', displayValue: true },
					{ label: 'Juo, Jasmine', value: 'Juo, Jasmine', displayValue: true },
					{ label: 'Kanter-Caruso, Kathryn', value: 'Kanter-Caruso, Kathryn', displayValue: true },
					{ label: 'Keenan, Barbara', value: 'Keenan, Barbara', displayValue: true },
					{ label: 'Kelly, Andy', value: 'Kelly, Andy', displayValue: true },
					{ label: 'Kennedy-Justice, Meghan', value: 'Kennedy-Justice, Meghan', displayValue: true },
					{ label: 'Keenan, Barbara', value: 'Keenan, Barbara', displayValue: true },
					{ label: 'Kelly, Andy', value: 'Kelly, Andy', displayValue: true },
					{ label: 'Kennedy-Justice, Meghan', value: 'Kennedy-Justice, Meghan', displayValue: true },
					{ label: 'Kimball, Andrew', value: 'Kimball, Andrew', displayValue: true },
					{ label: 'Kissel, Stacy', value: 'Kissel, Stacy', displayValue: true },
					{ label: 'Knott, David', value: 'Knott, David', displayValue: true },
					{ label: 'Kobus, Brendan', value: 'Kobus, Brendan', displayValue: true },
					{ label: 'Kornell, Sarah', value: 'Kornell, Sarah', displayValue: true },
					{ label: 'Kostant, Shoshanna', value: 'Kostant, Shoshanna', displayValue: true },
					{ label: 'Kozel, Brad', value: 'Kozel, Brad', displayValue: true },
					{ label: 'Kramer, Jason', value: 'Kramer, Jason', displayValue: true },
					{ label: 'Labouchere, Natalie', value: 'Labouchere, Natalie', displayValue: true },
					{ label: 'Ladner, Sarah', value: 'Ladner, Sarah', displayValue: true },
					{ label: 'Lamb, Dorian', value: 'Lamb, Dorian', displayValue: true },
					{ label: 'Lantos, Steve', value: 'Lantos, Steve', displayValue: true },
					{ label: 'Latimer, Eric', value: 'Latimer, Eric', displayValue: true },
					{ label: 'Lauro-Priestly, Paul', value: 'Lauro-Priestly, Paul', displayValue: true },
					{ label: 'Lee, John', value: 'Lee, John', displayValue: true },
					{ label: 'Lehman, Amanda', value: 'Lehman, Amanda', displayValue: true },
					{ label: 'Leonard, Sarah', value: 'Leonard, Sarah', displayValue: true },
					{ label: 'Leslie, Elsbeth', value: 'Leslie, Elsbeth', displayValue: true },
					{ label: 'Leslie, Kathryn', value: 'Leslie, Kathryn', displayValue: true },
					{ label: 'Lima, Gretchen', value: 'Lima, Gretchen', displayValue: true },
					{ label: 'Little, Benjamin', value: 'Little, Benjamin', displayValue: true },
					{ label: 'Longmire, Jenny', value: 'Longmire, Jenny', displayValue: true },
					{ label: 'Lopez, Kara', value: 'Lopez, Kara', displayValue: true },
					{ label: 'Love, Aubrey', value: 'Love, Aubrey', displayValue: true },
					{ label: 'Lowe, Kathleen', value: 'Lowe, Kathleen', displayValue: true },
					{ label: 'Lynch, Andrea', value: 'Lynch, Andrea', displayValue: true },
					{ label: 'Lynn, Lori', value: 'Lynn, Lori', displayValue: true },
					{ label: 'Maglathlin, Andrew', value: 'Maglathlin, Andrew', displayValue: true },
					{ label: 'Maimonis, Elena', value: 'Maimonis, Elena', displayValue: true },
					{ label: 'Mangan, Julia', value: 'Mangan, Julia', displayValue: true },
					{ label: 'Marcos, Reiko', value: 'Marcos, Reiko', displayValue: true },
					{ label: 'Martin, Jennifer', value: 'Martin, Jennifer', displayValue: true },
					{ label: 'Mastandrea, Mary', value: 'Mastandrea, Mary', displayValue: true },
					{ label: 'McAllister, Stephanie', value: 'McAllister, Stephanie', displayValue: true },
					{ label: 'McCarthy, Brendan', value: 'McCarthy, Brendan', displayValue: true },
					{ label: 'McElroy, Sandra', value: 'McElroy, Sandra', displayValue: true },
					{ label: 'McGee, Patrick', value: 'McGee, Patrick', displayValue: true },
					{ label: 'McGinnis, Emily', value: 'McGinnis, Emily', displayValue: true },
					{ label: 'Meagher, Peter', value: 'Meagher, Peter', displayValue: true },
					{ label: 'Mendez, Pedro', value: 'Mendez, Pedro', displayValue: true },
					{ label: 'Meyers, Wes', value: 'Meyers, Wes', displayValue: true },
					{ label: 'Miller, Marcie', value: 'Miller, Marcie', displayValue: true },
					{ label: 'Mitchell, Dave', value: 'Mitchell, Dave', displayValue: true },
					{ label: 'Mohamedi, Graciela', value: 'Mohamedi, Graciela', displayValue: true },
					{ label: 'Montrose, Jason', value: 'Montrose, Jason', displayValue: true },
					{ label: 'Morimando, Beau', value: 'Morimando, Beau', displayValue: true },
					{ label: 'Morris, Ian', value: 'Morris, Ian', displayValue: true },
					{ label: 'Morrow, Kelly', value: 'Morrow, Kelly', displayValue: true },
					{ label: 'Mousseau, Evan', value: 'Mousseau, Evan', displayValue: true },
					{ label: 'Muldowney, Nicole', value: 'Muldowney, Nicole', displayValue: true },
					{ label: 'Murphy, Alexis', value: 'Murphy, Alexis', displayValue: true },
					{ label: 'Murphy, Kristen', value: 'Murphy, Kristen', displayValue: true },
					{ label: 'Mwosa, Thato', value: 'Mwosa, Thato', displayValue: true },
					{ label: 'Mylchreest, Tom', value: 'Mylchreest, Tom', displayValue: true },
					{ label: 'Naimy, Julia', value: 'Naimy, Julia', displayValue: true },
					{ label: 'Nardi, Talmadge', value: 'Nardi, Talmadge', displayValue: true },
					{ label: 'Normant, Michael', value: 'Normant, Michael', displayValue: true },
					{ label: "O'Connell, Brendan", value: "O'Connell, Brendan", displayValue: true },
					{ label: "O'Mahony, Erica", value: "O'Mahony, Erica", displayValue: true },
					{ label: 'Ouellette, Katy Frost', value: 'Ouellette, Katy Frost', displayValue: true },
					{ label: 'Padgett, Julie', value: 'Padgett, Julie', displayValue: true },
					{ label: 'Page, Jacob', value: 'Page, Jacob', displayValue: true },
					{ label: 'Paniagua, Juan', value: 'Paniagua, Juan', displayValue: true },
					{ label: 'Parisi, Katelyn', value: 'Parisi, Katelyn', displayValue: true },
					{ label: 'Parker, Alissa', value: 'Parker, Alissa', displayValue: true },
					{ label: 'Pero, Nick', value: 'Pero, Nick', displayValue: true },
					{ label: 'Petty, David', value: 'Petty, David', displayValue: true },
					{ label: 'Poon, Brian', value: 'Poon, Brian', displayValue: true },
					{ label: 'Primmer, Robert', value: 'Primmer, Robert', displayValue: true },
					{ label: 'Proctor, Michael', value: 'Proctor, Michael', displayValue: true },
					{ label: 'Putnam, Dean', value: 'Putnam, Dean', displayValue: true },
					{ label: 'Rabina, Danielle', value: 'Rabina, Danielle', displayValue: true },
					{ label: 'Reagan, Rachel', value: 'Reagan, Rachel', displayValue: true },
					{ label: 'Richer, Meghan', value: 'Richer, Meghan', displayValue: true },
					{ label: 'Rocco, Julia', value: 'Rocco, Julia', displayValue: true },
					{ label: 'Rodriguez, Lisa', value: 'Rodriguez, Lisa', displayValue: true },
					{ label: 'Rose-Wood, Jennifer', value: 'Rose-Wood, Jennifer', displayValue: true },
					{ label: 'Ross, Robin', value: 'Ross, Robin', displayValue: true },
					{ label: 'Rothstein, Nicholas', value: 'Rothstein, Nicholas', displayValue: true },
					{ label: 'Sakaria, Devina', value: 'Sakaria, Devina', displayValue: true },
					{ label: 'Saler, Judy', value: 'Saler, Judy', displayValue: true },
					{ label: 'Sartanowicz, Donna', value: 'Sartanowicz, Donna', displayValue: true },
					{ label: 'Sawyer Delano, Amy', value: 'Sawyer Delano, Amy', displayValue: true },
					{ label: 'Schiff, Matt', value: 'Schiff, Matt', displayValue: true },
					{ label: 'Sedlak, Peter', value: 'Sedlak, Peter', displayValue: true },
					{ label: 'Shapiro, Fukiko', value: 'Shapiro, Fukiko', displayValue: true },
					{ label: 'Shen, Christine', value: 'Shen, Christine', displayValue: true },
					{ label: 'Shields, Elaine', value: 'Shields, Elaine', displayValue: true },
					{ label: 'Shorter, Lihua', value: 'Shorter, Lihua', displayValue: true },
					{ label: 'Shuster, Sarah', value: 'Shuster, Sarah', displayValue: true },
					{ label: 'Siver, Emma', value: 'Siver, Emma', displayValue: true },
					{ label: 'Skeen, Hayley', value: 'Skeen, Hayley', displayValue: true },
					{ label: 'Spencer, Jennifer', value: 'Spencer, Jennifer', displayValue: true },
					{ label: 'Speyer, Julia', value: 'Speyer, Julia', displayValue: true },
					{ label: 'Stevens, Britt', value: 'Stevens, Britt', displayValue: true },
					{ label: 'Strauss, Lindsay', value: 'Strauss, Lindsay', displayValue: true },
					{ label: 'Strong, Betty', value: 'Strong, Betty', displayValue: true },
					{ label: 'Thomas, Keith', value: 'Thomas, Keith', displayValue: true },
					{ label: 'Toback, Robin', value: 'Toback, Robin', displayValue: true },
					{ label: 'Tobey, Kristina', value: 'Tobey, Kristina', displayValue: true },
					{ label: 'Tong, Jason', value: 'Tong, Jason', displayValue: true },
					{ label: 'VanDerzee, Mark', value: 'VanDerzee, Mark', displayValue: true },
					{ label: 'Vanderclock, Perri', value: 'Vanderclock, Perri', displayValue: true },
					{ label: 'Vassallo, Cassie', value: 'Vassallo, Cassie', displayValue: true },
					{ label: 'Veader, Mark', value: 'Veader, Mark', displayValue: true },
					{ label: 'Vendola, Joslyn', value: 'Vendola, Joslyn', displayValue: true },
					{ label: 'Wallace, Erin', value: 'Wallace, Erin', displayValue: true },
					{ label: 'Wang, Grace', value: 'Wang, Grace', displayValue: true },
					{ label: 'Wang, Kevin', value: 'Wang, Kevin', displayValue: true },
					{ label: 'Wells, Hayley', value: 'Wells, Hayley', displayValue: true },
					{ label: 'Wheeler, Mark', value: 'Wheeler, Mark', displayValue: true },
					{ label: 'Whitebone, Alison', value: 'Whitebone, Alison', displayValue: true },
					{ label: 'Whitehead, Kevin', value: 'Whitehead, Kevin', displayValue: true },
					{ label: 'Williams, Eli', value: 'Williams, Eli', displayValue: true },
					{ label: 'Williams, Summer', value: 'Williams, Summer', displayValue: true },
					{ label: 'Winkler, Deborah', value: 'Winkler, Deborah', displayValue: true },
					{ label: 'Wise, Lindsay', value: 'Wise, Lindsay', displayValue: true },
					{ label: 'Wiser, Ed', value: 'Wiser, Ed', displayValue: true },
					{ label: 'Wolf, Catherine', value: 'Wolf, Catherine', displayValue: true },
					{ label: 'Wong, Karen', value: 'Wong, Karen', displayValue: true },
					{ label: 'Woolever, Chloe', value: 'Woolever, Chloe', displayValue: true },
					{ label: 'Wooley, Kate', value: 'Wooley, Kate', displayValue: true },
					{ label: 'Yazdiha, Solmaaz', value: 'Yazdiha, Solmaaz', displayValue: true },
					{ label: 'Zembruski, Alexandra', value: 'Zembruski, Alexandra', displayValue: true },
					
				]}
		
        />

				</View>
				</View>
				</View>

				<View style={{flexDirection: 'row'}}>
				<View style={{flex: 3}}>
				<TextInput placeholder="Class Name"
						style={styles.textInput} 
						onChangeText={className => this.setState({ className })}
          				value={this.state.className} /> 
				</View>

				<View style={{flex: 1}}>
				<TouchableOpacity style = {styles.button} onPress = {() => {
					this.saveClass(this.state.block, this.state.teacher, this.state.className)
				}}>
					<Text style={styles.buttonText}>Record Class</Text>
				</TouchableOpacity>
				</View>
				</View>

				<View style={{marginTop: 30, marginHorizontal: 30}}>
				<Text style={{color: "#FFF", fontFamily: 'Red Hat Display'}}>The following field will be stored locally on your device unless you request a friend on the Friends Screen.</Text>
				</View>
				
				<View style={{flexDirection: 'row'}}>
				<View style={{flex:2}}>
				<TextInput placeholder="Phone number"
						style={styles.textInput} 
						onChangeText={phoneNumber => this.setState({ phoneNumber })}
						  value={this.state.phoneNumber}
						  keyboardType='number-pad' /> 
				</View>
				<View style={{flex:1}}>
				<TouchableOpacity style = {styles.button} onPress = {() => {this.savePhoneNumber(this.state.phoneNumber)}}>
					<Text style={styles.buttonText}>Submit</Text>
				</TouchableOpacity>
				</View>
				</View>

				<View style={{margin: 20}}>
				<Text style={{color: 'white'}}>Creating the Brookline High School App takes time, effort, and money. To help support and give back to the BHS App Development Club, click on the following button to donate.</Text>
				</View>

				<TouchableOpacity style = {styles.button} onPress = {() => {Linking.openURL('https://gofundme.com')}}>
					<Text style={styles.buttonText}>Donate</Text>
				</TouchableOpacity>

            </View>
            
		);
	}
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#871609',
		padding: 10,
		borderRadius: 20,
	},
	buttonText: {
		fontSize: 15,
		color: '#fff',
		textAlign: 'center'
		
	},
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#0F182D',
	},
	textInput: { 
		// width: "100%",
		borderRadius: 5, 
		paddingVertical: 8, 
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 16, 
		borderColor: "rgba(0, 0, 0, 0.2)", 
		borderWidth: 1, 
		marginHorizontal: 20,
	}, 
});
