import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, TouchableOpacity, Image, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../shared/contactUsCard';

const ContactUsScreen = ({ navigation }) => {
	return (
		// View set to entire screen
		<View style={{ flex: 1 }}>
			{/* // SafeAreaView accounts for notch on iOS devices */}
			<SafeAreaView style={styles.container}>
				{/* Title */}
				<View style={styles.title}>
					<Text style={{ fontWeight: 'bold', fontSize: 30 }}>Contact Us</Text>
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
						{/* Phone Row*/}
						<TouchableOpacity
							style={{
								width: '100%',
								height: 90,
								alignItems: 'center',
								justifyContent: 'center',
							}}
							onPress={() => {
								Linking.openURL(`tel:${'0406868891'}`);
							}}
						>
							<View style={styles.clickableRow}>
								<View style={styles.rowIcon}>
									<MaterialCommunityIcons
										style={{ marginRight: '20%' }}
										name={'cellphone-arrow-down'}
										size={50}
										color={'#0072C6'}
									/>
								</View>

								<View style={styles.rowText}>
									<Text style={styles.textDecoration}>Contact Number:</Text>
									<Text style={{ fontSize: 20 }}>0406868891</Text>
								</View>
							</View>
						</TouchableOpacity>
					</Card>

					<Card>
						{/* Email Row */}
						<TouchableOpacity
							style={{
								width: '100%',
								height: 90,
								alignItems: 'center',
								justifyContent: 'center',
							}}
							onPress={() => {
								Linking.openURL(`mailto:service.lutronic@outlook.com`);
							}}
						>
							<View style={styles.clickableRow}>
								<View style={styles.rowIcon}>
									<MaterialCommunityIcons
										style={{ marginRight: '20%' }}
										name={'email-send'}
										size={50}
										color={'#434343'}
									/>
								</View>

								<View style={styles.rowText}>
									<Text style={styles.textDecoration}>Email:</Text>
									<Text style={{ fontSize: 15 }}>service.luxtronic@outlook.com</Text>
								</View>
							</View>
						</TouchableOpacity>
					</Card>

					<Card>
						{/* Map Row */}
						<TouchableOpacity
							style={{
								width: '100%',
								height: 90,
								alignItems: 'center',
								justifyContent: 'center',
							}}
							onPress={() => handlePress()}
						>
							<View style={styles.clickableRow}>
								<View style={styles.rowIcon}>
									<MaterialCommunityIcons
										style={{ marginRight: '20%' }}
										name={'map-marker'}
										size={50}
										color={'#DB5A27'}
									/>
								</View>

								<View style={styles.rowText}>
									<Text style={styles.textDecoration}>Capitol Square, Haymarket</Text>
									<Text style={{ fontSize: 15, color: 'grey' }}>
										Monday - Friday, 9:00am - 5:00pm
									</Text>
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

const handlePress = () => {
	Platform.OS === 'android'
		? Linking.openURL('google.navigation:q=-33.879460+151.205430')
		: Linking.openURL('maps://app?saddr=100+101&daddr=-33.879460+151.205430');
};

const styles = StyleSheet.create({
	// This is to account for android status bar height, otherwise padding is set to 0.
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	scrollView: {
		flexGrow: 1,
		marginVertical: '20%',
		marginStart: '10%',
	},
	MenuIcon: {
		width: '50%',
		height: '100%',
		resizeMode: 'contain',
	},
	MenuButton: {
		borderRadius: 0,
	},
	clickableRow: {
		flex: 1,
		flexDirection: 'row', // main axis = horizontal (if row)
		justifyContent: 'center', // main axis (horizontal) //this doin nothin yo
		alignItems: 'center', //secondary axis (vertical)
	},
	rowIcon: {
		flex: 1,
		alignItems: 'center', //aligns on horizontal axis
	},
	rowText: {
		flex: 4,
		alignItems: 'flex-start',
	},
	textDecoration: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	title: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 0.2,
	},
});

export default ContactUsScreen;
