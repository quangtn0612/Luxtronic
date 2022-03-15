/* 
REGISTERSCREEN.JS

Navigation:     -> WelcomeScreen.js : userLogin() -> RegisterScreen.js
Description:    User inputs necessary fields with specified data.
                Data is validated.
                Data is inserted into database.
                User is navigated back to WelcomeScreen.js on successful registration
*/

import React from 'react';
import {
	StyleSheet,
	Text,
	ScrollView,
	KeyboardAvoidingView,
	View,
	Image,
	SafeAreaView,
	Platform,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AppTextInput from '../components/AppTextInput';

const RegisterScreen = ({ navigation }) => {
	/* Local data input from text input boxes */
	const [ user_first_name, setFirstName ] = React.useState('');
	const [ user_last_name, setLastName ] = React.useState('');
	const [ user_email, setEmail ] = React.useState('');
	const [ user_password, setPassword ] = React.useState('');
	const [ temp_password, setTempPassword ] = React.useState('');
	const [ user_phone_number, setPhoneNumber ] = React.useState('');

	/* Validation functions */
	const [ valid_first_name, setValidFirstName ] = React.useState(true);
	const [ valid_last_name, setValidLastName ] = React.useState(true);
	const [ valid_email, setValidEmail ] = React.useState(true);
	const [ valid_password, setValidPassword ] = React.useState(true);
	const [ valid_phone_number, setValidPhoneNumber ] = React.useState(true);
	let passwordMatch = true;

	// Sets icon based on device OS
	const BackIcon = Platform.OS === 'ios' ? 'arrow-back-ios' : 'arrow-back';

	// Function to open the draw
	const Back = () => {
		navigation.goBack();
	};

	return (
		// Sets flex to 1 taking up the entire screen
		<View style={{ flex: 1 }}>
			{/* Sets the view to be able to have a keyboard support without covering content */}
			<KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				{/* Sets the view within to be scrollable when content is off the screen */}
				<ScrollView contentContainerStyle={{ flex: 1 }} bounces={false}>
					{/* Sets to the remaining usable screen space */}
					<SafeAreaView style={styles.background}>
						{/* Sets flex style to row to list content within ontop of each other */}
						<View
							style={{
								backgroundColor: '#fff',
								width: '100%',
								flex: 3,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{/* Sets section of screen for the Back button */}
							<View
								style={{
									flex: 1,
									width: '100%',
								}}
							>
								{/* icon for the Back Button*/}
								<MaterialIcons name={BackIcon} size={50} onPress={Back} style={styles.icon} />
							</View>
						</View>

						{/* Devides remaining screen area for Logo */}
						<View
							style={{
								width: '100%',
								flex: 8,
							}}
						>
							{/* Sets style for Logo */}
							<View style={styles.vCenter}>
								<Image style={styles.logo} source={require('../assets/Luxtronic_Logo2.png')} />
							</View>
						</View>

						{/* Divides remaining screen area for text input content */}
						<View
							style={{
								width: '100%',
								flex: 28,
							}}
						>
							{/* Sets area within remaining screen to be scrollable */}
							<ScrollView bounces={false}>
								<View style={styles.vCenter}>
									<AppTextInput
										icon={'account'}
										placeholder="First Name"
										onChangeText={(user_first_name) => setFirstName(user_first_name)}
										onEndEditing={() =>
											validateName(user_first_name)
												? setValidFirstName(true)
												: setValidFirstName(false)}
									/>
									{valid_first_name ? null : (
										<Text style={styles.invalidIput}>
											*Invalid, letters, hyphens and apostrophes only.
										</Text>
									)}

									{/* Last name text input box */}
									<AppTextInput
										icon={'account'}
										placeholder="Last Name"
										onChangeText={(user_last_name) => setLastName(user_last_name)}
										onEndEditing={() =>
											validateName(user_last_name)
												? setValidLastName(true)
												: setValidLastName(false)}
									/>
									{valid_last_name ? null : (
										<Text style={styles.invalidIput}>
											*Invalid, letters, hyphens and apostrophes only.
										</Text>
									)}

									{/* Email text input box */}
									<AppTextInput
										icon={'email'}
										placeholder="Email"
										keyboardType="email-address"
										onChangeText={(user_email) => setEmail(user_email)}
										onEndEditing={() =>
											validateEmail(user_email) ? setValidEmail(true) : setValidEmail(false)}
									/>
									{valid_email ? null : (
										<Text style={styles.invalidIput}>*Invalid email address.</Text>
									)}

									{/* Password text input box */}
									<AppTextInput
										icon={'lock'}
										secureTextEntry={true}
										placeholder="Password"
										onChangeText={(user_password) => setPassword(user_password)}
										onEndEditing={() =>
											validatePassword(user_password)
												? setValidPassword(true)
												: setValidPassword(false)}
									/>
									{valid_password ? null : <Text style={styles.invalidIput}>*Invalid password.</Text>}

									{/* Confirm password text input box */}
									<AppTextInput
										icon={'lock'}
										secureTextEntry={true}
										placeholder="Confirm Password"
										onChangeText={(tempPassword) => setTempPassword(tempPassword)}
										onEndEditing={() =>
											temp_password === user_password
												? (passwordMatch = true)
												: (passwordMatch = false)}
									/>
									{passwordMatch ? null : (
										<Text style={styles.invalidIput}>*Passwords do not match.</Text>
									)}

									{/* Phone number text input box */}
									<AppTextInput
										icon={'cellphone'}
										placeholder="Contact Number"
										onChangeText={(user_phone_number) => setPhoneNumber(user_phone_number)}
										onEndEditing={() =>
											validatePhone(user_phone_number)
												? setValidPhoneNumber(true)
												: setValidPhoneNumber(false)}
									/>
									{valid_phone_number ? null : (
										<Text style={styles.invalidIput}>
											*Invalid phone number. Must start with '04'
										</Text>
									)}

									{/* 'Register' button */}
									<TouchableOpacity
										style={styles.button}
										onPress={() =>
											valid_first_name
												? valid_last_name
													? valid_email
														? valid_password
															? valid_phone_number
																? userRegister(
																		user_first_name,
																		user_last_name,
																		user_email,
																		user_password,
																		user_phone_number,
																		navigation
																	)
																: invalidAttempt()
															: invalidAttempt()
														: invalidAttempt()
													: invalidAttempt()
												: invalidAttempt()}
									>
										<Text style={styles.text}>Register</Text>
									</TouchableOpacity>
								</View>
							</ScrollView>
						</View>
					</SafeAreaView>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
};

/* Function to access database and attempt to insert the textinput fields passed through
    f  = user_first_name
    l  = user_last_name
    e  = user_email
    pw = user_password
    pn = user_phone_numebr
*/
const userRegister = (f, l, e, pw, pn, navigation) => {
	// Checks if there is data in the input fields
	f.length !== 0
		? l.length !== 0
			? e.length !== 0
				? pw.length !== 0
					? pn.length !== 0
						? // Fetch is an API call that retrieves PHP data from registration.php
							fetch(global.API_DIRECTORY + global.REGISTRATION, {
								method: 'POST',
								headers: {
									Accept: 'application/json, text/plain',
									'Content-Type': 'application/json',
								},
								// The JSON body is parsed with variables declared in registration.php
								body: JSON.stringify({
									first_name: f,
									last_name: l,
									email: e,
									password: pw,
									phone_number: pn,
								}),
								// Convert the response to text
							})
								.then((response) => response.json())
								.then((responseData) => {
									// This is where we use the received data
									Alert.alert('Notice', responseData, [
										{
											text: 'Ok',
											onPress: () => navigation.navigate('WelcomeScreen'),
										},
									]);
								})
								.catch((e) => {
									console.log('Error registering:\n', e);
								})
						: alertEmptyFields()
					: alertEmptyFields()
				: alertEmptyFields()
			: alertEmptyFields()
		: alertEmptyFields();
};

// Custom invalid credentials alert
const invalidAttempt = () => {
	Alert.alert('Invalid Input', 'Some data has invalid input, please correct this before registrating', [
		{
			text: 'Try again',
			style: 'cancel',
		},
	]);
};

// Data fields are empty
const alertEmptyFields = () => {
	Alert.alert('Fields are Empty', 'Some data has no information, please fill out the required text boxes.', [
		{
			text: 'Try again',
			style: 'cancel',
		},
	]);
};

// Validation Functions ----------------------------------------------------------------------------
const validateName = (n) => {
	const re = /^[A-Za-z-']{1,30}$/;
	return n.length !== 0 ? re.test(n) : false;
};

const validateEmail = (e) => {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return e.length !== 0 ? re.test(e) : false;
};

const validatePassword = (p) => {
	const re = /^[A-Za-z0-9"!@#$%^&*()"]{6,25}$/;
	return p.length !== 0 ? re.test(p) : false;
};

const validatePhone = (pn) => {
	const re = /^[0][4][0-9]{8}$/;
	return pn.length !== 0 ? re.test(pn) : false;
};

// Style Sheet --------------------------------------------------------------------------------------
const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		width: '80%',
		height: 60,
		borderRadius: 20,
		backgroundColor: '#EFA81F',
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		position: 'absolute',
		left: 16,
	},
	input: {
		width: '80%',
		height: 60,
		margin: 12,
		borderWidth: 2,
		borderRadius: 20,
		borderColor: '#EFA81F',
		padding: 10,
	},
	logo: {
		width: '100%',
		height: '100%',
		resizeMode: 'contain',
	},
	text: {
		color: '#fff',
		fontSize: 20,
	},
	vCenter: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
});

export default RegisterScreen;
