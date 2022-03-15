import React from 'react';
import {
	StyleSheet,
	View,
	Switch,
	Text,
	SafeAreaView,
	TouchableOpacity,
	FlatList,
	Alert,
	Linking,
	ScrollView,
} from 'react-native';
import * as Yup from 'yup';
import SubmitButton from '../components/SubmitButton';
import AppForm from '../components/AppForm';
import AppFormField from '../components/AppFormField';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import Card from '../shared/createBookingCard';

let timesBooked = [
	'11:00AM',
	'11:10AM',
	'11:20AM',
	'11:30AM',
	'11:40AM',
	'11:50AM',
	'12:00PM',
	'12:10PM',
	'12:20PM',
	'12:30PM',
	'12:40PM',
	'12:50PM',
	'1:00PM',
	'1:10PM',
	'1:20PM',
	'1:30PM',
	'1:40PM',
	'1:50PM',
	'2:00PM',
	'2:10PM',
	'2:20PM',
	'2:30PM',
	'2:40PM',
	'2:50PM',
	'3:00PM',
	'3:10PM',
	'3:20PM',
	'3:30PM',
	'3:40PM',
	'3:50PM',
	'4:00PM',
	'4:10PM',
	'4:20PM',
	'4:30PM',
];
let timesAvailable = [ false ];
let services = [ '', '', '', '', '', '' ];
let spaces = [ '', '', '', '', '' ];
let times = [
	'11:00AM',
	'11:10AM',
	'11:20AM',
	'11:30AM',
	'11:40AM',
	'11:50AM',
	'12:00PM',
	'12:10PM',
	'12:20PM',
	'12:30PM',
	'12:40PM',
	'12:50PM',
	'1:00PM',
	'1:10PM',
	'1:20PM',
	'1:30PM',
	'1:40PM',
	'1:50PM',
	'2:00PM',
	'2:10PM',
	'2:20PM',
	'2:30PM',
	'2:40PM',
	'2:50PM',
	'3:00PM',
	'3:10PM',
	'3:20PM',
	'3:30PM',
	'3:40PM',
	'3:50PM',
	'4:00PM',
	'4:10PM',
	'4:20PM',
	'4:30PM',
];

const CreateBookingScreen = ({ navigation }) => {
	// Sets variables
	const [ chosenDevice, setchosenDevice ] = React.useState(false);
	const [ chosenServices, setchosenServices ] = React.useState(false);
	const [ device, setdevice ] = React.useState('');
	const [ deviceData, setdeviceData ] = React.useState('');
	const [ dataBackup, setdataBackup ] = React.useState(false);
	const [ softwareInstallation, setSoftwareInstallation ] = React.useState(false);
	const [ virusMalwareRemoval, setVirusMalwareRemoval ] = React.useState(false);
	const [ dustFanClean, setDustFanClean ] = React.useState(false);
	const [ waterDamageRescue, setWaterDamageRescue ] = React.useState(false);
	const [ unknownIssue, setunknownIssue ] = React.useState(false);
	const [ bookingDate, setbookingDate ] = React.useState('');
	let bookingDateWT = '';
	const [ bookingDateWTRender, setbookingDateWTRender ] = React.useState('');
	const [ chosenDate, setchosenDate ] = React.useState(false);
	const [ chosenTime, setchosenTime ] = React.useState(false);
	const [ selectedTime, setselectedTime ] = React.useState(false);
	const [ stepTwo, setstepTwo ] = React.useState('checkbox-blank-circle-outline');
	const [ stepThree, setstepThree ] = React.useState('checkbox-blank-circle-outline');
	const [ stepFour, setstepFour ] = React.useState('checkbox-blank-circle-outline');
	const [ stepFive, setstepFive ] = React.useState('checkbox-blank-circle-outline');

	const [ isSelected, setSelection ] = React.useState(false);
	const [ checkBoxSelected, setcheckBoxSelected ] = React.useState('checkbox-blank-outline');
	const validationSchema = Yup.object().shape({
		name: Yup.string().max(240).required().label('Name'),
		number: Yup.string().max(240).required().label('Contact Number'),
		device: Yup.string().max(240).required().label('Device'),
		service: Yup.string().max(240).required().label('Service'),
	});

	return (
		// Setting View to full screen
		<View style={{ flex: 1 }}>
			{/* Setting usable screen area based on predefined settings from React Native */}
			<SafeAreaView style={styles.background}>
				<View
					style={{
						flex: 0.1,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<View
						style={{
							flex: 1,
							width: '80%',
							flexDirection: 'row',
						}}
					>
						{/* Progression bar to help users see what step they are up to */}
						<View style={styles.progressBarIcons}>
							{/* Step one icon */}
							<MaterialCommunityIcons name={'checkbox-marked-circle'} size={30} color={'#EFA81F'} />
						</View>
						<View style={styles.progressBarIcons}>
							{/* Step two icon */}
							<MaterialCommunityIcons name={stepTwo} size={30} color={'#EFA81F'} />
						</View>
						<View style={styles.progressBarIcons}>
							{/* Step three icon */}
							<MaterialCommunityIcons name={stepThree} size={30} color={'#EFA81F'} />
						</View>
						<View style={styles.progressBarIcons}>
							{/* Step four icon */}
							<MaterialCommunityIcons name={stepFour} size={30} color={'#EFA81F'} />
						</View>
						<View style={styles.progressBarIcons}>
							{/* Step five icon */}
							<MaterialCommunityIcons name={stepFive} size={30} color={'#EFA81F'} />
						</View>
					</View>
				</View>

				{/* Wrap whole usable screen in view flex 1 */}
				<View style={{ flex: 1 }}>
					{/* Step one (Screen one) of the create a booking screen */}
					{!chosenDevice ? (
						<View style={{ flex: 1 }}>
							{/* Child view elements are ordered by columns */}
							<View style={{ alignItems: 'center' }}>
								<Text style={{ fontSize: 30, fontWeight: 'bold' }}>Create a Booking</Text>
								<Text
									style={{
										fontSize: 20,
										color: 'grey',
										marginBottom: '5%',
									}}
								>
									Choose a Device
								</Text>
							</View>

							{/* Sets flex style to row and centers content within */}
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									flex: 3,
								}}
							>
								{/* Sets flex to 1 to take up half of screen within this section */}
								<View style={{ flex: 1 }}>
									<TouchableOpacity
										style={styles.IconButton}
										onPress={() => (
											setchosenDevice(true),
											setdevice('apple'),
											setdeviceData('Apple'),
											setstepTwo('checkbox-marked-circle')
										)}
									>
										<MaterialCommunityIcons name={'apple'} size={100} color={'#EFA81F'} />
										<Text style={styles.IconText}>Apple:</Text>
										<Text style={styles.IconText2}>Mac family</Text>
										<Text style={styles.IconText2}>Mac Books</Text>
									</TouchableOpacity>
								</View>

								{/* Sets flex to 1 to take up half of screen within this section */}
								<View style={{ flex: 1 }}>
									<TouchableOpacity
										style={styles.IconButton}
										onPress={() => (
											setchosenDevice(true),
											setdevice('microsoft-windows'),
											setdeviceData('Windows'),
											setstepTwo('checkbox-marked-circle')
										)}
									>
										<MaterialCommunityIcons
											name={'microsoft-windows'}
											size={100}
											color={'#EFA81F'}
										/>
										<Text style={styles.IconText}>Windows:</Text>
										<Text style={styles.IconText2}>PC</Text>
										<Text style={styles.IconText2}>Laptop</Text>
									</TouchableOpacity>
								</View>
							</View>
							{/* Sets flex style to row and centers content within */}
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									flex: 3,
								}}
							>
								{/* Sets flex to 1 to take up half of screen within this section */}
								<View style={{ flex: 1 }}>
									<TouchableOpacity
										style={styles.IconButton}
										onPress={() => (
											setchosenDevice(true),
											setdevice('file-plus'),
											setdeviceData('Data Recovery'),
											setstepTwo('checkbox-marked-circle')
										)}
									>
										<MaterialCommunityIcons
											name={'file-refresh-outline'}
											size={100}
											color={'#EFA81F'}
										/>
										<Text style={styles.IconText}>Data Recovery</Text>
										{/* Used to center image with apple */}
										<Text style={styles.IconText2} />
										<Text style={styles.IconText2} />
									</TouchableOpacity>
								</View>

								{/* Sets flex to 1 to take up half of screen within this section */}
								<View style={{ flex: 1 }}>
									<TouchableOpacity
										style={styles.IconButton}
										onPress={() => (
											setchosenDevice(true),
											setdevice('laptop'),
											setdeviceData('Other'),
											setstepTwo('checkbox-marked-circle')
										)}
									>
										<MaterialCommunityIcons name={'laptop'} size={100} color={'#EFA81F'} />
										<Text style={styles.IconText}>Other</Text>
										{/* Used to center image with apple */}
										<Text style={styles.IconText2} />
										<Text style={styles.IconText2}> </Text>
									</TouchableOpacity>
								</View>
							</View>

							<View
								style={{
									alignItems: 'center',
									justifyContent: 'flex-end',
									flex: 1,
								}}
							>
								<TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
									<Text style={styles.text}>Back</Text>
								</TouchableOpacity>
							</View>
						</View>
					) : null}

					{/* Step two (Screen two) of the create a booking screen */}
					{chosenDevice ? (
						<View
							style={{
								flex: 1,
							}}
						>
							{/* Hides screen when moving to next screen */}
							{!chosenServices ? (
								<View
									style={{
										flex: 1,
									}}
								>
									<View
										style={{
											flex: 1,
											alignItems: 'center',
										}}
									>
										<Text
											style={{
												fontSize: 30,
												fontWeight: 'bold',
											}}
										>
											Create a Booking
										</Text>
										<Text
											style={{
												fontSize: 20,
												color: 'grey',
												marginBottom: '5%',
											}}
										>
											Choose a Service
										</Text>
									</View>
									<View
										style={{
											flex: 6,
										}}
									>
										<ScrollView>
											<View style={styles.vCenter}>
												<MaterialCommunityIcons name={device} size={100} color={'#EFA81F'} />
											</View>

											<View
												style={{
													flex: 4,
													alignItems: 'center',
													justifyContent: 'center',
												}}
											>
												<View
													style={{
														flex: 1,
														width: '80%',
														alignItems: 'flex-start',
														justifyContent: 'flex-start',
													}}
												>
													<View style={styles.checkBoxContainer}>
														<Switch
															value={dataBackup}
															onValueChange={setdataBackup}
															style={{
																alignSelf: 'center',
																marginRight: 5,
															}}
															trackColor={{
																false: '#767577',
																true: '#EFA81F',
															}}
															thumbColor={dataBackup ? '#ffffff' : '#ffffff'}
														/>
														<TouchableOpacity onPress={() => setdataBackup(!dataBackup)}>
															<Text style={styles.IconText2}>Data Backup</Text>
														</TouchableOpacity>
													</View>
													<View style={styles.checkBoxContainer}>
														<Switch
															value={softwareInstallation}
															onValueChange={setSoftwareInstallation}
															style={{
																alignSelf: 'center',
																marginRight: 5,
															}}
															trackColor={{
																false: '#767577',
																true: '#EFA81F',
															}}
															thumbColor={softwareInstallation ? '#ffffff' : '#ffffff'}
														/>
														<TouchableOpacity
															onPress={() =>
																setSoftwareInstallation(!softwareInstallation)}
														>
															<Text style={styles.IconText2}>Software Installation</Text>
														</TouchableOpacity>
													</View>
													<View style={styles.checkBoxContainer}>
														<Switch
															value={virusMalwareRemoval}
															onValueChange={setVirusMalwareRemoval}
															style={{
																alignSelf: 'center',
																marginRight: 5,
															}}
															trackColor={{
																false: '#767577',
																true: '#EFA81F',
															}}
															thumbColor={virusMalwareRemoval ? '#ffffff' : '#ffffff'}
														/>
														<TouchableOpacity
															onPress={() => setVirusMalwareRemoval(!virusMalwareRemoval)}
														>
															<Text style={styles.IconText2}>
																Virus / Malware Removal
															</Text>
														</TouchableOpacity>
													</View>
													<View style={styles.checkBoxContainer}>
														<Switch
															value={dustFanClean}
															onValueChange={setDustFanClean}
															style={{
																alignSelf: 'center',
																marginRight: 5,
															}}
															trackColor={{
																false: '#767577',
																true: '#EFA81F',
															}}
															thumbColor={dustFanClean ? '#ffffff' : '#ffffff'}
														/>
														<TouchableOpacity
															onPress={() => setDustFanClean(!dustFanClean)}
														>
															<Text style={styles.IconText2}>Dust / Fan Clean</Text>
														</TouchableOpacity>
													</View>
													<View style={styles.checkBoxContainer}>
														<Switch
															value={waterDamageRescue}
															onValueChange={setWaterDamageRescue}
															style={{
																alignSelf: 'center',
																marginRight: 5,
															}}
															trackColor={{
																false: '#767577',
																true: '#EFA81F',
															}}
															thumbColor={waterDamageRescue ? '#ffffff' : '#ffffff'}
														/>
														<TouchableOpacity
															onPress={() => setWaterDamageRescue(!waterDamageRescue)}
														>
															<Text style={styles.IconText2}>Water Damage Rescue</Text>
														</TouchableOpacity>
													</View>
													<View style={styles.checkBoxContainer}>
														<Switch
															value={unknownIssue}
															onValueChange={setunknownIssue}
															style={{
																alignSelf: 'center',
																marginRight: 5,
															}}
															trackColor={{
																false: '#767577',
																true: '#EFA81F',
															}}
															thumbColor={unknownIssue ? '#ffffff' : '#ffffff'}
														/>
														<TouchableOpacity
															onPress={() => setunknownIssue(!unknownIssue)}
														>
															<Text style={styles.IconText2}>Unknown Issue</Text>
														</TouchableOpacity>
													</View>
												</View>
											</View>
											<View
												style={{
													alignItems: 'center',
													justifyContent: 'flex-end',
													flex: 1,
												}}
											>
												{dataBackup ||
												softwareInstallation ||
												virusMalwareRemoval ||
												dustFanClean ||
												waterDamageRescue ||
												unknownIssue ? (
													<TouchableOpacity
														style={styles.button}
														onPress={() => (
															setchosenServices(true),
															setstepThree('checkbox-marked-circle'),
															assignService(
																dataBackup,
																softwareInstallation,
																virusMalwareRemoval,
																dustFanClean,
																waterDamageRescue,
																unknownIssue
															)
														)}
													>
														<Text style={styles.text}>Book a Service</Text>
													</TouchableOpacity>
												) : null}
												<TouchableOpacity
													style={styles.button}
													onPress={() => (
														setchosenDevice(false),
														setdevice(''),
														setdeviceData(''),
														setstepTwo('checkbox-blank-circle-outline')
													)}
												>
													<Text style={styles.text}>Back</Text>
												</TouchableOpacity>
											</View>
										</ScrollView>
									</View>
								</View>
							) : null}

							{/* Step three (Screen three) of the create a booking screen */}
							{chosenServices ? (
								<View style={{ flex: 1 }}>
									{/* Hides screen when moving to next screen */}
									{!chosenDate ? (
										<View style={{ flex: 1 }}>
											<View style={{ flex: 3 }}>
												<View
													style={{
														alignItems: 'center',
													}}
												>
													<Text
														style={{
															fontSize: 30,
															fontWeight: 'bold',
														}}
													>
														Create a Booking
													</Text>
													<Text
														style={{
															fontSize: 20,
															color: 'grey',
															marginBottom: '5%',
														}}
													>
														Choose a Date
													</Text>
												</View>

												{/* used to pick a date */}
												<CalendarPicker
													selectedDayColor="#EFA81F"
													onDateChange={setbookingDate}
												/>
											</View>
											<View
												style={{
													alignItems: 'center',
													justifyContent: 'flex-end',
													flex: 1,
												}}
											>
												{/* Displays choose a time button when a date is selected */}
												{bookingDate ? (
													<TouchableOpacity
														style={styles.button}
														onPress={() => (
															(bookingDateWT = moment(bookingDate).format('DD-MM-YYYY')),
															setbookingDateWTRender(bookingDateWT),
															setstepFour('checkbox-marked-circle'),
															bookingTime(
																bookingDateWT,
																setchosenDate,
																setbookingDate,
																setstepFour,
																setbookingDateWTRender,
																bookingDate
															)
														)}
													>
														<Text style={styles.text}>Choose a Time</Text>
													</TouchableOpacity>
												) : null}
												<TouchableOpacity
													style={styles.button}
													onPress={() => (
														setchosenServices(false),
														setSoftwareInstallation(false),
														setdataBackup(false),
														setVirusMalwareRemoval(false),
														setDustFanClean(false),
														setWaterDamageRescue(false),
														setunknownIssue(false),
														setbookingDate(''),
														setstepThree('checkbox-blank-circle-outline'),
														(services = [ '', '', '', '', '', '' ])
													)}
												>
													<Text style={styles.text}>Back</Text>
												</TouchableOpacity>
											</View>
										</View>
									) : null}

									{/* Step four (Screen four) of the create a booking screen */}
									{chosenDate ? (
										<View style={{ flex: 1 }}>
											{/* Hides screen when moving to next screen */}
											{!chosenTime ? (
												<View style={{ flex: 1 }}>
													<View
														style={{
															alignItems: 'center',
														}}
													>
														<Text
															style={{
																fontSize: 30,
																fontWeight: 'bold',
															}}
														>
															Create a Booking
														</Text>
														<Text
															style={{
																fontSize: 20,
																color: 'grey',
															}}
														>
															{bookingDateWTRender}
														</Text>
														<Text
															style={{
																fontSize: 20,
																color: 'grey',
																marginBottom: '5%',
															}}
														>
															Choose a Time
														</Text>
													</View>
													<View
														style={{
															flex: 7,
															backgroundColor: '#ECECEC',
														}}
													>
														<FlatList
															data={timesAvailable}
															renderItem={({ item }) => (
																<View
																	style={{
																		alignItems: 'center',
																		justifyContent: 'center',
																	}}
																>
																	<Card>
																		<View
																			style={{
																				flexDirection: 'row',
																				alignItems: 'center',
																				justifyContent: 'center',
																			}}
																		>
																			<MaterialCommunityIcons
																				name={'clock-time-four-outline'}
																				size={30}
																			/>
																			<Text
																				style={{
																					margin: 5,
																					fontWeight: 'bold',
																					fontSize: 20,
																				}}
																			>
																				{item}
																			</Text>
																		</View>
																		<TouchableOpacity
																			style={styles.cardbutton}
																			onPress={() => (
																				setstepFive('checkbox-marked-circle'),
																				setchosenTime(true),
																				setselectedTime(item)
																			)}
																		>
																			<Text style={styles.text}>Select Time</Text>
																		</TouchableOpacity>
																	</Card>
																</View>
															)}
															keyExtractor={(item, index) => index.toString()}
														/>
													</View>
													<View
														style={{
															alignItems: 'center',
															justifyContent: 'flex-end',
															flex: 1,
														}}
													>
														<TouchableOpacity
															style={styles.button}
															onPress={() => (
																setchosenDate(false),
																setbookingDate(''),
																setstepFour('checkbox-blank-circle-outline'),
																setbookingDateWTRender('')
															)}
														>
															<Text style={styles.text}>Back</Text>
														</TouchableOpacity>
													</View>
												</View>
											) : null}

											{/* Step five (Screen five) of the create a booking screen */}
											{chosenTime ? (
												<View style={{ flex: 1 }}>
													<View style={styles.vCenter}>
														<ScrollView contentContainerStyle={styles.ScrollView}>
															{/* Title */}
															<View
																style={{
																	alignItems: 'center',
																}}
															>
																<Text
																	style={{
																		fontSize: 35,
																	}}
																>
																	Make a Booking
																</Text>
																<Text
																	style={{
																		marginBottom: 30,
																		fontSize: 20,
																		color: 'grey',
																	}}
																>
																	Fields marked with{' '}
																	<Text
																		style={{
																			color: 'red',
																		}}
																	>
																		*
																	</Text>{' '}
																	are mandatory
																</Text>
															</View>

															{/* form goes here */}
															<AppForm
																initialValues={{
																	name:
																		global.account['first_name'] +
																		' ' +
																		global.account['last_name'],
																	number: global.account['phone_number'],
																	device: deviceData,
																	service:
																		services[0] +
																		spaces[0] +
																		services[1] +
																		spaces[1] +
																		services[2] +
																		spaces[2] +
																		services[3] +
																		spaces[3] +
																		services[4] +
																		spaces[4] +
																		services[5],
																	model: '',
																	serial: '',
																}}
																onSubmit={(values) =>
																	insertBooking(
																		deviceData,
																		values,
																		bookingDateWTRender,
																		selectedTime,
																		navigation
																	)}
																validationSchema={validationSchema}
															>
																{/* Form Row 1*/}
																<AppFormField
																	name="name"
																	icon="account"
																	edit="false"
																	editable={false}
																	placeholder="Name (prefill first + last)"
																	defaultValue={
																		global.account['first_name'] +
																		' ' +
																		global.account['last_name']
																	}
																	required="yes"
																/>

																{/* Form Row 2*/}
																<AppFormField
																	name="number"
																	icon="phone"
																	edit="false"
																	editable={false}
																	placeholder="Number (prefill)"
																	defaultValue={global.account['phone_number']}
																	required="yes"
																/>

																{/* Form Row 3*/}
																<AppFormField
																	name="device"
																	icon="laptop"
																	edit="false"
																	editable={false}
																	placeholder="Device (prefill)"
																	defaultValue={deviceData}
																	required="yes"
																/>

																<Text style={styles.serviceText2}>Services:</Text>
																<Text style={styles.serviceText}>
																	{'\u2B24 ' + services[0]}
																</Text>
																{services[1] ? (
																	<View>
																		<Text style={styles.serviceText}>
																			{'\u2B24 ' + services[1]}
																		</Text>
																	</View>
																) : null}
																{services[2] ? (
																	<View>
																		<Text style={styles.serviceText}>
																			{'\u2B24 ' + services[2]}
																		</Text>
																	</View>
																) : null}
																{services[3] ? (
																	<View>
																		<Text style={styles.serviceText}>
																			{'\u2B24 ' + services[3]}
																		</Text>
																	</View>
																) : null}
																{services[4] ? (
																	<View>
																		<Text style={styles.serviceText}>
																			{'\u2B24 ' + services[4]}
																		</Text>
																	</View>
																) : null}
																{services[5] ? (
																	<View>
																		<Text style={styles.serviceText}>
																			{'\u2B24 ' + services[5]}
																		</Text>
																	</View>
																) : null}

																{/* Form Row 4*/}
																<AppFormField name="model" placeholder="Model No." />

																{/* Form Row 5*/}
																<AppFormField name="serial" placeholder="Serial No." />

																{/* Form Row 6*/}
																<View style={styles.row}>
																	<View style={styles.rowInput}>
																		<TouchableOpacity
																			onPress={() => {
																				setSelection(!isSelected),
																					checkBoxSet(
																						isSelected,
																						setcheckBoxSelected
																					);
																			}}
																		>
																			<View>
																				<MaterialCommunityIcons
																					name={checkBoxSelected}
																					size={30}
																					color={'#EFA81F'}
																				/>
																			</View>
																		</TouchableOpacity>
																		<Text
																			style={{
																				fontSize: 18,
																			}}
																		>
																			Agree to the{' '}
																		</Text>
																		<TouchableOpacity
																			onPress={() => {
																				Linking.openURL(
																					'https://luxtronic.com.au/legal-stuff/terms-of-condition-1/'
																				);
																			}}
																		>
																			<Text
																				style={{
																					fontSize: 18,
																					fontWeight: 'bold',
																					color: '#0000EE',
																					textDecorationLine: 'underline',
																				}}
																				numberOfLines={1}
																			>
																				terms and conditions
																			</Text>
																		</TouchableOpacity>
																	</View>
																</View>

																{/* Form Row 8*/}
																<View style={styles.row}>
																	<View style={styles.rowInput}>
																		<Text
																			style={{
																				fontSize: 20,
																				color: 'red',
																				fontWeight: 'bold',
																				alignItems: 'center',
																			}}
																		>
																			{' '}
																			Booking Fee: $50
																		</Text>
																		<Text
																			style={{
																				fontSize: 15,
																				color: 'red',
																				alignItems: 'center',
																			}}
																		>
																			{' '}
																			(includes gst)
																		</Text>
																	</View>
																</View>

																{/* Form Row (button)*/}
																{isSelected ? (
																	<View
																		style={{
																			flexDirection: 'row',
																			justifyContent: 'center',
																		}}
																	>
																		<SubmitButton name="Submit" />
																	</View>
																) : null}
															</AppForm>
															<View
																style={{
																	alignItems: 'center',
																	justifyContent: 'flex-end',
																	flex: 1,
																}}
															>
																<TouchableOpacity
																	style={styles.button}
																	onPress={() => (
																		setchosenTime(false),
																		setstepFive('checkbox-blank-circle-outline'),
																		setSelection(false),
																		setcheckBoxSelected('checkbox-blank-outline')
																	)}
																>
																	<Text style={styles.text}>Back</Text>
																</TouchableOpacity>
															</View>
														</ScrollView>
													</View>
												</View>
											) : null}
										</View>
									) : null}
								</View>
							) : null}
						</View>
					) : null}
				</View>
			</SafeAreaView>
		</View>
	);
};

const checkBoxSet = (isSelected, setcheckBoxSelected) => {
	if (!isSelected == true) {
		setcheckBoxSelected('checkbox-marked');
	} else {
		setcheckBoxSelected('checkbox-blank-outline');
	}
};

// insert booking into table if all data is correct
const insertBooking = (deviceData, values, bookingDateWTRender, selectedTime, navigation) => {
	// Fetch is an API call that retrieves PHP data from registration.php
	fetch(global.API_DIRECTORY + global.INSERT_BOOKING, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		// The JSON body is parsed with variables declared in registration.php
		body: JSON.stringify({
			user_id: global.account['user_id'],
			device_type: deviceData,
			device_service: values.service,
			date_booked: bookingDateWTRender,
			time_booked: selectedTime,
			model_number: values.model,
			serial_number: values.serial,
		}),
		// Convert the response to text
	})
		.then((response) => response.text())
		.then((responseText) => {
			// This is where we use the received data
			Alert.alert('Notice', responseText, [
				{
					text: 'Ok',
					onPress: () => navigation.navigate('MainMenuScreen'),
				},
			]);
		})
		.catch((e) => {
			console.log('oh no :(', e);
		});
};

const assignService = (
	dataBackup,
	softwareInstallation,
	virusMalwareRemoval,
	dustFanClean,
	waterDamageRescue,
	unknownIssue
) => {
	let counter = 0;
	if (dataBackup == true) {
		services[counter] = 'Data Backup';
		counter = counter + 1;
	}
	if (softwareInstallation == true) {
		services[counter] = 'Software Installation';
		if (counter > 0) {
			spaces[counter - 1] = ',\n';
		}
		counter = counter + 1;
	}
	if (virusMalwareRemoval == true) {
		services[counter] = 'Virus Malware Removal';
		if (counter > 0) {
			spaces[counter - 1] = ',\n';
		}
		counter = counter + 1;
	}
	if (dustFanClean == true) {
		services[counter] = 'Dust Fan Clean';
		if (counter > 0) {
			spaces[counter - 1] = ',\n';
		}
		counter = counter + 1;
	}
	if (waterDamageRescue == true) {
		services[counter] = 'Water Damage Rescue';
		if (counter > 0) {
			spaces[counter - 1] = ',\n';
		}
		counter = counter + 1;
	}
	if (unknownIssue == true) {
		services[counter] = 'Unknown Issue';
		if (counter > 0) {
			spaces[counter - 1] = ',\n';
		}
		counter = counter + 1;
	}
};

const bookingTime = (db, setchosenDate, setbookingDate, setstepFour, setbookingDateWTRender, bookingDate) => {
	let currentDate = new Date();
	let compareDate = new Date(bookingDate);
	if (compareDate > currentDate) {
		// Sets variables for database check
		let setArrayCounter = 0;
		let whileLoopCounter = 0;
		let availableTimeCounter = 0;
		let falseCounter = 0;
		let objectCounter = 0;
		let timeSetCounter = 0;

		fetch(global.API_DIRECTORY + global.SEARCH_BOOKINGS, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				date_booked: db,
			}),
		})
			.then((response) => response.json())
			.then((responseJSON) => {
				while (timeSetCounter < timesBooked.length) {
					timesBooked[timeSetCounter] = times[timeSetCounter];
					timeSetCounter = timeSetCounter + 1;
				}

				// If response returns nothing all time slots free
				if (responseJSON == false) {
				} else {
					// Checks database response for time slots taken and assigns accordingly
					while (objectCounter < responseJSON.length) {
						availableTimeCounter = 0;
						while (availableTimeCounter < timesBooked.length) {
							if (
								responseJSON[objectCounter]['status'] == 'Pending' ||
								responseJSON[objectCounter]['status'] == 'Complete' ||
								responseJSON[objectCounter]['status'] == 'In Progress'
							) {
								if (responseJSON[objectCounter]['pickup_time'] == '') {
									if (
										responseJSON[objectCounter]['time_booked'] == timesBooked[availableTimeCounter]
									) {
										timesBooked[availableTimeCounter] = false;
									}
								} else if (
									responseJSON[objectCounter]['pickup_time'] == timesBooked[availableTimeCounter]
								) {
									timesBooked[availableTimeCounter] = false;
								}
							}

							availableTimeCounter = availableTimeCounter + 1;
						}
						objectCounter = objectCounter + 1;
					}
				}

				// Removes any time slots taken and sets array to be used
				whileLoopCounter = 0;
				setArrayCounter = 0;
				while (whileLoopCounter < timesBooked.length) {
					if (timesBooked[whileLoopCounter] == false) {
						falseCounter = falseCounter + 1;
					} else {
						timesAvailable[setArrayCounter] = timesBooked[whileLoopCounter];
						setArrayCounter = setArrayCounter + 1;
					}
					whileLoopCounter = whileLoopCounter + 1;
				}

				// If all slots are taken return alert
				if (falseCounter > timesBooked.length) {
					Alert.alert('Notice', 'No time slots available on ' + db, [
						{
							text: 'Ok',
							onPress: () => (
								setchosenDate(false),
								setbookingDate(''),
								setstepFour('checkbox-blank-circle-outline'),
								setbookingDateWTRender('')
							),
						},
					]);
				} else {
					// if there is at least one slot available advance to the next screen
					setchosenDate(true);
				}
			})
			.catch((db) => {
				console.error('oh no :(', db);
			});
	} else {
		// Alert if date has past or is not longer available to book
		Alert.alert('Notice', db + ' is no longer available', [
			{
				text: 'Ok',
				onPress: () => (
					setchosenDate(false),
					setbookingDate(''),
					setstepFour('checkbox-blank-circle-outline'),
					setbookingDateWTRender('')
				),
			},
		]);
	}
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 0,
	},
	button: {
		width: '90%',
		height: 60,
		borderRadius: 20,
		backgroundColor: '#EFA81F',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	cardbutton: {
		width: '90%',
		height: 60,
		borderRadius: 20,
		backgroundColor: '#EFA81F',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 4,
	},
	checkBoxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 10,
	},
	Icon: {
		width: '95%',
		height: '95%',
		resizeMode: 'contain',
	},
	IconButton: {
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	IconText: {
		fontWeight: 'bold',
		fontSize: 20,
	},
	IconText2: {
		fontSize: 20,
	},
	progressBarIcons: {
		flex: 0.2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'baseline',
	},
	rowInput: {
		flex: 0.9, //because the * goes outside of the view (100% width in NewTextInput)
		marginVertical: 10,
		alignItems: 'center', //aligns vertically
		justifyContent: 'flex-start', //aligns horizontally
		flexDirection: 'row',
	},
	ScrollView: {
		paddingHorizontal: 20,
	},
	serviceText: {
		color: 'grey', //grey colour
		fontSize: 18,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir', //font family changes for android/iOS
		paddingLeft: 10,
	},
	serviceText2: {
		color: '#000', //black colour
		fontSize: 18,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir', //font family changes for android/iOS
		fontWeight: 'bold',
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

export default CreateBookingScreen;
