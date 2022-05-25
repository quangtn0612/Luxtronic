import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
  Linking,
} from "react-native";
import Card from "../shared/ticketsCard";
import AppTextInput from "../components/AppTextInput";

const TechUsersScreen = ({ navigation }) => {
  const [customerInfo, setcustomerInfo] = React.useState([]);
  const [search, setsearch] = React.useState("");

  return (
    // View set to entire screen
    <View style={{ flex: 1 }}>
      {/* // SafeAreaView accounts for notch on iOS devices */}
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1 }}>
          {/* Child view elements are ordered by columns */}

          {/* All List content in a view to manage flex spacing */}
          <View style={{ flex: 6 }}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AppTextInput
                icon="book-search"
                placeholder={"Search"}
                onChangeText={(search) => setsearch(search)}
              />
            </View>
            <FlatList
              data={navigation.getParam("usersList")}
              renderItem={({ item }) => (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {search == "" ||
                  search == item.user_id ||
                  search == item.email ||
                  search == item.phone_number ? (
                    <Card>
                      <View style={styles.IconContainer}>
                        <TouchableOpacity
                          style={styles.IconButton}
                          onPress={() => userDetails(item, navigation)}
                        >
                          <View style={styles.cardTextContainer}>
                            <View>
                              <Text style={styles.ticketText}>Email:</Text>
                              <Text style={styles.cardText}>{item.email}</Text>
                            </View>
                            <View>
                              <Text style={styles.ticketText}>First Name:</Text>

                              <Text style={styles.cardText}>
                                {item.first_name}
                              </Text>
                            </View>

                            <View>
                              <Text style={styles.ticketText}>
                                Phone Number:
                              </Text>
                              <Text style={styles.cardText}>
                                {item.phone_number}
                              </Text>
                            </View>
                            {item.status == "In Progress" &&
                            (item.job_request_response == "Accepted" ||
                              item.job_request_response == "Declined") ? (
                              <View>
                                <Text style={styles.ticketText}>
                                  Job Request Response:
                                </Text>
                                {item.job_request_response == "Accepted" ? (
                                  <View
                                    style={
                                      styles.jobRequestResponseStyleAccepted
                                    }
                                  >
                                    <Text style={styles.cardText}>
                                      {item.job_request_response}
                                    </Text>
                                  </View>
                                ) : (
                                  <View
                                    style={
                                      styles.jobRequestResponseStyleDeclined
                                    }
                                  >
                                    <Text style={styles.cardText}>
                                      {item.job_request_response}
                                    </Text>
                                  </View>
                                )}
                              </View>
                            ) : null}
                          </View>
                        </TouchableOpacity>
                      </View>
                    </Card>
                  ) : null}
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const userDetails = (item, navigation) => {
  navigation.navigate("TechExpandedUsersDetail", {
    item,
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
  },
  cardTextContainer: {
    flex: 1,
    width: "95%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  cardbuttonCancel: {
    width: "90%",
    height: 60,
    borderRadius: 20,
    backgroundColor: "#DB5A27",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  cardbuttonJobRequest: {
    width: "90%",
    height: 60,
    borderRadius: 20,
    backgroundColor: "#8000FF",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  cardbuttonBookPickup: {
    width: "90%",
    height: 60,
    borderRadius: 20,
    backgroundColor: "#0072C6",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  cardText: {
    margin: 5,
    fontSize: 20,
  },
  IconButton: {
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  IconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  ticketText: {
    margin: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  statusText: {
    margin: 5,
    fontSize: 20,
    color: "#fff",
  },
  ticketItemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  jobRequestResponseStyleAccepted: {
    width: "40%",
    height: 40,
    borderRadius: 5,
    backgroundColor: "#80B942",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  jobRequestResponseStyleDeclined: {
    width: "40%",
    height: 40,
    borderRadius: 5,
    backgroundColor: "#DB5A27",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  statusTextContainerPending: {
    width: "40%",
    height: 40,
    borderRadius: 20,
    backgroundColor: "#47B7D8",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  statusTextContainerProgress: {
    width: "40%",
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EFA81F",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  statusTextContainerComplete: {
    width: "40%",
    height: 40,
    borderRadius: 20,
    backgroundColor: "#80B942",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  statusTextContainerCancelled: {
    width: "40%",
    height: 40,
    borderRadius: 20,
    backgroundColor: "#DB5A27",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  statusTextContainerClosed: {
    width: "40%",
    height: 40,
    borderRadius: 20,
    backgroundColor: "#CCCCCC",
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});

export default TechUsersScreen;
