import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, ScrollView } from 'react-native';
import JobRequestTextInput from '../components/JobRequestMultiInput';

const JobRequestScreen = ({ navigation }) => {
	const [ ticket, setticket ] = React.useState(navigation.getParam('item'));
	const [ jobRequestResponse, setjobRequestResponse ] = React.useState('');

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
							<Text
								style={{
									fontSize: 30,
									fontWeight: 'bold',
									marginBottom: 20,
								}}
							>
								Job Request
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
									multiline={true}
									numberOfLines={7}
									defaultValue={ticket.problem}
									underlineColorAndroid="transparent"
									height={240}
									require={true}
									maxLength={240}
									editable={false}
								/>
								<Text style={styles.textLabel}>Cost:</Text>
								<JobRequestTextInput
									style={styles.postInput}
									defaultValue={ticket.cost}
									underlineColorAndroid="transparent"
									require={true}
									maxLength={240}
									editable={false}
								/>
								<Text style={styles.textLabel}>Estimated Completion Date:</Text>
								<JobRequestTextInput
									style={styles.postInput}
									defaultValue={ticket.estimated_completion}
									underlineColorAndroid="transparent"
									require={true}
									maxLength={240}
									editable={false}
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
									onPress={() => acceptJobRequest(ticket, jobRequestResponse, navigation)}
								>
									<Text style={styles.text}>Accept</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.statusTextContainerCancelled}
									onPress={() => declineJobRequest(ticket, jobRequestResponse, navigation)}
								>
									<Text style={styles.text}>Decline</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

const acceptJobRequest = (ticket, jobRequestResponse, navigation) => {
	jobRequestResponse = 'Accepted';
	updateJobRequest(ticket, jobRequestResponse, navigation);
};

const declineJobRequest = (ticket, jobRequestResponse, navigation) => {
	jobRequestResponse = 'Declined';
	updateJobRequest(ticket, jobRequestResponse, navigation);
};

const updateJobRequest = (ticket, jobRequestResponse, navigation) => {
	// Fetch is an API call that retrieves PHP data from registration.php
	fetch(global.API_DIRECTORY + global.JOB_REQUEST_RESPONSE, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		// The JSON body is parsed with variables declared in registration.php
		body: JSON.stringify({
			booking_id: ticket.booking_id,
			job_request_response: jobRequestResponse,
		}),
		// Convert the response to json
	})
		.then((response) => response.json())
		.then((responseJSON) => {
			if (responseJSON == true) {
				navigation.navigate('MainMenuScreen');
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

export default JobRequestScreen;
