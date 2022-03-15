import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../shared/contactUsCard';

const ServiceListScreen = ({ navigation }) => {
	return (
		// View set to entire screen
		<View style={{ flex: 1 }}>
			{/* // SafeAreaView accounts for notch on iOS devices */}
			<SafeAreaView style={styles.container}>
				<ScrollView>
					{/* Title */}
					<View style={styles.title}>
						<Text style={{ fontWeight: 'bold', fontSize: 30 }}>Our Services</Text>
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
							{/* Windows Pc/laptop Row */}
							<View
								style={{
									width: '100%',
									height: 90,
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<View style={styles.clickableRow}>
									<View style={styles.rowIcon}>
										<MaterialCommunityIcons
											style={{ marginRight: '20%' }}
											name={'microsoft-windows'}
											size={50}
											color={'#EFA81F'}
										/>
									</View>

									<View style={styles.rowText}>
										<Text style={{ fontSize: 15 }}>Windows based Laptops/PC</Text>
										<Text
											style={{
												fontSize: 15,
												color: 'grey',
											}}
										>
											Software Installation / Data Backup / Dust or Fan Clean / Water Damage
											Rescue
										</Text>
									</View>
								</View>
							</View>
						</Card>

						<Card>
							{/* Apple devices Row */}
							<View
								style={{
									width: '100%',
									height: 90,
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<View style={styles.clickableRow}>
									<View style={styles.rowIcon}>
										<MaterialCommunityIcons
											style={{ marginRight: '20%' }}
											name={'apple'}
											size={50}
											color={'#EFA81F'}
										/>
									</View>

									<View style={styles.rowText}>
										<Text style={{ fontSize: 15 }}>
											Apple based Laptops/PC (iMac / MacBook / Mac Mini){' '}
										</Text>
										<Text
											style={{
												fontSize: 15,
												color: 'grey',
											}}
										>
											Software Installation / Data Backup / Dust or Fan Clean / Water Damage
											Rescue
										</Text>
									</View>
								</View>
							</View>
						</Card>

						<Card>
							{/* Data Recovery Row */}
							<View
								style={{
									width: '100%',
									height: 90,
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<View style={styles.clickableRow}>
									<View style={styles.rowIcon}>
										<MaterialCommunityIcons
											style={{ marginRight: '20%' }}
											name={'database-search'}
											size={50}
											color={'#EFA81F'}
										/>
									</View>

									<View style={styles.rowText}>
										<Text style={{ fontSize: 15 }}>Data Recovery</Text>
										<Text
											style={{
												fontSize: 15,
												color: 'grey',
											}}
										>
											For devices such as Hard Disk Drive / Solid State Drive / Memory Cards{' '}
										</Text>
									</View>
								</View>
							</View>
						</Card>

						<Card>
							{/* Internet Row */}
							<View
								style={{
									width: '100%',
									height: 90,
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<View style={styles.clickableRow}>
									<View style={styles.rowIcon}>
										<MaterialCommunityIcons
											style={{ marginRight: '20%' }}
											name={'email-newsletter'}
											size={50}
											color={'#EFA81F'}
										/>
									</View>

									<View style={styles.rowText}>
										<Text style={{ fontSize: 15 }}>Internet/ WiFi Configurations</Text>
										<Text
											style={{
												fontSize: 15,
												color: 'grey',
											}}
										>
											Email Account Setup / New PC Configurations
										</Text>
									</View>
								</View>
							</View>
						</Card>

						<Card>
							{/* Security Row */}
							<View
								style={{
									width: '100%',
									height: 90,
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<View style={styles.clickableRow}>
									<View style={styles.rowIcon}>
										<MaterialCommunityIcons
											style={{ marginRight: '20%' }}
											name={'security'}
											size={50}
											color={'#EFA81F'}
										/>
									</View>

									<View style={styles.rowText}>
										<Text style={{ fontSize: 15 }}>Privacy and Security issues</Text>
										<Text
											style={{
												fontSize: 15,
												color: 'grey',
											}}
										>
											Virus / Malware Removal
										</Text>
									</View>
								</View>
							</View>
						</Card>
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	// This is to account for android status bar height, otherwise padding is set to 0.
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	scrollView: {
		backgroundColor: 'pink',
		marginHorizontal: 20,
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
		fontSize: 22,
	},
	title: {
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10,
		flex: 0.2,
	},
});

export default ServiceListScreen;
