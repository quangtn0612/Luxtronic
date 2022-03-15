import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MainMenuScreen from "../screens/MainMenuScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import BookingsScreen from "../screens/BookingsScreen";
import CreateBookingScreen from "../screens/CreateBookingScreen";
import TicketsScreen from "../screens/TicketsScreen";
import BookPickupScreen from "../screens/BookPickupScreen";
import ServiceListScreen from "../screens/ServiceListScreen";
import JobRequestScreen from "../screens/JobRequestScreen";
import Header from "../shared/header";
import BackHeader from "../shared/backHeader";
import HomeHeader from "../shared/homeHeader";
import React from "react";

// Screens accessible from this stack
const screens = {
    // Main menu screen
    MainMenuScreen: {
        screen: MainMenuScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
                headerLeft: () => null,
            };
        },
    },

    // Create Bookings Screen
    CreateBookingScreen: {
        screen: CreateBookingScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <HomeHeader navigation={navigation} />,
                headerLeft: () => null,
            };
        },
    },

    // ContactUs Screen
    ContactUsScreen: {
        screen: ContactUsScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <BackHeader navigation={navigation} />,
                headerLeft: () => null,
            };
        },
    },

    // Bookings Screen
    BookingsScreen: {
        screen: BookingsScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <BackHeader navigation={navigation} />,
                headerLeft: () => null,
            };
        },
    },

    // Tickets Screen
    TicketsScreen: {
        screen: TicketsScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <BackHeader navigation={navigation} />,
                headerLeft: () => null,
            };
        },
    },

    // Book Pickup Screen
    BookPickupScreen: {
        screen: BookPickupScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <BackHeader navigation={navigation} />,
                headerLeft: () => null,
            };
        },
    },

    ServiceListScreen: {
        screen: ServiceListScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <BackHeader navigation={navigation} />,
                headerLeft: () => null,
            };
        },
    },

    JobRequestScreen: {
        screen: JobRequestScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <BackHeader navigation={navigation} />,
                headerLeft: () => null,
            };
        },
    },
};

// Sets header style for automatic header between screens
const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#EFA81F",
            height: 90,
        },
    },
});

export default createAppContainer(HomeStack);
