import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { colors, parameters } from "../globals/styles";
import { TextInput } from "react-native-paper";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditProfile = ({ route, navigation }) => {
  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "#4c69a5" }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <View style={styles.nameView}>
        <Text style={styles.title}>Edit Profile</Text>
      </View>
      <View style={styles.picAndEdit}>
        <Image
          source={require("../../assets/images/profilePic.jpg")}
          style={styles.profilePicBig}
        />
        <TouchableOpacity style={styles.editprofileBtn}>
          <Image
            source={require("../../assets/images/editicon.png")}
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.editContainer}>
        <View style={styles.editTxtandBtn}>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Contact No"
            value={route.params.contact}
            editable={false}
            theme={{
              colors: { primary: "#FF8C01", underlineColor: "#FF8C01" },
            }}
            left={<TextInput.Icon name="account" />}
          />
        </View>
        <Image
          source={require("../../assets/images/editicon.png")}
          style={styles.enableEditIcon}
        />
      </View>
      <Text style={styles.passwordTitle}>Change Password</Text>
      <View style={styles.editContainer}>
        <View style={styles.changePasswordContainer}>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Current Password"
            secureTextEntry
            theme={{
              colors: { primary: "#FF8C01", underlineColor: "#FF8C01" },
            }}
            onChangeText={(text) => setForm({ ...form, password: text })}
            left={<TextInput.Icon name="lock" />}
            right={<TextInput.Icon name="eye" />}
          />
        </View>
      </View>
      <View style={styles.editContainer}>
        <View style={styles.changePasswordContainer}>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="New Password"
            secureTextEntry
            theme={{
              colors: { primary: "#FF8C01", underlineColor: "#FF8C01" },
            }}
            onChangeText={(text) => setForm({ ...form, password: text })}
            left={<TextInput.Icon name="lock" />}
            right={<TextInput.Icon name="eye" />}
          />
        </View>
      </View>
      <View style={styles.editContainer}>
        <View style={styles.changePasswordContainer}>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Confirm New Password"
            secureTextEntry
            theme={{
              colors: { primary: "#FF8C01", underlineColor: "#FF8C01" },
            }}
            onChangeText={(text) => setForm({ ...form, password: text })}
            left={<TextInput.Icon name="lock" />}
            right={<TextInput.Icon name="eye" />}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: colors.white,
    height: parameters.SCREEN_HEIGHT,
    paddingTop: parameters.statusBarHeight,
    alignItems: "center",
  },
  nameView: {
    marginTop: 25,
    display: "flex",
    width: parameters.SCREEN_WIDTH,
    height: parameters.SCREEN_HEIGHT / 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.font,
    fontSize: 30,
    fontFamily: "sans-serif-medium",
    marginTop: -2,
  },
  profilePicBig: {
    width: 180,
    height: 180,
    borderRadius: 100,
  },
  editprofileBtn: {
    alignSelf: "flex-end",
    marginRight: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.orange,
    width: 35,
    height: 35,
    backgroundColor: colors.midBoxWhite,
    borderRadius: 20,
  },
  editIcon: {
    width: 20,
    height: 20,
    tintColor: colors.orange,
  },
  enableEditIcon: {
    width: 20,
    height: 20,
    tintColor: colors.orange,
  },
  picAndEdit: {
    display: "flex",
    height: parameters.SCREEN_HEIGHT / 5,
    width: (parameters.SCREEN_WIDTH * 1.8) / 4,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 50,
  },
  editContainer: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: (parameters.SCREEN_WIDTH * 5) / 6,
    height: 40,
  },
  changePasswordContainer: {
    marginTop: 15,
    display: "flex",
    backgroundColor: "orange",
    alignItems: "center",
    width: (parameters.SCREEN_WIDTH * 5) / 6,
    height: 50,
  },
  textInput: {
    width: (parameters.SCREEN_WIDTH * 4) / 6,
    height: 40,
    marginBottom: 10,
    backgroundColor: "white",
  },
  editTxtandBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  editTitle: {
    fontSize: 18,
  },
  passwordTitle: {
    color: colors.font,
    fontSize: 25,
    fontFamily: "sans-serif-medium",
    marginTop: 50,
    marginBottom: 20,
  },
  changePasswordContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    height: 50,
    width: (parameters.SCREEN_WIDTH * 4) / 6,
    backgroundColor: colors.orange,
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  buttonText: {
    alignSelf: "center",
    justifyContent: "center",
    color: colors.white,
    fontSize: 20,
    marginTop: -2,
  },
});
