import React from "react";
import { StyleSheet, View, Image, Dimensions, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header({ navigation }) {
    // Function to open the draw
    const Home = () => {
        navigation.navigate("MainMenuScreen");
    };

    return (
        // Style for the header
        <View style={styles.header}>
            {/* icon for the Back Button*/}
            <MaterialIcons
                name={"home"}
                size={50}
                onPress={Home}
                style={styles.icon}
            />

            {/* Logo for the header */}
            <View>
                <Image
                    source={require("../assets/Luxtronic_Logo.png")}
                    style={styles.headerImage}
                />
            </View>
        </View>
    );
}

// Get full width of the screen
var fullWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
    header: {
        width: Platform.OS === "ios" ? fullWidth : "100%",
        height: 90,
        flexDirection: "row",
        alignItems: Platform.OS === "ios" ? "flex-end" : "flex-end",
        justifyContent: "center",
    },
    headerImage: {
        width: 58,
        height: 58,
    },
    icon: {
        position: "absolute",
        left: Platform.OS === "android" ? -10 : 10,
    },
});
