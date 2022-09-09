import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const NotAssignedError = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.topic}>You are not Assigned :(</Text>
        <Image
          source={require("../../assets/images/notAssigned.png")}
          style={styles.middleImage}
        />
        <Text style={styles.text}>
          Sorry. You haven't access for this page. Your vehicle owner might not
          assigned you for a vehicle yet. Better to contact him.
        </Text>
      </View>
    </View>
  );
};

export default NotAssignedError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  subcontainer: {
    alignItems: "center",
    justifyContent: "space-around",
    height: "80%",
  },
  middleImage: {
    width: 300,
    height: 300,
  },
  topic: {
    fontSize: 60,
    fontWeight: "700",
  },
  text: {
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
    padding: 30,
  },
});
