import React, { useEffect } from "react";
import { StyleSheet, View, Text, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { Dimensions } from "react-native-web";
import { AspectRatio } from "native-base";
import { useNavigation } from "@react-navigation/native";

const ScanQRCodeScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const [booking, setBooking] = React.useState([]);
  const [customerInfo, setcustomerInfo] = React.useState([]);
  const [scanText, setScanText] = React.useState("No code yet scanned");

  const getCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  };

  const codeScanned = ({ type, data }) => {
    setScanned(true);
    setScanText(data);    
    getTicketInfo(data,booking,customerInfo, navigation);
  };

  useEffect(() => {
    getCameraPermission();
  }, []);

  if (hasPermission === null) {
    return (
      <View>
        <Text>'Access to camera not set'</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View>
        <Text>'Access denied to camera'</Text>
        <Button title={"Allow Camera"} onPress={() => getCameraPermission()} />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          borderRadius: 50,
          backgroundColor: "#fff",
          width: 300,
          height: 300,
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : codeScanned}
          style={{
            width: "175%",
            height: "175%",
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>  setScanned(!scanned)}
      >
        <Text style={styles.text}>Scan Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const getTicketInfo = (ticketCode,booking,userID, navigation) => {
  fetch(global.API_DIRECTORY + global.TECH_BOOKING_FROM_ID, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      booking_id: ticketCode,
    }),
  })
    .then((response) => response.json())
    .then((responseJSON) => {
      booking = responseJSON;
      bringUpTicket(booking, userID, navigation);
    })
    .catch((e) => {
      console.error("oh no :(", e);
    });
};

const bringUpTicket = (item, customerInfo, navigation) => {
  fetch(global.API_DIRECTORY + global.TECH_CUSTOMERINFO_TICKETS, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: item.user_id,
    }),
  })
    .then((response) => response.json())
    .then((responseJSON) => {
      customerInfo = responseJSON;
      navigation.navigate("TechExpandedTicketScreen", {
        customerInfo,
        item,
      });
    })
    .catch((e) => {
      console.error("oh no :(", e);
    });
};

const styles = StyleSheet.create({
  button: {
    width: "80%",
    height: 60,
    borderRadius: 20,
    backgroundColor: "#EFA81F",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ScanQRCodeScreen;
