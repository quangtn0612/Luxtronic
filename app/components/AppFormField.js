import React from "react";
import { StyleSheet, View } from "react-native";
import NewTextInput from "./NewTextInput";
import { useFormikContext } from "formik";
import ErrorMsg from "./ErrorMsg";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppFormField({ name, required, ...otherProps }) {
    const { handleChange, errors, setFieldTouched, touched } =
        useFormikContext();

    return (
        <>
            <ErrorMsg error={errors[name]} visible={touched[name]} />

            <View style={styles.row}>
                {/* <Text style={styles.number}>1.</Text> */}
                <View style={styles.rowInput}>
                    <NewTextInput
                        onChangeText={handleChange(name)}
                        onBlur={() => setFieldTouched(name)}
                        {...otherProps}
                    />

                    {required && (
                        <View style={styles.required}>
                            <MaterialCommunityIcons
                                name="asterisk"
                                size={asteriskSize}
                                color={"red"}
                                style={{ marginLeft: 5 }}
                            />
                        </View>
                    )}
                </View>
            </View>
        </>
    );
}

let asteriskSize = 12;

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "baseline",
    },
    rowInput: {
        flex: 0.9, //because the * goes outside of the view (100% width in NewTextInput)
        alignItems: "flex-start", //aligns vertically
        justifyContent: "flex-start", //aligns horizontally
        flexDirection: "row",
    },
    required: {
        marginTop: 22,
    },
});
export default AppFormField;
