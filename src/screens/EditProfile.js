import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  DevSettings,
} from "react-native";

import apiClient from "../Services/apiClient";
import { colors, parameters } from "../globals/styles";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditProfile = ({ route, navigation }) => {
  const [pickedImage, setPickedImage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const openPopUp = () => {
    setModalVisible(true);
  };
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
  }, [navigation]);

  const turnOnCamera = async () => {
    setModalVisible(!modalVisible);
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.cancelled) {
      let newfile = {
        uri: result.uri,
        type: `test/${result.uri.split(".")[1]}`,
        name: `test.${result.uri.split(".")[1]}`,
      };
      submitDetails(newfile);
    }

    //second method
  };
  const turnOnPicture = async () => {
    setModalVisible(!modalVisible);
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      let newfile = {
        uri: result.uri,
        type: `test/${result.uri.split(".")[1]}`,
        name: `test.${result.uri.split(".")[1]}`,
      };
      submitDetails(newfile);
    }
  };
  const submitDetails = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "dskmbhbt");
    data.append("cloud_name", "surakimagaimagecloud");
    fetch("https://api.cloudinary.com/v1_1/surakimagaimagecloud/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);
        let { dataResponse, error } = apiClient.changeProfilePicture({
          profilePic: data.url,
        });
        //check success
        setFetchData({ image: data.url });
      });
  };
  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "#4c69a5" }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <Modal
        animationType="fade"
        transparent
        style={styles.alert}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.alert}>
          <View style={styles.alertbox}>
            <View style={styles.alertHeader}>
              <Text style={styles.alertTitle}>Upload Photo</Text>
              <Text style={styles.alertbodyTxt}>Pick a profile picture</Text>
            </View>
            <View style={styles.alertBody}>
              <TouchableOpacity
                style={styles.confirmbtn}
                onPress={turnOnCamera}
              >
                <Text style={styles.confirmbtnText}>Take a picture</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmbtn}
                onPress={turnOnPicture}
              >
                <Text style={styles.confirmbtnText}>Upload from gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmbtn}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.confirmbtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.nameView}>
        <Text style={styles.title}>Edit Profile</Text>
      </View>
      <View style={styles.picAndEdit}>
        {fetchData.image ? (
          <Image
            source={{ uri: fetchData.image }}
            style={styles.profilePicBig}
          />
        ) : (
          <Image
            source={require("../../assets/images/profilePic.jpg")}
            style={styles.profilePicBig}
          />
        )}
        <TouchableOpacity style={styles.editprofileBtn} onPress={openPopUp}>
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
  alert: {
    flex: 1,
    backgroundColor: "#00000090",
    alignItems: "center",
    justifyContent: "center",
    width: parameters.SCREEN_WIDTH,
    height: parameters.SCREEN_HEIGHT,

    // backgroundColor:'red',
  },
  alertbox: {
    display: "flex",
    borderRadius: 5,
    alignItems: "center",
    width: (parameters.SCREEN_WIDTH * 3.2) / 4,
    height: (parameters.SCREEN_HEIGHT * 4) / 12,
    backgroundColor: colors.midBoxWhite,
    // shadowColor: '#171717',
    // shadowOffset: {width: -3, height: 4},
    // shadowOpacity: 1,
    // shadowRadius: 3,
  },
  alertHeader: {
    display: "flex",
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "pink",
  },
  alertBody: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
    height: "60%",
    paddingBottom: 10,
    // backgroundColor: "yellow",
  },
  alertTitle: {
    fontWeight: "bold",
    fontSize: 30,
  },
  alertbodyTxt: {
    fontSize: 18,
  },
  confirmbtn: {
    height: 40,
    width: "80%",
    backgroundColor: colors.orange,
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
  },
  confirmbtnText: {
    alignSelf: "center",
    justifyContent: "center",
    color: colors.white,
    fontSize: 20,
    marginTop: -2,
  },
});
