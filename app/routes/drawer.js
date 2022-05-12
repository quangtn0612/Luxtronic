import React from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import HomeStack from "./homeStack";
import ProfileStack from "./profileStack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

// Custom Draw component
const CustomDraw = (props) => (
  // Sets draw to be within usable screen space
  <SafeAreaView style={styles.drawStyle}>
    {/* Centers content within View */}
    <View style={styles.drawCenter}>
      <Text numberOfLines={1} style={styles.Name}>
        {global.account["first_name"] + " " + global.account["last_name"]}
      </Text>
      <Image
        source={require("../assets/Default-Profile-Picture.png")}
        style={styles.headerImage}
      />
    </View>

    {/* Allows draw items to be scrollable */}
    <ScrollView>
      {/* Imports items for the draw */}
      <DrawerItems {...props} />
    </ScrollView>
    <View style={styles.logoutContainer}>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          SecureStore.deleteItemAsync("email");
          SecureStore.deleteItemAsync("password");
          SecureStore.deleteItemAsync("account_type");
          SecureStore.deleteItemAsync("isAllowedToUseFaceIDFingerPrint");
          props.navigation.navigate("WelcomeScreen");
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.logout}>Logout</Text>
          <MaterialCommunityIcons name={"logout"} size={30} color={"#000"} />
        </View>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

// Sets options available for the draw navigation
const screens = {
  // Main menu screen and stack
  Home: {
    screen: HomeStack,
  },

  // Profile screen and stack
  Profile: {
    screen: ProfileStack,
  },
};

const RootDrawNavigator = createDrawerNavigator(screens, {
  contentComponent: CustomDraw,
  contentOptions: {
    activeTintColor: "white",
    labelStyle: {
      fontSize: 25,
    },
  },
});

const styles = StyleSheet.create({
  drawCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  drawStyle: {
    flex: 1,
    backgroundColor: "#EFA81F",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headerImage: {
    width: 58,
    height: 58,
  },
  logout: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logoutButton: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutContainer: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E19F1E",
  },
  Name: {
    fontSize: 20,
    marginRight: 40,
  },
});

export default createAppContainer(RootDrawNavigator);
