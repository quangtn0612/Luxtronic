import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import Card from '../shared/createBookingCard';

let timesBooked = [
	'11:00AM',
	'11:10AM',
	'11:20AM',
	'11:30AM',
	'11:40AM',
	'11:50AM',
	'12:00PM',
	'12:10PM',
	'12:20PM',
	'12:30PM',
	'12:40PM',
	'12:50PM',
	'1:00PM',
	'1:10PM',
	'1:20PM',
	'1:30PM',
	'1:40PM',
	'1:50PM',
	'2:00PM',
	'2:10PM',
	'2:20PM',
	'2:30PM',
	'2:40PM',
	'2:50PM',
	'3:00PM',
	'3:10PM',
	'3:20PM',
	'3:30PM',
	'3:40PM',
	'3:50PM',
	'4:00PM',
	'4:10PM',
	'4:20PM',
	'4:30PM',
];
let timesAvailable = [ false ];
let times = [
	'11:00AM',
	'11:10AM',
	'11:20AM',
	'11:30AM',
	'11:40AM',
	'11:50AM',
	'12:00PM',
	'12:10PM',
	'12:20PM',
	'12:30PM',
	'12:40PM',
	'12:50PM',
	'1:00PM',
	'1:10PM',
	'1:20PM',
	'1:30PM',
	'1:40PM',
	'1:50PM',
	'2:00PM',
	'2:10PM',
	'2:20PM',
	'2:30PM',
	'2:40PM',
	'2:50PM',
	'3:00PM',
	'3:10PM',
	'3:20PM',
	'3:30PM',
	'3:40PM',
	'3:50PM',
	'4:00PM',
	'4:10PM',
	'4:20PM',
	'4:30PM',
];

const BookingPickupScreen = ({ navigation }) => {
	// Sets variables
	const [ bookingDate, setbookingDate ] = React.useState('');
	let bookingDateWT = '';
	const [ bookingDateWTRender, setbookingDateWTRender ] = React.useState('');
	const [ chosenDate, setchosenDate ] = React.useState(false);
	const [ chosenTime, setchosenTime ] = React.useState(false);

	return (
		// Setting View to full screen
		<View style={{ flex: 1 }}>
			{/* Setting usable screen area based on predefined settings from React Native */}
			<SafeAreaView style={styles.background}>
				{/* Wrap whole usable screen in view flex 1 */}
				<View style={{ flex: 1 }}>
					{/* Hides screen when moving to next screen */}
					{!chosenDate ? (
						<View style={{ flex: 1 }}>
							<View style={{ flex: 3 }}>
								<View style={{ alignItems: 'center' }}>
									<Text
										style={{
											fontSize: 30,
											fontWeight: 'bold',
										}}
									>
										Create a Booking
									</Text>
									<Text
										style={{
											fontSize: 20,
											color: 'grey',
											marginBottom: '5%',
										}}
									>
										Choose a Date
									</Text>
								</View>

								{/* used to pick a date */}
								<CalendarPicker selectedDayColor="#EFA81F" onDateChange={setbookingDate} />
							</View>
							<View
								style={{
									alignItems: 'center',
									justifyContent: 'flex-end',
									flex: 1,
								}}
							>
								{/* Displays choose a time button when a date is selected */}
								{bookingDate ? (
									<TouchableOpacity
										style={styles.button}
										onPress={() => (
											(bookingDateWT = moment(bookingDate).format('DD-MM-YYYY')),
											setbookingDateWTRender(bookingDateWT),
											bookingTime(
												bookingDateWT,
												setchosenDate,
												setbookingDate,
												setbookingDateWTRender,
												bookingDate
											)
										)}
									>
										<Text style={styles.text}>Choose a Time</Text>
									</TouchableOpacity>
								) : null}
								<TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
									<Text style={styles.text}>Back</Text>
								</TouchableOpacity>
							</View>
						</View>
					) : null}

					{/* Step four (Screen four) of the create a booking screen */}
					{chosenDate ? (
						<View style={{ flex: 1 }}>
							{/* Hides screen when moving to next screen */}
							{!chosenTime ? (
								<View style={{ flex: 1 }}>
									<View style={{ alignItems: 'center' }}>
										<Text
											style={{
												fontSize: 30,
												fontWeight: 'bold',
											}}
										>
											Create a Booking
										</Text>
										<Text
											style={{
												fontSize: 20,
												color: 'grey',
											}}
										>
											{bookingDateWTRender}
										</Text>
										<Text
											style={{
												fontSize: 20,
												color: 'grey',
												marginBottom: '5%',
											}}
										>
											Choose a Time
										</Text>
									</View>
									<View
										style={{
											flex: 7,
											backgroundColor: '#ECECEC',
										}}
									>
										<FlatList
											data={timesAvailable}
											renderItem={({ item }) => (
												<View
													style={{
														alignItems: 'center',
														justifyContent: 'center',
													}}
												>
													<Card>
														<View
															style={{
																flexDirection: 'row',
																alignItems: 'center',
																justifyContent: 'center',
															}}
														>
															<MaterialCommunityIcons
																name={'clock-time-four-outline'}
																size={30}
															/>
															<Text
																style={{
																	margin: 5,
																	fontWeight: 'bold',
																	fontSize: 20,
																}}
															>
																{item}
															</Text>
														</View>
														<TouchableOpacity
															style={styles.cardbutton}
															onPress={() => (
																setchosenTime(true),
																bookPickup(bookingDateWTRender, item, navigation)
															)}
														>
															<Text style={styles.text}>Select Time</Text>
														</TouchableOpacity>
													</Card>
												</View>
											)}
											keyExtractor={(item, index) => index.toString()}
										/>
									</View>
									<View
										style={{
											alignItems: 'center',
											justifyContent: 'flex-end',
											flex: 1,
										}}
									>
										<TouchableOpacity
											style={styles.button}
											onPress={() => (
												setchosenDate(false), setbookingDate(''), setbookingDateWTRender('')
											)}
										>
											<Text style={styles.text}>Back</Text>
										</TouchableOpacity>
									</View>
								</View>
							) : null}
						</View>
					) : null}
				</View>
			</SafeAreaView>
		</View>
	);
};

// create insert bookpickup and php
const bookPickup = (bookingDateWTRender, item, navigation) => {
	// Fetch is an API call that retrieves PHP data from registration.php
	fetch(global.API_DIRECTORY + global.BOOK_PICKUP, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		// The JSON body is parsed with variables declared in registration.php
		body: JSON.stringify({
			booking_id: navigation.getParam('item').booking_id,
			pickup_date: bookingDateWTRender,
			pickup_time: item,
		}),
		// Convert the response to text
	})
		.then((response) => response.text())
		.then((responseText) => {
			// This is where we use the received data
			Alert.alert('Notice', responseText, [
				{
					text: 'Ok',
					onPress: () => navigation.navigate('BookingsScreen'),
				},
			]);
		})
		.catch((e) => {
			console.log('oh no :(', e);
		});
};

const bookingTime = (db, setchosenDate, setbookingDate, setbookingDateWTRender, bookingDate) => {
	let currentDate = new Date();
	let compareDate = new Date(bookingDate);
	if (compareDate > currentDate) {
		// Sets variables for database check
		let setArrayCounter = 0;
		let whileLoopCounter = 0;
		let availableTimeCounter = 0;
		let falseCounter = 0;
		let objectCounter = 0;
		let timeSetCounter = 0;

		fetch(global.API_DIRECTORY + global.SEARCH_BOOKINGS, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				date_booked: db,
			}),
		})
			.then((response) => response.json())
			.then((responseJSON) => {
				while (timeSetCounter < timesBooked.length) {
					timesBooked[timeSetCounter] = times[timeSetCounter];
					timeSetCounter = timeSetCounter + 1;
				}

				// If response returns nothing all time slots free
				if (responseJSON == false) {
				} else {
					// Checks database response for time slots taken and assigns accordingly
					while (objectCounter < responseJSON.length) {
						availableTimeCounter = 0;
						while (availableTimeCounter < timesBooked.length) {
							if (
								responseJSON[objectCounter]['status'] == 'Pending' ||
								responseJSON[objectCounter]['status'] == 'Complete' ||
								responseJSON[objectCounter]['status'] == 'In Progress'
							) {
								if (responseJSON[objectCounter]['pickup_time'] == '') {
									if (
										responseJSON[objectCounter]['time_booked'] == timesBooked[availableTimeCounter]
									) {
										timesBooked[availableTimeCounter] = false;
									}
								} else if (
									responseJSON[objectCounter]['pickup_time'] == timesBooked[availableTimeCounter]
								) {
									timesBooked[availableTimeCounter] = false;
								}
							}

							availableTimeCounter = availableTimeCounter + 1;
						}
						objectCounter = objectCounter + 1;
					}
				}

				// Removes any time slots taken and sets array to be used
				whileLoopCounter = 0;
				setArrayCounter = 0;
				while (whileLoopCounter < timesBooked.length) {
					if (timesBooked[whileLoopCounter] == false) {
						falseCounter = falseCounter + 1;
					} else {
						timesAvailable[setArrayCounter] = timesBooked[whileLoopCounter];
						setArrayCounter = setArrayCounter + 1;
					}
					whileLoopCounter = whileLoopCounter + 1;
				}

				// If all slots are taken return alert
				if (falseCounter > timesBooked.length) {
					Alert.alert('Notice', 'No time slots available on ' + db, [
						{
							text: 'Ok',
							onPress: () => (
								setchosenDate(false),
								setbookingDate(''),
								setstepFour('checkbox-blank-circle-outline'),
								setbookingDateWTRender('')
							),
						},
					]);
				} else {
					// if there is at least one slot available advance to the next screen
					setchosenDate(true);
				}
			})
			.catch((db) => {
				console.error('oh no :(', db);
			});
	} else {
		// Alert if date has past or is not longer available to book
		Alert.alert('Notice', db + ' is no longer available', [
			{
				text: 'Ok',
				onPress: () => (setchosenDate(false), setbookingDate(''), setbookingDateWTRender('')),
			},
		]);
	}
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 0,
	},
	button: {
		width: '90%',
		height: 60,
		borderRadius: 20,
		backgroundColor: '#EFA81F',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	cardbutton: {
		width: '90%',
		height: 60,
		borderRadius: 20,
		backgroundColor: '#EFA81F',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	checkBoxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 40,
	},
	Icon: {
		width: '95%',
		height: '95%',
		resizeMode: 'contain',
	},
	IconButton: {
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	IconText: {
		fontWeight: 'bold',
		fontSize: 20,
	},
	IconText2: {
		fontSize: 20,
	},
	progressBarIcons: {
		flex: 0.2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'baseline',
	},
	rowInput: {
		flex: 0.9, //because the * goes outside of the view (100% width in NewTextInput)
		marginVertical: 10,
		alignItems: 'center', //aligns vertically
		justifyContent: 'flex-start', //aligns horizontally
		flexDirection: 'row',
	},
	ScrollView: {
		paddingHorizontal: 20,
	},
	serviceText: {
		color: 'grey', //grey colour
		fontSize: 18,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir', //font family changes for android/iOS
		paddingLeft: 10,
	},
	serviceText2: {
		color: '#000', //black colour
		fontSize: 18,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir', //font family changes for android/iOS
		fontWeight: 'bold',
	},
	text: {
		color: '#fff',
		fontSize: 20,
	},
	vCenter: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
});

export default BookingPickupScreen;
