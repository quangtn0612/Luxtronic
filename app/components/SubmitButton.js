import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useFormikContext } from "formik";

function SubmitButton({ name }) {
    const { handleSubmit } = useFormikContext();
    return (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "90%",
        height: 60,
        borderRadius: 20,
        backgroundColor: "#EFA81F",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 24,
    },
});

export default SubmitButton;
