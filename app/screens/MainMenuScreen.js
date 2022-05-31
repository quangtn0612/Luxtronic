import React, { useEffect } from "react";
import SmallCard from "../screens/SmallCard";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Card from "../shared/mainmenuCard";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";

const MainMenuScreen = ({ navigation }) => {
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  React.useEffect(() => {
    checkIsAllowedUsingFingerPrint();
  }, []);

  checkIsAllowedUsingFingerPrint = async () => {
    const isAllowedToUseFaceIDFingerPrint = await SecureStore.getItemAsync(
      "isAllowedToUseFaceIDFingerPrint"
    );
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();

    //check if faceid and fingerprint is not yet set and hardware has the faceid or fingerprint
    if (isAllowedToUseFaceIDFingerPrint == null && types && types.length)
      Alert.alert(
        "FaceID or FingerPrint",
        "Would you like to use FaceID/FingerPrint next time?",
        [
          {
            text: "Cancel",
            onPress: () => save("isAllowedToUseFaceIDFingerPrint", "false"),
            style: "cancel",
          },

          {
            text: "OK",
            onPress: () => save("isAllowedToUseFaceIDFingerPrint", "true"),
          },
        ]
      );
  };
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.background}>
        <ScrollView>
          <View
            style={{
              width: "100%",
              flex: 5,
              marginTop: "2%",
              height: 30,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: "100%",
              }}
            ></View>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              border: "solid",
              borderRadius: 15,
              color: "#dedada",
            }}
          >
            <Card>
              <View style={{}}>
                <TouchableOpacity
                  style={styles.IconButton}
                  onPress={() => {
                    navigation.navigate("ServiceListScreen");
                  }}
                >
                  <MaterialCommunityIcons
                    name={"room-service"}
                    size={130}
                    color={"#EFA81F"}
                  />
                  <Text style={styles.IconText}>Our Services</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>

          {/* Second Card*/}

          <View
            style={{
              width: "100%",
              flex: 5,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                marginBottom: 10,
                marginTop: 10,
              }}
            ></View>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              border: "solid",
              borderRadius: 15,
              color: "#dedada",
            }}
          >
            <Card>
              <View>
                <TouchableOpacity
                  style={styles.IconButton}
                  onPress={() => {
                    navigation.navigate("CreateBookingScreen");
                  }}
                >
                  <MaterialCommunityIcons
                    name={"book"}
                    size={130}
                    color={"#DB5A27"}
                  />
                  <Text style={styles.IconText}>Book a Services</Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>

          {/* Third Card*/}

          <View
            style={{
              width: "100%",
              flex: 5,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: 10,
                width: "100%",
                marginBottom: 10,
              }}
            ></View>
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              border: "solid",
              borderRadius: 15,
              color: "#dedada",
            }}
          >
            <Card>
              <View>
                <TouchableOpacity
                  style={styles.IconButton}
                  onPress={() => {
                    navigation.navigate("BookingsScreen");
                  }}
                >
                  <MaterialCommunityIcons
                    name={"book-multiple"}
                    size={130}
                    color={"#80B942"}
                  />
                  <Text style={{ ...styles.IconText, marginLeft: 0 }}>
                    Bookings
                  </Text>
                </TouchableOpacity>
              </View>
            </Card>
          </View>

          <View style={{ flex: 1 }} />
          <View style={{ flex: 1 }} />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              border: "solid",
              color: "red",
              height: 10,
              borderColor: "orange",
              borderBottomWidth: 3,
              borderBottomColor: "orange",
            }}
          />

          {/* Fourth Card*/}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <SmallCard>
              <View style={styles.cardContainer}>
                <View style={styles.IconContainer}>
                  <TouchableOpacity
                    style={styles.IconButton}
                    onPress={() => {
                      navigation.navigate("ContactUsScreen");
                    }}
                  >
                    <MaterialCommunityIcons
                      name={"contacts"}
                      size={70}
                      color={"#65BEAC"}
                      style={{
                        marginTop: -10,
                      }}
                    />

                    <Text
                      style={{
                        ...styles.IconText,
                        padding: 1,
                        marginTop: 2,
                        zIndex: 1000,
                      }}
                    >
                      Contact Us
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SmallCard>

            {/* Fifth Card*/}

            <SmallCard>
              <View style={styles.cardContainer}>
                <View style={styles.IconContainer}>
                  <TouchableOpacity
                    style={styles.IconButton}
                    onPress={() => {
                      Linking.openURL(
                        "https://luxtronic.com.au/legal-stuff/terms-of-condition-1/"
                      );
                    }}
                  >
                    <MaterialCommunityIcons
                      name={"file-document"}
                      size={80}
                      color={"#CCCCCC"}
                    />
                    <Text style={{ ...styles.IconText, padding: 1 }}>
                      Term and Conditions
                    </Text>
                    <Text style={styles.IconText} />
                  </TouchableOpacity>
                </View>
              </View>
            </SmallCard>
          </View>

          <View style={{ flex: 1 }} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: "100%",
    marginHorizontal: 10,
    marginVertical: 10,
    marginTop: 30,
  },
  secondLabel: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: -10,
  },
  IconButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 20,
  },
  labelText: {
    color: "blue",
    fontSize: 20,
  },
  IconContainer: {
    marginTop: 10,
  },
  IconText: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 0,
  },
  vCenter: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  labelStyle: {
    maxHeight: 30,
  },
});

export default MainMenuScreen;
