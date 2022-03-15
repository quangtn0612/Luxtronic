import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// this file is to create a better and customisable looking text input for our forms
function JobRequestTextInput({ icon, edit, ...otherProps }) {
    //{...otherProps} allows for the child elements to be able to call the textInput functions when we call AppTextInput
    return (
        <View style={styles.container}>
            {/* this makes it so an icon is only rendered if specified, else it's left blank */}
            {icon && (
                <MaterialCommunityIcons
                    name={icon}
                    size={21}
                    color={"#6e6969"}
                    style={styles.icon}
                />
            )}

            {/* Based on edit display grey text or dark grey text. e.g. If edit is not false display grey */}
            {edit ? (
                <TextInput style={styles.textInput2} {...otherProps} />
            ) : (
                <TextInput style={styles.textInput} {...otherProps} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f8f4f4", //grey colour
        borderRadius: 20,
        flexDirection: "row",
        width: "95%",
        padding: 15, //room in the container
        marginVertical: 10, //spacing between text inputs
        borderColor: "#EFA81F",
        borderWidth: 2,
        alignItems: "center", //aligns vertically (icons with placeholder/inputs)
    },
    textInput: {
        width: "110%",
        color: "#0c0c0c", //dark grey colour
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir", //font family changes for android/iOS
    },
    textInput2: {
        width: "110%",
        color: "grey", //grey colour
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir", //font family changes for android/iOS
    },
    icon: {
        marginRight: 10, //space between icon and placerholder/textinput
    },
});

export default JobRequestTextInput;
