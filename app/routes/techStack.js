import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import TechMainMenuScreen from "../screens/TechMainMenuScreen";
import TechTicketsScreen from "../screens/TechTicketsScreen";
import TechExpandedTicketScreen from "../screens/TechExpandedTicketScreen";
import TechJobRequestScreen from "../screens/TechJobRequestScreen";
import Header from "../shared/header";
import BackHeader from "../shared/backHeader";
import HomeHeader from "../shared/techHomeHeader";
import React from "react";

// Screens accessible from this stack
const screens = {
    // Tech Main menu screen
    TechMainMenuScreen: {
        screen: TechMainMenuScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
                headerLeft: () => null,
            };
        },
    },

    TechTicketsScreen: {
        screen: TechTicketsScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <BackHeader navigation={navigation} />,
                headerLeft: () => null,
            };
        },
    },

    TechExpandedTicketScreen: {
        screen: TechExpandedTicketScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <HomeHeader navigation={navigation} />,
                headerLeft: () => null,
            };
        },
    },

    TechJobRequestScreen: {
        screen: TechJobRequestScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <HomeHeader navigation={navigation} />,
                headerLeft: () => null,
            };
        },
    },
};

// Sets header style for automatic header between screens
const TechStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#EFA81F",
            height: 90,
        },
    },
});

export default createAppContainer(TechStack);
