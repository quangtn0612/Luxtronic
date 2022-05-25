import React from 'react';
import { StyleSheet, View, Image, SafeAreaView, TouchableOpacity, Text, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../shared/ticketsCard';


const TechMainMenuScreen = ({ navigation }) => {
	const [ bookingsList, setBookingList ] = React.useState([]);

	const [ bookingsType, setbookingsType ] = React.useState([ { type: 'Current' } ]);

	return (
		// Setting View to full screen
		<View style={{ flex: 1 }}>
			{/* Setting usable screen area based on predefined settings from React Native */}
			<SafeAreaView style={styles.background}>
				{/* Divides remaining screen space in half */}
				<View
					style={{
						width: '100%',
						flex: 1,
						marginTop: '20%',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Card>
						{/* Sets flex style to row and centers content within */}
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								height: 160,
							}}
						>
							{/* Sets flex to 1 to take up half of screen within this section */}
							<View style={styles.IconContainer}>
								<TouchableOpacity
									style={styles.IconButton}
									onPress={() => {
										(bookingsType.type = 'Current'),
											currentBookingPull(bookingsList, bookingsType, navigation);
									}}
								>
									<MaterialCommunityIcons name={'book-open'} size={100} color={'#EFA81F'} />
									<Text style={styles.IconText}>Current Bookings</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Card>

					<Card>
						{/* Sets flex style to row and centers content within */}
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								height: 160,
							}}
						>
							{/* Sets flex to 1 to take up half of screen within this section */}
							<View style={styles.IconContainer}>
								<TouchableOpacity
									style={styles.IconButton}
									onPress={() => {
										(bookingsType.type = 'Past'),
											pastBookingPull(bookingsList, bookingsType, navigation);
									}}
								>
									<MaterialCommunityIcons name={'book-open-outline'} size={100} color={'#797979'} />
									<Text style={styles.IconText}>Past Bookings</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Card>

					{<Card>
                            {// Sets flex style to row and centers content within 
                            <View style={{
                                flexDirection:"row",
                                alignItems:'center',
                                justifyContent:'center',
                                height: 160
                            }}>
                                { //Sets flex to 1 to take up half of screen within this section 
                                <View style={styles.IconContainer}>
                                    <TouchableOpacity
                                    style={styles.IconButton}
                                    onPress={() => {navigation.navigate('ScanQRCodeScreen');}}
                                    >
                                        <Image 
                                            style={styles.Icon}
                                            source={require("../assets/Luxtronic_QR_Code.png")}>
                                        </Image>
                                        <Text style={styles.IconText}>Scan QR Code</Text>
                                    </TouchableOpacity>
                                </View>
								}</View>
					}</Card>}
				</View>

				{/* Sets remaining screen to blank */}
				<View
					style={{
						backgroundColor: '#fff',
						width: '100%',
						flex: 0.3,
					}}
				/>
			</SafeAreaView>
		</View>
	);
};

const currentBookingPull = (bookingsList, bookingsType, navigation) => {
	fetch(global.API_DIRECTORY + global.TECH_CURRENT_BOOKINGS, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({}),
	})
		.then((response) => response.json())
		.then((responseJSON) => {
			if (responseJSON == false) {
				Alert.alert('Notice', "You don't have any current bookings.", [ { text: 'Ok' } ]);
			} else {
				bookingsList = responseJSON;
				navigation.navigate('TechTicketsScreen', {
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
	fetch(global.API_DIRECTORY + global.TECH_PAST_BOOKINGS, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({}),
	})
		.then((response) => response.json())
		.then((responseJSON) => {
			if (responseJSON == false) {
				Alert.alert('Notice', "You don't have any past bookings.", [ { text: 'Ok' } ]);
			} else {
				bookingsList = responseJSON;
				navigation.navigate('TechTicketsScreen', {
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
	background: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	Icon: {
		width: '80%',
		height: '80%',
		resizeMode: 'contain',
	},
	IconButton: {
		borderRadius: 25,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
	IconContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	IconText: {
		fontWeight: 'bold',
		fontSize: 20,
	},
	vCenter: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
});

export default TechMainMenuScreen;
