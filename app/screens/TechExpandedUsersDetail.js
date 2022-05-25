import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import AppTextInput from "../components/AppTextInput";

const TechExpandedUsersDetail = ({ navigation }) => {
  // Sets variables
  const [item, setItem] = React.useState(navigation.getParam("item"));
  const [user_id, setUserID] = React.useState(item.user_id);
  const [user_first_name, setFirstName] = React.useState(item.first_name);
  const [user_last_name, setLastName] = React.useState(item.last_name);
  const [user_email, setEmail] = React.useState(item.email);
  const [user_password, setPassword] = React.useState(
    global.account["password"]
  );
  const [user_new_password, setNewPassword] = React.useState("");
  const [user_confirm_new_password, setConfirmNewPassword] = React.useState("");
  const [user_phone_number, setPhoneNumber] = React.useState(item.phone_number);
  const [editableText, setEditableText] = React.useState(false);
  const [editablePassword, setEditablePassword] = React.useState(false);

  /* Validation functions */
  const [valid_first_name, setValidFirstName] = React.useState(true);
  const [valid_last_name, setValidLastName] = React.useState(true);
  const [valid_email, setValidEmail] = React.useState(true);
  const [valid_password, setValidPassword] = React.useState(true);
  const [valid_phone_number, setValidPhoneNumber] = React.useState(true);

  //email content
  let firstLetter = " ";
  if (item.first_name) firstLetter = item.first_name.charAt(0).toUpperCase();

  const subject = "Password reset notifcation";
  const message = `Hello ${firstLetter}${item.first_name.slice(1)},\n
  I would like to let you know that the password of your account ${
    item.email
  } is reset. \n
  Kind regards,
  Luxtronic IT team\n`;

  return (
    // Sets flex to 1 taking up the entire screen]

    <View style={{ flex: 1 }}>
      {/* Sets the view to be able to have a keyboard support without covering content */}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Sets the view within to be scrollable when content is off the screen */}
        <ScrollView contentContainerStyle={{ flex: 1 }} bounces={false}>
          {/* Sets to the remaining usable screen space */}
          <SafeAreaView style={styles.background}>
            {/* Sets space above profile picture */}
            <View
              style={{
                flex: 1,
              }}
            />

            {/* Devides remaining screen area for Profile Picture */}

            {/* Divides remaining screen area for text input content */}
            <View
              style={{
                width: "100%",
                flex: 28,
              }}
            >
              {/* Sets area within remaining screen to be scrollable */}
              <ScrollView bounces={false}>
                <View style={styles.vCenter}>
                  {!editablePassword ? (
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      {/* First Name Textbox and label*/}
                      <Text style={styles.text2}>User ID:</Text>
                      {/* edit sets text colour based on editableText*/}
                      <AppTextInput
                        icon={"numeric"}
                        edit={true}
                        defaultValue={user_id}
                        editable={false}
                      />

                      {/* First Name Textbox and label*/}
                      <Text style={styles.text2}>First Name:</Text>
                      {/* edit sets text colour based on editableText*/}
                      <AppTextInput
                        icon={"account"}
                        edit={!editableText}
                        defaultValue={user_first_name}
                        onChangeText={(user_first_name) =>
                          setFirstName(user_first_name)
                        }
                        onEndEditing={() =>
                          validateName(user_first_name)
                            ? setValidFirstName(true)
                            : setValidFirstName(false)
                        }
                        placeholder={"First Name"}
                        editable={editableText}
                        maxLength={240}
                      />
                      {valid_first_name ? null : (
                        <Text style={styles.invalidIput}>
                          *Invalid, letters, hyphens and apostrophes only.
                        </Text>
                      )}

                      {/* Last Name Textbox and label*/}
                      <Text style={styles.text2}>Last Name:</Text>
                      <AppTextInput
                        icon={"account"}
                        edit={!editableText}
                        defaultValue={user_last_name}
                        onChangeText={(user_last_name) =>
                          setLastName(user_last_name)
                        }
                        onEndEditing={() =>
                          validateName(user_last_name)
                            ? setValidLastName(true)
                            : setValidLastName(false)
                        }
                        placeholder={"Last Name"}
                        editable={editableText}
                        maxLength={240}
                      />
                      {valid_last_name ? null : (
                        <Text style={styles.invalidIput}>
                          *Invalid, letters, hyphens and apostrophes only.
                        </Text>
                      )}

                      {/* Email Textbox and label*/}
                      <Text style={styles.text2}>
                        Email:
                        <Text
                          style={
                            ({
                              color: "black",
                            },
                            styles.emailText)
                          }
                          onPress={() =>
                            Linking.openURL(
                              `mailto:${item.email}?subject=${subject}&body=${message}`
                            )
                          }
                        >
                          <Text style={styles.text}>Send reset password</Text>
                        </Text>
                      </Text>
                      <AppTextInput
                        icon={"email"}
                        edit={!editableText}
                        defaultValue={user_email}
                        onChangeText={(user_email) => setEmail(user_email)}
                        onEndEditing={() =>
                          validateEmail(user_email)
                            ? setValidEmail(true)
                            : setValidEmail(false)
                        }
                        keyboardType="email-address"
                        placeholder={"Email"}
                        editable={editableText}
                        maxLength={240}
                      />
                      {valid_email ? null : (
                        <Text style={styles.invalidIput}>
                          *Invalid email address.
                        </Text>
                      )}

                      {/* Phone textbox and label */}
                      <Text style={styles.text2}>Phone Number:</Text>
                      <AppTextInput
                        icon={"cellphone"}
                        edit={!editableText}
                        defaultValue={user_phone_number}
                        onChangeText={(user_phone_number) =>
                          setPhoneNumber(user_phone_number)
                        }
                        onEndEditing={() =>
                          validatePhone(user_phone_number)
                            ? setValidPhoneNumber(true)
                            : setValidPhoneNumber(false)
                        }
                        placeholder={"Phone Number"}
                        editable={editableText}
                        maxLength={240}
                      />

                      {/* FaceID/ FingerPrint switch button */}

                      {valid_phone_number ? null : (
                        <Text style={styles.invalidIput}>
                          *Invalid phone number. Must start with '04'
                        </Text>
                      )}

                      {/* Edit text button show or hide based on editableText variable */}
                      {!editableText ? (
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => (
                            setEditableText(true),
                            setFirstName(item.first_name),
                            setLastName(item.last_name),
                            setEmail(item.email),
                            setPassword(global.account["password"]),
                            setPhoneNumber(item.phone_number)
                          )}
                        >
                          <Text style={styles.text}>Edit</Text>
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  ) : null}

                  {/* Update database button show or hide based on editableText variable */}
                  {editableText ? (
                    <TouchableOpacity
                      activeOpacity={0}
                      style={styles.button}
                      onPress={() =>
                        valid_first_name
                          ? valid_last_name
                            ? valid_email
                              ? valid_phone_number
                                ? (userUpdate(
                                    user_id,
                                    user_first_name,
                                    user_last_name,
                                    user_email,
                                    user_password,
                                    user_phone_number,
                                    user_new_password,
                                    user_confirm_new_password
                                  ),
                                  setEditableText(false))
                                : invalidAttempt()
                              : invalidAttempt()
                            : invalidAttempt()
                          : invalidAttempt()
                      }
                    >
                      <Text style={styles.text}>Update</Text>
                    </TouchableOpacity>
                  ) : null}

                  {/* Cancel edit button show or hide based on editableText variable */}
                  {editableText ? (
                    <TouchableOpacity
                      activeOpacity={0}
                      style={styles.button}
                      onPress={() => (
                        setEditableText(false),
                        setFirstName(item.first_name),
                        setLastName(item.last_name),
                        setEmail(item.email),
                        setPassword(global.account["password"]),
                        setPhoneNumber(item.phone_number)
                      )}
                    >
                      <Text style={styles.text}>Cancel</Text>
                    </TouchableOpacity>
                  ) : null}

                  {/* Set Password button show or hide based on editableText and editablePassword variable */}
                  {!editableText ? (
                    !editablePassword ? (
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => (
                            setEditablePassword(true),
                            setPassword(global.account["password"])
                          )}
                        >
                          <Text style={styles.text}>Reset Password</Text>
                        </TouchableOpacity>
                      </View>
                    ) : null
                  ) : null}

                  {/* Password text inputs hidden until Change Password button pressed */}
                  {!editableText ? (
                    editablePassword ? (
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                        }}
                      >
                        {/* New Password Textbox and label*/}
                        <Text style={styles.text2}>New Password:</Text>
                        <AppTextInput
                          icon="lock"
                          secureTextEntry={true}
                          placeholder={"New Password"}
                          onChangeText={(user_new_password) =>
                            setNewPassword(user_new_password)
                          }
                          onEndEditing={() =>
                            validatePassword(user_new_password)
                              ? setValidPassword(true)
                              : setValidPassword(false)
                          }
                          editable={!editableText}
                        />
                        {valid_password ? null : (
                          <Text style={styles.invalidIput}>
                            *Invalid password.
                          </Text>
                        )}

                        {/* Confirm New Password Textbox and label*/}
                        <Text style={styles.text2}>Confirm New Password:</Text>
                        <AppTextInput
                          icon="lock"
                          secureTextEntry={true}
                          placeholder={"Confirm New Password"}
                          onChangeText={(user_confirm_new_password) =>
                            setConfirmNewPassword(user_confirm_new_password)
                          }
                          editable={!editableText}
                        />

                        {/* Update database button */}
                        <TouchableOpacity
                          activeOpacity={0}
                          style={styles.button}
                          onPress={() =>
                            valid_password
                              ? (passwordReset(
                                  user_id,
                                  user_email,
                                  user_password,
                                  user_new_password,
                                  user_confirm_new_password
                                ),
                                setEditablePassword(false))
                              : invalidAttempt()
                          }
                        >
                          <Text style={styles.text}>Update</Text>
                        </TouchableOpacity>

                        {/* Cancel edit password button */}
                        <TouchableOpacity
                          activeOpacity={0}
                          style={styles.button}
                          onPress={() => (
                            setEditablePassword(false),
                            setNewPassword(""),
                            setConfirmNewPassword("")
                          )}
                        >
                          <Text style={styles.text}>Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    ) : null
                  ) : null}
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const userUpdate = (id, f, l, e, pw, pn, unp, ucnp) => {
  // Checks if any fields are left blank
  if (f == "" || l == "" || e == "" || pw == "" || pn == "") {
    Alert.alert("Notice", "Some fields have been left blank", [
      { text: "Ok", onPress: () => console.log("Update failed") },
    ]);
    return false;
  } else {
    // Checks if new password field is blank
    if (unp == "") {
      pw = false;
    } else {
      // Checks if new password and confirm password are the same
      if (unp == ucnp) {
        // Sets password to be updated in the database
        pw = unp;
      } else {
        Alert.alert(
          "Notice",
          "New Password and Confirm Password do not match",
          [
            {
              text: "Ok",
              onPress: () => console.log("Update failed"),
            },
          ]
        );
        return false;
      }
    }
  }

  // Fetch is an API call that retrieves PHP data from registration.php
  fetch(global.API_DIRECTORY + global.EDIT_PROFILE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // The JSON body is parsed with variables declared in registration.php
    body: JSON.stringify({
      user_id: id,
      first_name: f,
      last_name: l,
      email: e,
      password: pw,
      phone_number: pn,
    }),
    // Convert the response to text
  })
    .then((response) => response.json())
    .then((responseText) => {
      console.log(responseText);
      // This is where we use the received data
      Alert.alert("Notice", "Updated Successfully", [
        { text: "Ok", onPress: () => console.log("Update Successful") },
      ]);
    })
    .catch((e) => {
      console.log("oh no :(", e);
    });
};

//reset users password
const passwordReset = (id, e, pw, unp, ucnp) => {
  // Checks if any fields are left blank
  if (e == "" || pw == "") {
    Alert.alert("Notice", "Some fields have been left blank", [
      { text: "Ok", onPress: () => console.log("Update failed") },
    ]);
    return false;
  } else {
    // Checks if new password field is blank
    if (unp == "") {
      pw = false;
    } else {
      // Checks if new password and confirm password are the same
      if (unp == ucnp) {
        // Sets password to be updated in the database
        pw = unp;
      } else {
        Alert.alert(
          "Notice",
          "New Password and Confirm Password do not match",
          [
            {
              text: "Ok",
              onPress: () => console.log("Update failed"),
            },
          ]
        );
        return false;
      }
    }
  }
  // Fetch is an API call that retrieves PHP data from registration.php
  fetch(global.API_DIRECTORY + global.RESET_PASSWORD, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // The JSON body is parsed with variables declared in registration.php
    body: JSON.stringify({
      user_id: id,
      email: e,
      password: pw,
    }),
    // Convert the response to text
  })
    .then((response) => response.json())
    .then((responseText) => {
      console.log("responseText : " + responseText);
      // global.account = responseText;
      // This is where we use the received data
      Alert.alert("Notice", "Updated Successfully", [
        { text: "Ok", onPress: () => console.log("Update Successful") },
      ]);
    })
    .catch((e) => {
      console.log("oh no :(", e);
    });
};
// Custom invalid credentials alert
const invalidAttempt = () => {
  Alert.alert(
    "Invalid Input",
    "Some data has invalid input, please correct this before registrating",
    [
      {
        text: "Try again",
        style: "cancel",
      },
    ]
  );
};

// Validation Functions ----------------------------------------------------------------------------
const validateName = (n) => {
  const re = /^[A-Za-z-']{1,30}$/;
  return n.length !== 0 ? re.test(n) : false;
};

const validateEmail = (e) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return e.length !== 0 ? re.test(e) : false;
};

const validatePassword = (p) => {
  const re = /^[A-Za-z0-9"!@#$%^&*()"]{6,25}$/;
  return p.length !== 0 ? re.test(p) : false;
};

const validatePhone = (pn) => {
  const re = /^[0][4][0-9]{8}$/;
  return pn.length !== 0 ? re.test(pn) : false;
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  BackIcon: {
    width: "95%",
    height: "95%",
    resizeMode: "contain",
  },
  BackButton: {
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "80%",
    height: 60,
    borderRadius: 20,
    backgroundColor: "#EFA81F",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  input: {
    width: "80%",
    height: 60,
    margin: 6,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#EFA81F",
    padding: 10,
  },
  ProfilePicture: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  text2: {
    fontSize: 18,
    width: "70%",
    paddingTop: 5,
  },
  vCenter: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text3: {
    fontSize: 18,
    width: "58%",
  },
  FaceIDFingerPrintBlock: {
    flexDirection: "row",
    margin: 8,
    marginBottom: 12,
  },
  emailText: {
    backgroundColor: "#EFA81F",
    alignItems: "flex-end",
    justifyContent: "right",
  },
});

export default TechExpandedUsersDetail;
