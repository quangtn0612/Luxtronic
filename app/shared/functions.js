/* The bellow is needed for the push notification function

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";*/

// Sets global PHP file strings
export function setGlobalPHPFiles() {
  global.API_DIRECTORY = "http://luxtronic.com.au/mobile-api/";
  global.BOOK_PICKUP = "book_pickup.php";
  global.CANCEL_BOOKING = "cancel_booking.php";
  global.CURRENT_BOOKINGS = "current_bookings.php";
  global.EDIT_PROFILE = "edit_profile.php"; //edit a profile
  global.RESET_PASSWORD = "reset_password.php"; //edit a password
  global.INSERT_BOOKING = "insert_booking.php";
  global.JOB_REQUEST = "job_request.php";
  global.JOB_REQUEST_RESPONSE = "job_request_response.php";
  global.PAST_BOOKINGS = "past_bookings.php";
  global.REGISTRATION = "registration.php"; //create a profile
  global.SEARCH_BOOKINGS = "search_bookings.php";
  global.TECH_CURRENT_BOOKINGS = "tech_current_bookings.php";
  global.TECH_CUSTOMERINFO_TICKETS = "tech_customerinfo_tickets.php";
  global.TECH_PAST_BOOKINGS = "tech_past_bookings.php";
  global.UPDATE_STATUS = "update_status.php";
  global.USER_LOGIN = "user_login.php";
  global.FETCH_USERS = "fetch_users.php"; //fetch all users (technician)
  global.DELETE_USERS = "delete_users.php"; //delete all users (technician)
  global.TECH_BOOKING_FROM_ID = "tech_booking_from_id.php";
}

// Push notifications settings - https://docs.expo.dev/push-notifications/push-notifications-setup/
// Gets the user permission to send push notifications and an ExpoPushToken
/*export async function registerForPushNotificationsAsync() {
	if (Constants.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		const token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
		global.EXPO_PUSH_TOKEN = token;
		//this.setState({ expoPushToken: token });
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [ 0, 250, 250, 250 ],
			lightColor: '#FF231F7C',
		});
	}
}*/
