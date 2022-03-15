import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, ScrollView } from 'react-native';
import JobRequestTextInput from '../components/JobRequestMultiInput';
import moment from 'moment';

const TechJobRequestScreen = ({ navigation }) => {
	const [ ticket, setticket ] = React.useState(navigation.getParam('ticket'));
	const [ problem, setproblem ] = React.useState('');
	const [ cost, setcost ] = React.useState('');
	const [ estimatedCompletion, setestimatedCompletion ] = React.useState('');
	let currentDate = new Date();
	let currentDateFormat = moment(currentDate).format('DD-MM-YYYY');

	return (
		// View set to entire screen
		<View style={{ flex: 1 }}>
			<SafeAreaView style={styles.container}>
				<ScrollView>
					<View style={{ flex: 1 }}>
						<View
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Edit Job Request</Text>
							<Text
								style={{
									fontSize: 20,
									color: 'grey',
								}}
							>
								Ticket ID: {ticket.booking_id}
							</Text>
						</View>

						{/* All List content in a view to manage flex spacing */}
						<View style={{ flex: 8 }}>
							<View
								style={{
									flex: 1,
									paddingLeft: '5%',
									alignItems: 'flex-start',
									justifyContent: 'center',
								}}
							>
								<Text style={styles.textLabel}>Issue found:</Text>
								<JobRequestTextInput
									style={styles.postInput}
									onChangeText={(text) => setproblem({ ...problem, body: text })}
									multiline={true}
									numberOfLines={7}
									placeholder="Issue found"
									underlineColorAndroid="transparent"
									height={240}
									require={true}
									maxLength={240}
								/>
								<Text style={styles.textLabel}>Cost:</Text>
								<JobRequestTextInput
									style={styles.postInput}
									onChangeText={(cost) => setcost(cost)}
									placeholder="eg: $100.00"
									underlineColorAndroid="transparent"
									require={true}
									maxLength={240}
								/>
								<Text style={styles.textLabel}>Estimated Completion Date:</Text>
								<JobRequestTextInput
									style={styles.postInput}
									onChangeText={(estimatedCompletion) => setestimatedCompletion(estimatedCompletion)}
									placeholder={'eg: ' + currentDateFormat}
									underlineColorAndroid="transparent"
									require={true}
									maxLength={240}
								/>
							</View>
							<View
								style={{
									flex: 1,
									paddingLeft: '5%',
									paddingRight: '5%',
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<TouchableOpacity
									style={styles.statusTextContainerComplete}
									onPress={() =>
										updateJobRequest(ticket, problem, cost, estimatedCompletion, navigation)}
								>
									<Text style={styles.text}>Update</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.statusTextContainerCancelled}
									onPress={() => navigation.goBack()}
								>
									<Text style={styles.text}>Cancel Job</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

const updateJobRequest = (ticket, problem, cost, estimatedCompletion, navigation) => {
	// Fetch is an API call that retrieves PHP data from registration.php
	fetch(global.API_DIRECTORY + global.JOB_REQUEST, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		// The JSON body is parsed with variables declared in registration.php
		body: JSON.stringify({
			booking_id: ticket.booking_id,
			technician_id: global.account['user_id'],
			problem: problem.body,
			cost: cost,
			estimated_completion: estimatedCompletion,
		}),
		// Convert the response to json
	})
		.then((response) => response.json())
		.then((responseJSON) => {
			if (responseJSON == true) {
				Alert.alert('Notice', 'Updated Job Request successfully.', [
					{
						text: 'Ok',
						onPress: () => navigation.navigate('TechMainMenuScreen'),
					},
				]);
			} else {
				Alert.alert('Notice', 'Error: Job Request was unable to be updated at this time.', [ { text: 'Ok' } ]);
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
	postInput: {
		fontSize: 24,
		margin: 10,
	},
	statusTextContainerComplete: {
		width: '45%',
		height: 60,
		borderRadius: 20,
		backgroundColor: '#80B942',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	statusTextContainerCancelled: {
		width: '45%',
		height: 60,
		borderRadius: 20,
		backgroundColor: '#DB5A27',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	text: {
		color: '#fff',
		fontSize: 20,
	},
	textLabel: {
		fontSize: 20,
		fontWeight: 'bold',
	},
});

export default TechJobRequestScreen;
