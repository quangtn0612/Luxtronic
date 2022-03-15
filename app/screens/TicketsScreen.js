import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Alert } from 'react-native';
import Card from '../shared/ticketsCard';
import moment from 'moment';

const TicketsScreen = ({ navigation }) => {
	return (
		// View set to entire screen
		<View style={{ flex: 1 }}>
			{/* // SafeAreaView accounts for notch on iOS devices */}
			<SafeAreaView style={styles.container}>
				<View style={{ flex: 1 }}>
					{/* Child view elements are ordered by columns */}
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Bookings</Text>
						<Text
							style={{
								fontSize: 20,
								color: 'grey',
								marginBottom: '5%',
							}}
						>
							{navigation.getParam('bookingsType').type} Bookings
						</Text>
					</View>

					{/* All List content in a view to manage flex spacing */}
					<View style={{ flex: 4 }}>
						<FlatList
							data={navigation.getParam('bookingsList')}
							renderItem={({ item }) => (
								<View
									style={{
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Card>
										<View style={styles.cardTextContainer}>
											<View>
												<Text style={styles.ticketText}>Device:</Text>

												<Text style={styles.cardText}>{item.device_type}</Text>
											</View>
											<View>
												<Text style={styles.ticketText}>Service:</Text>

												<Text style={styles.cardText}>{item.device_service}</Text>
											</View>
											<View>
												<Text style={styles.ticketText}>Drop-off Date:</Text>

												<Text style={styles.cardText}>{item.date_booked}</Text>
											</View>
											{item.status == 'Complete' ? (
												<View>
													<Text style={styles.ticketText}>Pick-up Date:</Text>

													<Text style={styles.cardText}>{item.pickup_date}</Text>
												</View>
											) : null}
											<View>
												<Text style={styles.ticketText}>Time Booked:</Text>

												{item.status == 'Complete' ? (
													<Text style={styles.cardText}>{item.pickup_time}</Text>
												) : (
													<Text style={styles.cardText}>{item.time_booked}</Text>
												)}
											</View>
											{item.status == 'Complete' ? (
												<View>
													<Text style={styles.ticketText}>Completion Date:</Text>

													<Text style={styles.cardText}>{item.date_completed}</Text>
												</View>
											) : null}
											<View style={styles.ticketItemRow}>
												<Text style={styles.ticketText}>Status:</Text>
												{item.status == 'Pending' ? (
													<View style={styles.statusTextContainerPending}>
														<Text style={styles.statusText}>{item.status}</Text>
													</View>
												) : item.status == 'In Progress' ? (
													<View style={styles.statusTextContainerProgress}>
														<Text style={styles.statusText}>{item.status}</Text>
													</View>
												) : item.status == 'Complete' ? (
													<View style={styles.statusTextContainerComplete}>
														<Text style={styles.statusText}>{item.status}</Text>
													</View>
												) : item.status == 'Closed' ? (
													<View style={styles.statusTextContainerClosed}>
														<Text style={styles.statusText}>{item.status}</Text>
													</View>
												) : item.status == 'Cancelled' ? (
													<View style={styles.statusTextContainerCancelled}>
														<Text style={styles.statusText}>{item.status}</Text>
													</View>
												) : null}
											</View>
										</View>
										{item.status == 'Pending' ? (
											<TouchableOpacity
												style={styles.cardbuttonCancel}
												onPress={() =>
													Alert.alert(
														'Notice',
														'Are you sure you want to cancel your booking?',
														[
															{ text: 'no' },
															{
																text: 'yes',
																onPress: () => cancelBooking(item, navigation),
															},
														]
													)}
											>
												<Text style={styles.text}>Cancel Booking</Text>
											</TouchableOpacity>
										) : item.status == 'In Progress' && item.job_request_response == '' ? (
											<TouchableOpacity
												style={styles.cardbuttonJobRequest}
												onPress={() => navigation.navigate('JobRequestScreen', { item })}
											>
												<Text style={styles.text}>Job Request</Text>
											</TouchableOpacity>
										) : item.status == 'Complete' ? (
											<TouchableOpacity
												style={styles.cardbuttonBookPickup}
												onPress={() => navigation.navigate('BookPickupScreen', { item })}
											>
												<Text style={styles.text}>Book Pick-up</Text>
											</TouchableOpacity>
										) : null}
									</Card>
								</View>
							)}
							keyExtractor={(item, index) => index.toString()}
						/>
					</View>
				</View>
			</SafeAreaView>
		</View>
	);
};

const cancelBooking = (item, navigation) => {
	let currentDate = new Date();
	let currentDateFormat = moment(currentDate).format('DD-MM-YYYY');
	// Fetch is an API call that retrieves PHP data from registration.php
	fetch(global.API_DIRECTORY + global.CANCEL_BOOKING, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		// The JSON body is parsed with variables declared in registration.php
		body: JSON.stringify({
			booking_id: item.booking_id,
			date_completed: currentDateFormat,
		}),
		// Convert the response to json
	})
		.then((response) => response.json())
		.then((responseJSON) => {
			if (responseJSON == true) {
				Alert.alert('Notice', 'Cancelled booking successfully.', [
					{
						text: 'Ok',
						onPress: () => navigation.navigate('BookingsScreen'),
					},
				]);
			} else {
				Alert.alert('Notice', 'Error: Booking was unable to be cancelled at this time.', [ { text: 'Ok' } ]);
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
		fontSize: 20,
	},
	ticketText: {
		margin: 5,
		fontSize: 20,
		fontWeight: 'bold',
	},
	statusText: {
		margin: 5,
		fontSize: 20,
	},
	ticketItemRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
	},
	statusTextContainerPending: {
		width: '40%',
		height: 40,
		borderRadius: 2,
		backgroundColor: '#47B7D8',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	statusTextContainerProgress: {
		width: '40%',
		height: 40,
		borderRadius: 2,
		backgroundColor: '#EFA81F',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	statusTextContainerComplete: {
		width: '40%',
		height: 40,
		borderRadius: 2,
		backgroundColor: '#80B942',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	statusTextContainerCancelled: {
		width: '40%',
		height: 40,
		borderRadius: 2,
		backgroundColor: '#DB5A27',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	statusTextContainerClosed: {
		width: '40%',
		height: 40,
		borderRadius: 2,
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

export default TicketsScreen;
