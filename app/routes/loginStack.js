import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Draw from "./drawer";
import TechDraw from "./drawerTech";

// Screens accessible from this stack
const screens = {
    // Login Screen
    WelcomeScreen: {
        screen: WelcomeScreen,
        navigationOptions: {
            title: "",
            headerStyle: {
                height: 60,
                backgroundColor: "#EFA81F",
            },
        },
    },

    // User Draw navigation stack
    Draw: {
        screen: Draw,
        navigationOptions: {
            title: "",
            gestureEnabled: false,
            headerLeft: () => null,
            headerStyle: {
                height: 0,
            },
        },
    },

    // User Draw navigation stack
    TechDraw: {
        screen: TechDraw,
        navigationOptions: {
            title: "",
            gestureEnabled: false,
            headerLeft: () => null,
            headerStyle: {
                height: 0,
            },
        },
    },

    // Register Screen
    RegisterScreen: {
        screen: RegisterScreen,
        navigationOptions: {
            title: "",
            headerLeft: () => null,
            headerStyle: {
                height: 60,
                backgroundColor: "#EFA81F",
            },
        },
    },
};

// Sets header style for automatic header between screens
const LoginStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: "#EFA81F",
        },
    },
});

export default createAppContainer(LoginStack);
