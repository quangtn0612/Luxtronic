import React from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Linking, Text, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../shared/mainmenuCard';
import SmallCard from '../screens/SmallCard'; 

const MainMenuScreen = ({ navigation }) => {
	return (
		<View style={{ flex: 1 }}>
			<SafeAreaView style={styles.background}>
				<ScrollView>
					<View
						style={{
							width: '100%',
							flex: 5,
							marginTop: '2%',
							flexDirection: 'row'
						}}
					>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								height: 30,
								width: '100%',
								maxWidth: '100%',
								marginBottom: 10,
								marginTop: 10
							}}
						>
							<Text style={styles.secondLabel}>Kind of services that are provided:</Text>
						</View>
					</View>

					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							border: 'solid',
							borderRadius: 15,
							color: '#dedada'
						}}
					>
						<Card>
							<View style={{}}>
								<MaterialCommunityIcons
									name={'room-service'}
									size={100}
									color={'#EFA81F'}
									style={{ marginLeft: 25 }}
								/>
								<TouchableOpacity
									style={styles.IconButton}
									onPress={() => {
										navigation.navigate('ServiceListScreen');
									}}
								>
									<Text style={styles.IconText}>Our Services</Text>
								</TouchableOpacity>
							</View>
						</Card>
					</View>
					
					{/* Second Card*/}

					<View
						style={{
							width: '100%',
							flex: 5,
							marginTop: '2%',
							flexDirection: 'row'
						}}
					>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								height: 30,
								width: '100%',
								marginBottom: 10,
								marginTop: 10
							}}
						>
							<Text style={styles.secondLabel}>Need some technical assistance?</Text>
						</View>
					</View>

					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							border: 'solid',
							borderRadius: 15,
							color: '#dedada'
						}}
					>
						<Card>
							<View>
								<MaterialCommunityIcons
									name={'book'}
									size={100}
									color={'#DB5A27'}
									style={{
										marginLeft: 35
									}}
								/>
								<TouchableOpacity
									style={styles.IconButton}
									onPress={() => {
										navigation.navigate('CreateBookingScreen');
									}}
								>
									<Text style={styles.IconText}>Book a Services</Text>
								</TouchableOpacity>
							</View>
						</Card>
					</View>

					{/* Third Card*/}

					<View
						style={{
							width: '100%',
							flex: 5,
							marginTop: '2%',
							flexDirection: 'row'
						}}
					>
						<View
							style={{
								alignItems: 'center',
								justifyContent: 'center',
								height: 30,
								width: '100%',
								marginBottom: 10
							}}
						>
							<Text style={styles.secondLabel}>Need to view your booking?</Text>
						</View>
					</View>

					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
							border: 'solid',
							borderRadius: 15,
							color: '#dedada'
						}}
					>
						<Card>
							<View>
								<MaterialCommunityIcons name={'book-multiple'} size={100} color={'#80B942'} style={{
										marginLeft: 16
									}}/>
								<TouchableOpacity
									style={styles.IconButton}
									onPress={() => {
										navigation.navigate('BookingsScreen');
									}}
								>
									<Text style={{ ...styles.IconText, marginLeft: 0 }}>Bookings</Text>
								</TouchableOpacity>
							</View>
						</Card>
					</View>

					<View style={{ flex: 1 }} />
					<View style={{ flex: 1 }} />

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							width: '100%',
							border: 'solid',
							color: 'red',
							height: 10,
							borderColor: 'orange',
							borderBottomWidth: 3,
							borderBottomColor: 'orange'
						}}
					/>

					{/* Fourth Card*/}

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'center',
							flex: 1
						}}
					>
						<SmallCard>
							<View style={styles.cardContainer}>
								<View style={styles.IconContainer}>
									<MaterialCommunityIcons
										name={'contacts'}
										size={50}
										color={'#65BEAC'}
										style={{
											marginLeft: 40,
											height: 60,
											marginTop: -30
										}}
									/>
									<TouchableOpacity
										style={styles.IconButton}
										onPress={() => {
											navigation.navigate('ContactUsScreen');
										}}
									>
										<Text style={{ ...styles.IconText, padding: 1, marginTop: 2, zIndex: 1000 }}>
											Contact Us
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</SmallCard>

						{/* Fifth Card*/}

						<SmallCard>
							<View style={styles.cardContainer}>
								<MaterialCommunityIcons name={'file-document'} size={60} color={'#CCCCCC'} />
								<View style={styles.IconContainer}>
									<TouchableOpacity
										style={styles.IconButton}
										onPress={() => {
											Linking.openURL(
												'https://luxtronic.com.au/legal-stuff/terms-of-condition-1/'
											);
										}}
									>
										<Text style={{ ...styles.IconText, padding: 1 }}>Term and Conditions</Text>
										<Text style={styles.IconText} />
									</TouchableOpacity>
								</View>
							</View>
						</SmallCard>
					</View>

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
		justifyContent: 'center'
	},
	cardContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 80,
		width: '100%',
		marginHorizontal: 10,
		marginVertical: 10,
		marginTop: 30
	},
	secondLabel: {
		fontSize: 20,
		marginTop: 10,
		marginBottom: -10
	},
	IconButton: {
		alignItems: 'center',
		justifyContent: 'center',
		border: 'none',
		width: '100%',
		height: 40,
		padding: 10,
		marginTop: -15,
		marginBottom: 10,
		marginLeft: 15
	},
	labelText: {
		color: 'blue',
		fontSize: 20
	},
	IconContainer: {
		marginTop: 10
	},
	IconText: {
		fontWeight: 'bold',
		fontSize: 14,
		marginTop: 0,
		border: 'none'
	},
	vCenter: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	labelStyle: {
		maxHeight: 30
	}
});

export default MainMenuScreen;
