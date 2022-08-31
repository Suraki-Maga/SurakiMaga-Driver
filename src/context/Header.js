import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import apiClient from "../Services/apiClient";
import React, { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import { colors, parameters } from "../globals/styles";

const Header = () => {
  const isFocused = useIsFocused();
  const [fetchData, setFetchData] = useState({
    image: "",
  });
  useEffect(() => {
    async function getKind() {
      const { data, error } = await apiClient.loadDetails();
      console.log(data);

      setFetchData({
        image: data.result.image,
      });
    }

    getKind();
  }, [isFocused]);
  return (
    <View style={styles.header}>
      <View style={styles.leftSideOfHeader}>
        <Image
          source={require("../../assets/images/logo.jpg")}
          style={styles.logo}
        />
      </View>
      <View style={styles.rightSideOfHeader}>
        <TouchableOpacity style={styles.icon2}>
          <Icon
            type="material-community"
            name="bell"
            color={colors.grey}
            size={30}
          />
        </TouchableOpacity>
        {fetchData.image ? (
          <Image
            source={{ uri: fetchData.image }}
            style={styles.profilePicSmall}
          />
        ) : (
          <Image
            source={require("../../assets/images/profilePic.jpg")}
            style={styles.profilePicSmall}
          />
        )}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 30,
    elevation: 10,
    zIndex: 1000,
    marginTop: parameters.statusBarHeight,
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.midBoxWhite,
    height: parameters.headerHeight,
    borderRadius: 10,
    alignItems: "center",
    width: (parameters.SCREEN_WIDTH * 9) / 10,
    justifyContent: "space-between",
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,

    // height:parameters.SCREEN_HEIGHT/7,
  },
  leftSideOfHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    //   paddingLeft:parameters.SCREEN_WIDTH/20
  },
  rightSideOfHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: parameters.SCREEN_WIDTH / 20,
  },
  icon2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 100,
  },
  profilePicSmall: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  logo: {
    marginLeft: 20,
    width: (parameters.SCREEN_WIDTH * 1) / 8,
    height: (parameters.SCREEN_HEIGHT * 0.5) / 8,
  },
});
