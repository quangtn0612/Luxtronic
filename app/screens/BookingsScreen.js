import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../shared/contactUsCard';

const BookingsScreen = ({ navigation }) => {
	const [ bookingsList, setBookingList ] = React.useState([]);

	const [ bookingsType, setbookingsType ] = React.useState([ { type: 'Current' } ]);

	return (
		// View set to entire screen
		<View style={{ flex: 1 }}>
			{/* // SafeAreaView accounts for notch on iOS devices */}
			<SafeAreaView style={styles.container}>
				{/* Title */}
				<View
					style={{
						flex: 0.2,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Bookings</Text>
				</View>

				{/* All List content in a view to manage flex spacing */}
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Card>
						{/* Current Row*/}
						<TouchableOpacity
							style={{
								width: '100%',
								height: 160,
								alignItems: 'center',
								justifyContent: 'center',
							}}
							onPress={() => {
								(bookingsType.type = 'Current'),
									currentBookingPull(bookingsList, bookingsType, navigation);
							}}
						>
							<View style={styles.clickableRow}>
								<View style={styles.rowIcon}>
									<MaterialCommunityIcons name={'book-open'} size={100} color={'#EFA81F'} />
								</View>

								<View style={styles.rowText}>
									<Text style={styles.textDecoration}>Current Bookings</Text>
								</View>
							</View>
						</TouchableOpacity>
					</Card>

					<Card>
						{/* Past Row */}
						<TouchableOpacity
							style={{
								width: '100%',
								height: 160,
								alignItems: 'center',
								justifyContent: 'center',
							}}
							onPress={() => {
								(bookingsType.type = 'Past'), pastBookingPull(bookingsList, bookingsType, navigation);
							}}
						>
							<View style={styles.clickableRow}>
								<View style={styles.rowIcon}>
									<MaterialCommunityIcons name={'book-open-outline'} size={100} color={'#797979'} />
								</View>

								<View style={styles.rowText}>
									<Text style={styles.textDecoration}>Past Bookings</Text>
								</View>
							</View>
						</TouchableOpacity>
					</Card>
				</View>

				{/* spacing */}
				<View style={{ flex: 0.5 }} />
			</SafeAreaView>
		</View>
	);
};

const currentBookingPull = (bookingsList, bookingsType, navigation) => {
	fetch(global.API_DIRECTORY + global.CURRENT_BOOKINGS, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			user_id: global.account['user_id'],
		}),
	})
		.then((response) => response.json())
		.then((responseJSON) => {
			if (responseJSON == false) {
				Alert.alert('Notice', "You don't have any current bookings.", [ { text: 'Ok' } ]);
			} else {
				bookingsList = responseJSON;
				navigation.navigate('TicketsScreen', {
					bookingsList,
					bookingsType,
				});
			}
		})
		.catch((e) => {
			console.error('oh no :(', e);
		});
};

const pastBookingPull = (bookingsList, bookingsType, navigation) => {
	fetch(global.API_DIRECTORY + global.PAST_BOOKINGS, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			user_id: global.account['user_id'],
		}),
	})
		.then((response) => response.json())
		.then((responseJSON) => {
			if (responseJSON == false) {
				Alert.alert('Notice', "You don't have any past bookings.", [ { text: 'Ok' } ]);
			} else {
				bookingsList = responseJSON;
				navigation.navigate('TicketsScreen', {
					bookingsList,
					bookingsType,
				});
			}
		})
		.catch((e) => {
			console.error('oh no :(', e);
		});
};

const styles = StyleSheet.create({
	// This is to account for android status bar height, otherwise padding is set to 0.
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 20,
	},
	clickableRow: {
		flex: 1,
		justifyContent: 'center', // main axis (horizontal) //this doin nothin yo
		alignItems: 'center', //secondary axis (vertical)
	},
	rowIcon: {
		alignItems: 'center', //aligns on horizontal axis
		justifyContent: 'center',
	},
	rowText: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	textDecoration: {
		fontSize: 30,
	},
});

export default BookingsScreen;
