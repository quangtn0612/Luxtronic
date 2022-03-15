import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigator from "./app/routes/loginStack";

const ScreenStack = createNativeStackNavigator();

import { setGlobalPHPFiles } from "./app/shared/functions";

export default function App() {
    setGlobalPHPFiles();
    return (
        // Launches the login Stack
        <Navigator />
    );
}
