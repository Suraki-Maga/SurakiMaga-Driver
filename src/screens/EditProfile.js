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
import { getPathFromState } from "@react-navigation/native";

const EditProfile = ({ route, navigation }) => {
  const [formError, setFormError] = useState(null);
  const [mobileNo, setMobileNo] = useState({
    mobile: route.params.contact,
    otp: "",
    otpError: "",
  });
  const [editContactState, setEditContactState] = useState(false);
  const [pickedImage, setPickedImage] = useState("");
  const [contactError, setContactError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [msgVisible, setMsgVisible] = useState(false);
  const openPopUp = () => {
    setModalVisible(true);
  };
  const [fetchData, setFetchData] = useState({
    image: "",
  });
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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

  const checkCurrentPassword = async () => {
    const { data, error } = await apiClient.checkCurrentPassword({
      currentPassword: form.currentPassword,
    });
    console.log(data);
    if (data.result == "invalid") {
      setFormError("Current password is not matched :(");
    } else {
      setFormError(null);
      if (form.newPassword == "") {
        setFormError("Password can't be empty");
      } else if (form.confirmPassword == "") {
        setFormError("Please confirm your new password");
      } else if (form.newPassword.length < 8) {
        setFormError("Password length should be atleast 8 characters long");
      } else if (form.newPassword != form.confirmPassword) {
        setFormError("Password and the confirmation doesn't match");
      } else {
        const { data, error } = await apiClient.setNewPassword({
          newPassword: form.newPassword,
        });
        if (data.result == "done") {
          setMsgVisible(true);
          setForm({
            ...form,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
        console.log(data);
      }
    }
  };

  const changeMobileNo = async () => {
    console.log(mobileNo.mobile);
    if (mobileNo.mobile == "") {
      setContactError("Mobile Number can't be empty");
    } else if (mobileNo.mobile.length != 10) {
      setContactError("Mobile Number should have 10 numbers");
    } else if (mobileNo.mobile.charAt(0) != "0") {
      setContactError("Mobile Number should started with '0'");
    } else {
      setOtpModalVisible(true);
      const { data, error } = await apiClient.getOtpForNewNo({
        mobileNo: mobileNo.mobile,
      });
      console.log(data);
      setMobileNo({ ...mobileNo, respond: data.result });
    }
  };
  const submitMobileNo = async () => {
    if (mobileNo.otp == "") {
      setMobileNo({ ...mobileNo, otpError: "Otp can't be empty" });
    } else {
      const { data, error } = await apiClient.submitContact({
        otp: mobileNo.otp,
        mobileNo: mobileNo.mobile,
      });
      console.log(data);
      if (data.result == "failed") {
        setMobileNo({ ...mobileNo, otpError: "Otp doesn't match" });
      } else {
        setOtpModalVisible(!otpModalVisible);
        setEditContactState(!editContactState);
      }
    }
  };
  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "#4c69a5" }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      {/* password changed */}
      <Modal
        animationType="fade"
        transparent
        style={styles.alert2}
        visible={msgVisible}
        onRequestClose={() => {
          setMsgVisible(!msgVisible);
        }}
      >
        <View style={styles.alert2}>
          <View style={styles.alertbox2}>
            <Text style={styles.alertTitle2}>
              Password changed sucessfully!
            </Text>
            <TouchableOpacity
              style={styles.confirmbtn2}
              onPress={() => setMsgVisible(!msgVisible)}
            >
              <Text style={styles.confirmbtnText2}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* photo upload */}
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
      {/* otp pop up */}
      <Modal
        animationType="fade"
        transparent
        style={styles.alert}
        visible={otpModalVisible}
        onRequestClose={() => {
          setOtpModalVisible(!otpModalVisible);
        }}
      >
        <View style={styles.alert3}>
          <View style={styles.alertbox3}>
            <View style={styles.alertHeader}>
              <Text style={styles.alertTitle}>Otp Verification</Text>
              <Text style={styles.alertbodyTxt}>
                Otp has been sent to {mobileNo.mobile}
              </Text>
            </View>
            <View style={styles.alertBody3}>
              <TextInput
                style={styles.textInput2}
                mode="outlined"
                label="Enter the otp"
                value={mobileNo.otp}
                onChangeText={(text) => setMobileNo({ ...mobileNo, otp: text })}
                theme={{
                  colors: { primary: "#FF8C01", underlineColor: "#FF8C01" },
                }}
                left={<TextInput.Icon name="plus" />}
              />
              <View style={styles.noticeOtptMsg}>
                <Text style={styles.noticeMsgText}>{mobileNo.otpError}</Text>
              </View>
              <TouchableOpacity
                style={styles.confirmbtn2}
                onPress={submitMobileNo}
              >
                <Text style={styles.confirmbtnText2}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setOtpModalVisible(!otpModalVisible)}
              >
                <Text style={styles.confirmbtnText3}>Resend otp</Text>
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
            style={styles.textInput2}
            mode="outlined"
            label="Contact No"
            value={mobileNo.mobile}
            editable={editContactState}
            onChangeText={(text) => setMobileNo({ ...mobileNo, mobile: text })}
            theme={{
              colors: { primary: "#FF8C01", underlineColor: "#FF8C01" },
            }}
            left={<TextInput.Icon name="account" />}
          />
          {editContactState ? (
            <View style={styles.contactEdit}>
              <TouchableOpacity onPress={changeMobileNo}>
                <Image
                  source={require("../../assets/images/correct.jpg")}
                  style={styles.correctButton}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setEditContactState(!editContactState)}
              >
                <Image
                  source={require("../../assets/images/incorrect.png")}
                  style={styles.IncorrectIcon}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.contactEdit}>
              <TouchableOpacity
                onPress={() => setEditContactState(!editContactState)}
              >
                <Image
                  source={require("../../assets/images/editicon.png")}
                  style={styles.enableEditIcon}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.noticeContactMsg}>
          <Text style={styles.noticeMsgText}>{contactError}</Text>
        </View>
      </View>
      <Text style={styles.passwordTitle}>Change Password</Text>
      <View style={styles.editContainer}>
        <View style={styles.changePasswordContainer}>
          <TextInput
            style={styles.textInput}
            mode="outlined"
            label="Current Password"
            secureTextEntry
            value={form.currentPassword}
            theme={{
              colors: { primary: "#FF8C01", underlineColor: "#FF8C01" },
            }}
            onChangeText={(text) => setForm({ ...form, currentPassword: text })}
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
            value={form.newPassword}
            theme={{
              colors: { primary: "#FF8C01", underlineColor: "#FF8C01" },
            }}
            onChangeText={(text) => setForm({ ...form, newPassword: text })}
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
            value={form.confirmPassword}
            secureTextEntry
            theme={{
              colors: { primary: "#FF8C01", underlineColor: "#FF8C01" },
            }}
            onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
            left={<TextInput.Icon name="lock" />}
            right={<TextInput.Icon name="eye" />}
          />
        </View>
      </View>
      {formError != null ? (
        <View style={styles.noticeMsg}>
          <Text style={styles.noticeMsgText}>{formError}</Text>
        </View>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={checkCurrentPassword}>
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
  IncorrectIcon: {
    width: 30,
    height: 30,
  },
  correctButton: {
    width: 35,
    height: 35,
  },
  enableEditIcon: {
    width: 25,
    height: 25,
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
    justifyContent: "center",
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
  textInput2: {
    width: (parameters.SCREEN_WIDTH * 3.2) / 6,
    height: 40,
    marginBottom: 10,
    backgroundColor: "white",
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
    justifyContent: "space-between",
  },
  editTitle: {
    fontSize: 18,
  },
  passwordTitle: {
    color: colors.font,
    fontSize: 25,
    fontFamily: "sans-serif-medium",
    marginTop: 60,
    marginBottom: 20,
  },
  contactEdit: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: 100,
    height: 50,
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
    marginTop: 20,
    marginBottom: 10,
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
  alert3: {
    flex: 1,
    backgroundColor: "#00000090",
    alignItems: "center",
    justifyContent: "center",
    width: parameters.SCREEN_WIDTH,
    height: parameters.SCREEN_HEIGHT,

    // backgroundColor:'red',
  },
  alertbox3: {
    display: "flex",
    borderRadius: 5,
    alignItems: "center",
    width: (parameters.SCREEN_WIDTH * 3.2) / 4,
    height: (parameters.SCREEN_HEIGHT * 4) / 10,
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
  alertBody3: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "55%",
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
  confirmbtnText3: {
    alignSelf: "center",
    justifyContent: "center",
    color: colors.orange,
    fontSize: 20,
    marginTop: -2,
  },
  noticeMsg: {
    marginTop: 5,
    marginBottom: 5,
    display: "flex",
    height: 30,
    width: (parameters.SCREEN_WIDTH * 5) / 6,
    alignItems: "center",
    justifyContent: "center",
  },
  noticeContactMsg: {
    marginTop: 5,
    marginBottom: 5,
    display: "flex",
    height: 30,
    width: (parameters.SCREEN_WIDTH * 5) / 6,
    alignItems: "center",
    justifyContent: "center",
  },
  noticeOtpMsg: {
    marginTop: 5,
    marginBottom: 5,
    display: "flex",
    height: 20,
    width: (parameters.SCREEN_WIDTH * 5) / 6,
    alignItems: "center",
    justifyContent: "center",
  },
  noticeMsgText: {
    color: "red",
    fontSize: 15,
  },
  alert2: {
    flex: 1,
    backgroundColor: "#00000090",
    alignItems: "center",
    justifyContent: "center",
    width: parameters.SCREEN_WIDTH,
    height: parameters.SCREEN_HEIGHT,

    // backgroundColor:'red',
  },
  alertbox2: {
    paddingTop: 5,
    display: "flex",
    borderRadius: 5,
    justifyContent: "space-evenly",
    alignItems: "center",
    width: (parameters.SCREEN_WIDTH * 3) / 4,
    height: (parameters.SCREEN_HEIGHT * 4) / 20,
    backgroundColor: colors.midBoxWhite,
    // shadowColor: '#171717',
    // shadowOffset: {width: -3, height: 4},
    // shadowOpacity: 1,
    // shadowRadius: 3,
  },
  alertTitle2: {
    fontSize: 20,
  },
  confirmbtn2: {
    height: 40,
    width: parameters.SCREEN_WIDTH / 4,
    backgroundColor: colors.orange,
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  confirmbtnText2: {
    alignSelf: "center",
    justifyContent: "center",
    color: colors.white,
    fontSize: 20,
    marginTop: -2,
  },
});
