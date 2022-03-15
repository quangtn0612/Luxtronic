import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import ProfileScreen from "../screens/ProfileScreen";
import Header from "../shared/header";
import React from "react";

// Screens accessible from this stack
const screens = {
    // Profile screen
    ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} />,
                headerLeft: () => null,
            };
        },
    },
};

// Sets header style for automatic header between screens
const ProfileStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#EFA81F",
            height: 90,
        },
    },
});

export default createAppContainer(ProfileStack);
