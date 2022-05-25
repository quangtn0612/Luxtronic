import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, ScrollView, Modal, TextInput} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Card from '../shared/ticketsCard';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg'
import { Center } from 'native-base';

import AppTextInput from '../components/AppTextInput';
import { date } from 'yup';

const TechExpandedTicketScreen = ({ navigation }) => {
	// Set Variables
	const [ modalVisible, setModalVisibile] = React.useState(false);
	const [ dateModalVis, setDateVisible] = React.useState(false);
	const [ customerInfo, setcustomerInfo ] = React.useState(navigation.getParam('customerInfo'));
	const [ ticket, setticket ] = React.useState(navigation.getParam('item'));
	const [ statusContainerChange, setstatusContainerChange ] = React.useState(false);
	const [ model, setModel] = React.useState(ticket.model_number);
	const [ serialNo, setSerialNo] = React.useState(ticket.serial_number);
	const [ bookingDate, setBookingDate] = React.useState(ticket.date_booked);
	const [ list, setList ] = React.useState([
		{
			title: 'Pending',
			bgColor: '#47B7D8',
		},
		{
			title: 'In Progress',
			bgColor: '#EFA81F',
		},
		{
			title: 'Cancelled',
			bgColor: '#DB5A27',
		},
		{
			title: 'Complete',
			bgColor: '#80B942',
		},
		{
			title: 'Closed',
			bgColor: '#CCCCCC',
		},
	]);
	let deviceTypes = [{value: 'Windows'}, {value: 'Apple'}];
	let times = [
		{value:'11:00AM'},
		{value:'11:10AM'},
		{value:'11:20AM'},
		{value:'11:30AM'},
		{value:'11:40AM'},
		{value:	'11:50AM'},
		{value:	'12:00PM'},
		{value:	'12:10PM'},
		{value:	'12:20PM'},
		{value:	'12:30PM'},
		{value:	'12:40PM'},
		{value:	'12:50PM'},
		{value:	'1:00PM'},
		{value:	'1:10PM'},
		{value:	'1:20PM'},
		{value:	'1:30PM'},
		{value:	'1:40PM'},
		{value:	'1:50PM'},
		{value:	'2:00PM'},
		{value:	'2:10PM'},
		{value:	'2:20PM'},
		{value:	'2:30PM'},
		{value:	'2:40PM'},
		{value:	'2:50PM'},
		{value:	'3:00PM'},
		{value:	'3:10PM'},
		{value:	'3:20PM'},
		{value:	'3:30PM'},
		{value:	'3:40PM'},
		{value:	'3:50PM'},
		{value:	'4:00PM'},
		{value:	'4:10PM'},
		{value:	'4:20PM'},
		{value:	'4:30PM'},
	];

	const updateDate = (selectedDate) => {
		const currentDate = moment(new Date(selectedDate)).format('DD-MM-YYYY'); 
		
		setBookingDate(currentDate);
	}

	return (
		// View set to entire screen
		<View style={{ flex: 1 }}>
			{/* Sets safe usable screen area */}
			<SafeAreaView style={styles.container}>
				{/* Takes up whole usable screen */}
				<Modal
					animationType='slide'
					visible={modalVisible}
					transparent={true}
					onRequestClose={() => setModalVisibile(!modalVisible)}>
						<View style = {{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: 'rgba(0,0,0,0.5)'
						}}>
							<View style = {{
								width:300,
								height:300,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: 'white',
								borderRadius:50
							}}>
								<QRCode
								value={ ticket.booking_id + '/' + ticket.user_id}
								size = {250}
								color='white'
								backgroundColor='black'
								>
								</QRCode>
							</View>
							<Text>Please present this QRCode to the technician to have your ticket quickly brought up</Text>
						</View>				
					</Modal>
				<View style={{ flex: 1 }}>
					{/* Containing title and sub title and styling */}

					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						
						<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Booking Details</Text>
						<Text
							style={{
								fontSize: 20,
								color: 'grey',
							}}
						>
							Booking ID: {ticket.booking_id}
						</Text>
					</View>
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<TouchableOpacity
							style={{ paddingBottom: 10 }}
							onPress={() => {
								setModalVisibile(!modalVisible)
							}}
							>
							<Text style={{ fontSize: 30}}>Generate QR Code</Text>
							</TouchableOpacity>
					</View>
					{/* Sets remaining screen for the card component */}
					<View style={{ flex: 8 }}>
						{/* Centers content within */}
						<View
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							
							{/* Styles card */}
							<Card>
								{/* Hidden view for status update */}
								{statusContainerChange && (
									<View
										style={{
											position: 'absolute',
											zIndex: 1000,
											width: '80%',
										}}
									>
										{/* View with border to containt status buttons */}
										<View style={styles.statusUpdateContainer}>
											{/* Closes View */}
											<TouchableOpacity
												style={{ paddingBottom: 10 }}
												onPress={() => {
													setstatusContainerChange(false);
												}}
											>
												<MaterialCommunityIcons
													name={'close-circle'}
													size={30}
													color={'#000'}
												/>
											</TouchableOpacity>

											{/* Lists the status buttons to be pressed */}
											{list.map((v, i) => {
												return (
													// Status change button
													<TouchableOpacity
														onPress={() => {
															updateStatus(i, ticket, setticket);
															setstatusContainerChange(false);
														}}
														key={i}
														style={{
															borderColor: 'black',
															width: '100%',
															borderWidth: 1,
															borderRadius: 20,
															paddingTop: 5,
															paddingBottom: 5,
															backgroundColor: v.bgColor,
															marginBottom: i == list.length - 1 ? 0 : 20,
														}}
													>
														<Text
															style={{
																color: '#FFFFFF',
																fontSize: 20,
																textAlign: 'center',
															}}
														>
															{v.title}
														</Text>
													</TouchableOpacity>
												);
											})}
										</View>
									</View>
								)}

								{/* Sets scroll view for content in card */}
								<ScrollView style={{ width: '100%' }}>
									{/* Takes up whole card and styles content within */}
									<View style={styles.IconContainer}>
										{/* Styles Text content within */}
										<View style={styles.cardTextContainer}>
											<View>
												<Text style={styles.ticketText}>Customer Name:</Text>

												<Text style={styles.cardText}>
													{customerInfo.first_name} {customerInfo.last_name}
												</Text>
											</View>
											<View>
												<Text style={styles.ticketText}>Device:</Text>

												<TextInput style={styles.cardText}
												value = {ticket.device_type}></TextInput>
											</View>
											<View>
												<Text style={styles.ticketText}>Model Number:</Text>
												<Text style={styles.cardText}>{ticket.model_number}</Text>
											</View>
											<View>
												<Text style={styles.ticketText}>Serial Number:</Text>
												<Text style={styles.cardText}>{ticket.serial_number}</Text>
											</View>
											<View>
												<Text style={styles.ticketText}>Service:</Text>

												<Text style={styles.cardText}>{ticket.device_service}</Text>
											</View>
											<View>
												<Text style={styles.ticketText}>Drop-off Date:</Text>
												<Text style={styles.cardText}>{ticket.date_booked}</Text>										
											</View>
											<View>
												<Text style={styles.ticketText}>Time Booked:</Text>
												
												<Text style={styles.cardText}>{ticket.time_booked}</Text>
											</View>
											{ticket.status == 'Completed' ||
											ticket.status == 'Closed' ||
											ticket.status == 'Cancelled' ? (
												<View>
													<Text style={styles.ticketText}>Date Completed:</Text>

													<Text style={styles.cardText}>{ticket.date_completed}</Text>
												</View>
											) : null}
											{ticket.status == 'Completed' ||
											ticket.status == 'Closed' ||
											ticket.status == 'Cancelled' ? (
												<View>
													<Text style={styles.ticketText}>Pick-up Date:</Text>

													<Text style={styles.cardText}>{ticket.pickup_date}</Text>
												</View>
											) : null}
											{ticket.status == 'Completed' ||
											ticket.status == 'Closed' ||
											ticket.status == 'Cancelled' ? (
												<View>
													<Text style={styles.ticketText}>Time Booked:</Text>

													<Text style={styles.cardText}>{ticket.pickup_time}</Text>
												</View>
											) : null}
											{ticket.status == 'Completed' ||
											ticket.status == 'Closed' ||
											ticket.status == 'Cancelled' ||
											ticket.status == 'In Progress' ? (
												<View>
													<Text style={styles.ticketText}>Problem:</Text>

													<Text style={styles.cardText}>{ticket.problem}</Text>
												</View>
											) : null}
											{ticket.status == 'Completed' ||
											ticket.status == 'Closed' ||
											ticket.status == 'Cancelled' ||
											ticket.status == 'In Progress' ? (
												<View>
													<Text style={styles.ticketText}>Cost:</Text>

													<Text style={styles.cardText}>{ticket.cost}</Text>
												</View>
											) : null}
											{ticket.status == 'In Progress' ? (
												<View>
													<Text style={styles.ticketText}>Estimated Completion Date:</Text>

													<Text style={styles.cardText}>{ticket.estimated_completion}</Text>
												</View>
											) : null}
											{ticket.status == 'Completed' ||
											ticket.status == 'Closed' ||
											ticket.status == 'Cancelled' ||
											ticket.status == 'In Progress' ? (
												<View>
													<Text style={styles.ticketText}>Job Request Response:</Text>

													<Text style={styles.cardText}>{ticket.job_request_response}</Text>
												</View>
											) : null}
											<View>
												<Text style={styles.ticketText}>Store Location:</Text>

												<Text style={styles.cardText}>{ticket.store_location}</Text>
											</View>
											<View style={styles.ticketItemRow}>
												<Text style={styles.ticketText}>Status:</Text>
												<TouchableOpacity
													style={styles.cardStatusbutton}
													onPress={() => setstatusContainerChange(true)}
												>
													{ticket.status == 'Pending' ? (
														<View style={styles.statusTextContainerPending}>
															<Text style={styles.statusText}>{ticket.status}</Text>
														</View>
													) : ticket.status == 'In Progress' ? (
														<View style={styles.statusTextContainerProgress}>
															<Text style={styles.statusText}>{ticket.status}</Text>
														</View>
													) : ticket.status == 'Complete' ? (
														<View style={styles.statusTextContainerComplete}>
															<Text style={styles.statusText}>{ticket.status}</Text>
														</View>
													) : ticket.status == 'Closed' ? (
														<View style={styles.statusTextContainerClosed}>
															<Text style={styles.statusText}>{ticket.status}</Text>
														</View>
													) : ticket.status == 'Cancelled' ? (
														<View style={styles.statusTextContainerCancelled}>
															<Text style={styles.statusText}>{ticket.status}</Text>
														</View>
													) : null}
												</TouchableOpacity>
											</View>
												<TouchableOpacity
													style={styles.cardbuttonJobRequest}
													onPress={() =>
														navigation.navigate('TechJobRequestScreen', { ticket })}
												>
													<Text style={styles.text}>Edit Job Request</Text>
												</TouchableOpacity>

										</View>
									</View>
								</ScrollView>
							</Card>
						</View>
					</View>
				</View>
			</SafeAreaView>
		</View>
	);
};

// Updates status based on what status button was pressed
const updateStatus = (i, ticket, setticket) => {
	let currentDate = new Date();
	let currentDateFormat = moment(currentDate).format('DD-MM-YYYY');
	if (i == 0) {
		ticket.status = 'Pending';
		currentDateFormat = '';
	} else if (i == 1) {
		ticket.status = 'In Progress';
		currentDateFormat = '';
	} else if (i == 2) {
		ticket.status = 'Cancelled';
	} else if (i == 3) {
		ticket.status = 'Complete';
	} else if (i == 4) {
		ticket.status = 'Closed';
	}
	setticket(ticket);

	fetch(global.API_DIRECTORY + global.UPDATE_STATUS, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		// The JSON body is parsed with variables declared in registration.php
		body: JSON.stringify({
			booking_id: ticket.booking_id,
			technician_id: global.account['user_id'],
			date_completed: currentDateFormat,
			status: ticket.status,
		}),
		// Convert the response to json
	})
		.then((response) => response.json())
		.then((responseJSON) => {
			if (responseJSON == true) {
			} else {
				Alert.alert('Notice', 'Error: Status was unable to be edited at this time.', [ { text: 'Ok' } ]);
			}
		})
		.catch((e) => {
			console.log('oh no :(', e);
		});
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 0,
	},
	cardTextContainer: {
		flex: 1,
		width: '95%',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
	},
	cardStatusbutton: {
		flex: 1,
		borderRadius: 20,
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	cardbuttonCancel: {
		width: '90%',
		height: 60,
		borderRadius: 20,
		backgroundColor: '#DB5A27',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	cardbuttonJobRequest: {
		width: '90%',
		height: 60,
		borderRadius: 20,
		backgroundColor: '#8000FF',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	cardbuttonBookPickup: {
		width: '90%',
		height: 60,
		borderRadius: 20,
		backgroundColor: '#0072C6',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	cardText: {
		margin: 5,
		fontSize: 18,
	},
	IconButton: {
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
	IconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
	statusText: {
		margin: 5,
		fontSize: 20,
		color: '#fff',
	},
	ticketText: {
		margin: 5,
		fontSize: 20,
		fontWeight: 'bold',
	},
	ticketItemRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	statusUpdateContainer: {
		backgroundColor: '#FFF',
		borderRadius: 20,
		borderStyle: 'solid',
		borderWidth: 2,
		padding: 20,
	},
	statusTextContainerPending: {
		width: '100%',
		height: 40,
		borderRadius: 20,
		backgroundColor: '#47B7D8',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	statusTextContainerProgress: {
		width: '100%',
		height: 40,
		borderRadius: 20,
		backgroundColor: '#EFA81F',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	statusTextContainerComplete: {
		width: '100%',
		height: 40,
		borderRadius: 20,
		backgroundColor: '#80B942',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	statusTextContainerCancelled: {
		width: '100%',
		height: 40,
		borderRadius: 20,
		backgroundColor: '#DB5A27',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	statusTextContainerClosed: {
		width: '100%',
		height: 40,
		borderRadius: 20,
		backgroundColor: '#CCCCCC',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	text: {
		color: '#fff',
		fontSize: 20,
	},
});

export default TechExpandedTicketScreen;
