/* 
WELCOMESCREEN.JS

Navigation:     : userLogin() -> MainMenuScreen.js
Description:    
*/
import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  View,
  Image,
  SafeAreaView,
  Platform,
  TextInput,
  TouchableOpacity,
  Linking
} from "react-native";
import AppTextInput from "../components/AppTextInput";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import * as axios from "axios";

const WelcomeScreen = ({ navigation }) => {
  // Sets standards for email and password
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  //using SecureStore to store keys
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  React.useEffect(() => {
    handleAuthentication();
  }, []);

  //FingerPrint, FaceID functions
  handleAuthentication = async () => {
    const emailFromPreviousLogin = await SecureStore.getItemAsync("email");
    const passwordFromPreviousLogin = await SecureStore.getItemAsync(
      "password"
    );
    const account_typeFromPreviousLogin = await SecureStore.getItemAsync(
      "account_type"
    );
    const isAllowedToUseFaceIDFingerPrint = await SecureStore.getItemAsync(
      "isAllowedToUseFaceIDFingerPrint"
    );
    let hasHardwareAsync = await LocalAuthentication.hasHardwareAsync();
    if (
      account_typeFromPreviousLogin !== null &&
      isAllowedToUseFaceIDFingerPrint !== "false" &&
      hasHardwareAsync
    ) {
      let result = await LocalAuthentication.authenticateAsync();

      if (result.success) {
        const data = {
          email: emailFromPreviousLogin, //login data for your account
          password: passwordFromPreviousLogin,
        };
        const headers = {
          "Content-Type": "application/json",
        };
        axios
          .post(global.API_DIRECTORY + global.USER_LOGIN, data, {
            headers: headers,
          })
          .then(function (result) {
            if (result && result.data) {
              const AUTH_USER = result.data.email;
              if (AUTH_USER) {
                let account_type = "";
                result
                  ? (account_type = result.data.account_type)
                  : invalidLoginAlert();
                switch (account_type) {
                  case "0":
                    global.account = result.data;
                    navigation.navigate("MainMenuScreen");
                    break;
                  case "1":
                    global.account = result.data;
                    navigation.navigate("TechMainMenuScreen");
                    break;
                  default:
                    console.log("account_type incorrect");
                }
              } else {
                Alert.alert("Please login again with your email and password");
                props.navigation.navigate("WelcomeScreen");
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      // else {
      //   //in case authenticate by fingerprint or faceid false, isAllowedToUseFaceIDFingerPrint
      //   SecureStore.deleteItemAsync("isAllowedToUseFaceIDFingerPrint");
      // }
    }
  };

  const userLogin = async () => {
    fetch(global.API_DIRECTORY + global.USER_LOGIN, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((responseJSON) => {
        if (responseJSON) {
          save("email", responseJSON.email);
          save("password", password);
          save("account_type", responseJSON.account_type);
        }
        let account_type = "";
        responseJSON
          ? (account_type = responseJSON["account_type"])
          : invalidLoginAlert();
        switch (account_type) {
          case "0":
            global.account = responseJSON;
            navigation.navigate("MainMenuScreen");
            break;
          case "1":
            global.account = responseJSON;
            navigation.navigate("TechMainMenuScreen");
            break;
          default:
            console.log("account_type incorrect");
        }
      })
      .catch((e) => {
        console.error("Error logging in:\n", e);
      });
  };

  return (
    // Sets view to take up all usable screen
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
            {/* Sets asside section of usable screen for Logo */}
            <View
              style={{
                backgroundColor: "#fff",
                width: "100%",
                flex: 1,
              }}
            >
              {/* Style for Logo */}
              <View style={styles.vCenter}>
                <Image
                  style={styles.logo}
                  source={require("../assets/Luxtronic_Text_Logo.png")}
                />
              </View>
            </View>

            {/* Sets remaining usable screen space */}
            <View
              style={{
                width: "100%",
                flex: 1.5,
              }}
            >
              {/* Style for remaining usable screen space */}
              <View style={styles.vCenter}>
                <AppTextInput
                  icon="email"
                  placeholder="Email"
                  autoCorrect={false}
                  autoCapitalize="none"
                  textContentType="emailAddress" //so iOS devices can autofill emails
                  keyboardType="email-address"
                  onChangeText={(email) => setEmail(email)}
                  maxLength={240}
                />

                <AppTextInput
                  icon="lock"
                  autoCorrect={false}
                  autoCapitalize="none"
                  textContentType="password" //so iOS devices can autofill passwords
                  secureTextEntry={true}
                  placeholder="Password"
                  onChangeText={(password) => setPassword(password)}
                  maxLength={240}
                />
                {/* user login */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    validateEmail(email) ? userLogin() : invalidLoginAlert()
                  }
                >
                  <Text style={styles.text}>Login</Text>
                </TouchableOpacity>

                {/* Sets style for section with Register button */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "baseline",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.text3}>Don't have an account?</Text>
                  <TouchableOpacity
                    style={styles.button2}
                    onPress={() => navigation.navigate("RegisterScreen")}
                  >
                    <Text style={styles.text2}>Register here</Text>
                  </TouchableOpacity>
                </View>
                <View
                style={{
                  flexDirection: "row",
                  alignItems: "baseline",
                  justifyContent: "center",
                }}
                >
                  <Text style={styles.text3}>Want to know more about Luxtronic Digital Services?</Text>
                  
                </View>
                <TouchableOpacity
                    style={styles.button2}
                    onPress={() => {
                      Linking.openURL(
                        "https://luxtronic.com.au/"
                      );
                    }}
                  >
                    <Text style={styles.text2}>Visit our website</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const userLogin = (e, p, n) => {
  fetch(global.API_DIRECTORY + global.USER_LOGIN, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: e,
      password: p,
    }),
  })
    .then((response) => response.json())
    .then((responseJSON) => {
      let account_type = "";
      responseJSON
        ? (account_type = responseJSON["account_type"])
        : invalidLoginAlert();
      switch (account_type) {
        case "0":
          global.account = responseJSON;
          n.navigate("MainMenuScreen");
          break;
        case "1":
          global.account = responseJSON;
          n.navigate("TechMainMenuScreen");
          break;
        default:
          console.log("account_type incorrect");
      }
    })
    .catch((e) => {
      console.error("Error logging in:\n", e);
    });
};

// Regex function to check if the email entered is valid
const validateEmail = (email) => {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

// Custom invalid credentials alert
const invalidLoginAlert = () => {
  Alert.alert(
    "Invalid email or password",
    "Try logging in with a valid email address and password",
    [
      {
        text: "Try again",
        onPress: () => console.log("incorrect details entered"),
        style: "cancel",
      },
    ]
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff",
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
  },
  button2: {
    height: 60,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: "center",
  },
  input: {
    width: "80%",
    height: 60,
    margin: 12,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#EFA81F",
    padding: 10,
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  text2: {
    color: "#0000FF",
    fontSize: 20,
    textDecorationLine: "underline",
  },
  text3: {
    fontSize: 15,
  },
  vCenter: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default WelcomeScreen;
