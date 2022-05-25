import React, {useEffect}  from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Linking, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../shared/mainmenuCard';


const MainMenuScreen = ({ navigation }) => {


	return (
		// Setting View to full screen
		<View style={{ flex: 1 }}>
			{/* Setting usable screen area based on predefined settings from React Native */}
			<SafeAreaView style={styles.background}>
				{/* Scrollable View incase screen is too small */}
				<ScrollView>
					{/* Divides remaining screen space in half */}
					<View
						style={{
							width: '100%',
							flex: 5,
							marginTop: '10%',
						}}
					>
						{/* Sets flex style to row and centers content within */}
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								flex: 1,
							}}
						>
							<Card>
								<View style={styles.cardContainer}>
									{/* Sets flex to 1 to take up half of screen within this section */}
									<View style={styles.IconContainer}>
										<TouchableOpacity
											style={styles.IconButton}
											onPress={() => {
												navigation.navigate('CreateBookingScreen');
											}}
										>
											<MaterialCommunityIcons name={'book'} size={100} color={'#DB5A27'} />
											<Text style={styles.IconText}>Book a Service</Text>
											<Text style={styles.IconText} />
										</TouchableOpacity>
									</View>
								</View>
							</Card>

							<Card>
								<View style={styles.cardContainer}>
									{/* Sets flex to 1 to take up half of screen within this section */}
									<View style={styles.IconContainer}>
										<TouchableOpacity
											style={styles.IconButton}
											onPress={() => {
												navigation.navigate('BookingsScreen');
											}}
										>
											<MaterialCommunityIcons
												name={'book-multiple'}
												size={100}
												color={'#80B942'}
											/>
											<Text style={styles.IconText}>Bookings</Text>
											<Text style={styles.IconText} />
										</TouchableOpacity>
									</View>
								</View>
							</Card>
						</View>

						{/* Sets flex style to row and centers content within */}
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								flex: 1,
							}}
						>
							<Card>
								<View style={styles.cardContainer}>
									{/* Sets flex to 1 to take up half of screen within this section */}
									<View style={styles.IconContainer}>
										<TouchableOpacity
											style={styles.IconButton}
											onPress={() => {
												navigation.navigate('ContactUsScreen');
											}}
										>
											<MaterialCommunityIcons name={'contacts'} size={100} color={'#65BEAC'} />
											<Text style={styles.IconText}>Contact Us</Text>
											<Text style={styles.IconText} />
										</TouchableOpacity>
									</View>
								</View>
							</Card>

							<Card>
								<View style={styles.cardContainer}>
									{/* Sets flex to 1 to take up half of screen within this section */}
									<View style={styles.IconContainer}>
										<TouchableOpacity
											style={styles.IconButton}
											onPress={() => {
												Linking.openURL('https://luxtronic.com.au');
											}}
										>
											<MaterialCommunityIcons name={'web'} size={100} color={'#47B7D8'} />
											<Text style={styles.IconText}>Vist our website</Text>
											<Text style={styles.IconText} />
										</TouchableOpacity>
									</View>
								</View>
							</Card>
						</View>

						{/* Sets flex style to row and centers content within */}
						<View
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								flex: 1,
							}}
						>
							<Card>
								<View style={styles.cardContainer}>
									{/* Sets flex to 1 to take up half of screen within this section */}
									<View style={styles.IconContainer}>
										<TouchableOpacity
											style={styles.IconButton}
											onPress={() => {
												navigation.navigate('ServiceListScreen');
											}}
										>
											<MaterialCommunityIcons
												name={'room-service'}
												size={100}
												color={'#EFA81F'}
											/>
											<Text style={styles.IconText}>Our Services</Text>
											<Text style={styles.IconText} />
										</TouchableOpacity>
									</View>
								</View>
							</Card>

							<Card>
								<View style={styles.cardContainer}>
									{/* Sets flex to 1 to take up half of screen within this section */}
									<View style={styles.IconContainer}>
										<TouchableOpacity
											style={styles.IconButton}
											onPress={() => {
												Linking.openURL(
													'https://luxtronic.com.au/legal-stuff/terms-of-condition-1/'
												);
											}}
										>
											<MaterialCommunityIcons
												name={'file-document'}
												size={100}
												color={'#CCCCCC'}
											/>
											<Text style={styles.IconText}>Terms and</Text>
											<Text style={styles.IconText}>Conditions</Text>
										</TouchableOpacity>
									</View>
								</View>
							</Card>
						</View>
					</View>
					{/* Sets remaining screen to blank */}
					<View style={{ flex: 1 }} />
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};


const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 140,
		width: '100%',
		marginHorizontal: 18,
		marginVertical: 18,
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
		borderColor: 'rgb(134,134,134)',
		borderStyle: 'solid',
		width: '95%',
		height: '95%',
	},
	IconContainer: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	IconText: {
		fontWeight: 'bold',
		fontSize: 18,
	},
	vCenter: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
});

export default MainMenuScreen;
