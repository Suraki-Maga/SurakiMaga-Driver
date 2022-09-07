import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { TextInput } from "react-native-paper";
import apiClient from "../Services/apiClient";
import { Icon } from "react-native-elements";
import { colors, parameters } from "../globals/styles";
import React, { useState, useEffect } from "react";
import Slideshow from "react-native-image-slider-show";
import Header from "../context/Header";

const SchoolVan = ({ navigation }) => {
  const [imageUrl, setImageUrl] = useState([]);
  const [information, setInformation] = useState({
    owner: "",
    seats: "",
    vehicleno: "",
  });
  useEffect(() => {
    apiClient
      .getToken()
      .then((data) => data)
      .then((value) => {
        if (value == "") {
          navigation.navigate("Login");
        } else {
          apiClient.setToken(value);
        }
      })
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    const loadVehicleInformation = async () => {
      const { data, error } = await apiClient.loadVehicleInformation();
      console.log(data);
      if (data.result != "unavailable") {
        setInformation({
          owner: data.result.name,
          seats: data.result.seats,
          vehicleno: data.result.vehicleno,
        });
      }
    };
    loadVehicleInformation();
  }, []);

  useEffect(() => {
    const loadVehicleImages = async () => {
      const { data, error } = await apiClient.loadVehicleImages();
      console.log(data);
      if (data.result != "unavailable") {
        setImageUrl(data.result);
        // data.result.map((obj) => {
        //   imageUrl.push(obj.Image);
        // });
      }
    };
    loadVehicleImages();
    // console.log(imageUrl);
  }, []);
  let imageBucket = [];
  imageUrl.map((data) => {
    let image = {
      url: data.image,
    };
    imageBucket.push(image);
  });
  console.log(imageBucket);
  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
            <View style={styles.leftSideOfHeader}>
                <Image source={require('../../assets/images/logo.jpg')} style={styles.logo}/> 
            </View>
            <View style={styles.rightSideOfHeader}>
            <TouchableOpacity style={styles.icon2}> 
                <Icon type="material-community"
                    name="bell"
                    color={colors.grey}
                    size={30} />
            </TouchableOpacity>
            <Image source={require('../../assets/images/profilePic.jpg')} style={styles.profilePicSmall}/>   
            </View>   
        </View> */}
      <Header />

      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.nameView}>
          <Text style={styles.title}>School Van</Text>
        </View>

        <Slideshow
          containerStyle={styles.slideshow}
          overlay={true}
          dataSource={imageBucket}
        />
        <View style={styles.nameBox4}>
          <View style={styles.informationTopic}>
            <Text style={styles.informationTopicText}>
              Emegency Notification
            </Text>
          </View>
          <View style={styles.emergencyBody}>
            <TextInput
              style={styles.textInput}
              mode="outlined"
              label="Add Emergency message here..."
              theme={{
                colors: { primary: "#FF8C01", underlineColor: "#FF8C01" },
              }}
              onChangeText={(text) => setForm({ ...form, userName: text })}
              left={<TextInput.Icon name="plus" />}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Broadcast</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.nameBox2}>
          <View style={styles.informationTopic}>
            <Text style={styles.informationTopicText}>Information</Text>
          </View>
          <View style={styles.informationBody}>
            <View style={styles.informationDetail}>
              <Text style={styles.informationDetailText}>Vehicle No</Text>
              <Text style={styles.informationDetailText}>
                {information.vehicleno}
              </Text>
            </View>
            <View style={styles.informationDetail}>
              <Text style={styles.informationDetailText}>Owner</Text>
              <Text style={styles.informationDetailText}>
                {information.owner}
              </Text>
            </View>
            <View style={styles.informationDetail}>
              <Text style={styles.informationDetailText}>No of Seats</Text>
              <Text style={styles.informationDetailText}>
                {information.seats}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.nameBox2}>
          <View style={styles.informationTopic}>
            <Text style={styles.informationTopicText}>Today Trip</Text>
          </View>
          <View style={styles.informationBody}>
            <View style={styles.informationDetail}>
              <Text style={styles.informationDetailText}>Destination 1</Text>
            </View>
            <TouchableOpacity style={styles.informationDetail2}>
              <Icon
                type="material-community"
                name="map-marker"
                color={colors.grey2}
                size={30}
              />
              <Text style={styles.informationDetailText2}>
                D.S. Senanayake College
              </Text>
            </TouchableOpacity>
            <View style={styles.informationDetail}>
              <Text style={styles.informationDetailText}>Destination 2</Text>
            </View>
            <TouchableOpacity style={styles.informationDetail2}>
              <Icon
                type="material-community"
                name="map-marker"
                color={colors.grey2}
                size={30}
              />
              <Text style={styles.informationDetailText2}>Vishaka College</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.nameBox3}>
          <TouchableOpacity style={styles.button2}>
            <Image
              style={{
                width: 20,
                height: 20,
                resizeMode: "cover",
                tintColor: colors.orange,
                marginRight: 5,
              }}
              source={require("../../assets/images/list-icon.png")}
            />
            <Text style={styles.button2Text}>Morning student list</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.navigate("StudentList")}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                resizeMode: "cover",
                tintColor: colors.orange,
                marginRight: 5,
              }}
              source={require("../../assets/images/list-icon.png")}
            />
            <Text style={styles.button2Text}>Evening student list</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SchoolVan;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: colors.white,
    height: parameters.SCREEN_HEIGHT,
    paddingTop: parameters.statusBarHeight,
    alignItems: "center",
  },
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
  scrollview: {
    display: "flex",
    marginBottom: 20,
  },
  slideshow: {
    alignSelf: "center",
    width: parameters.SCREEN_WIDTH,
    height: (parameters.SCREEN_HEIGHT * 1) / 4,
    borderRadius: 10,
    backgroundColor: colors.orange,
  },
  nameView: {
    marginTop: parameters.SCREEN_HEIGHT / 6,
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
  nameBox2: {
    display: "flex",
    backgroundColor: colors.midBoxWhite,
    alignSelf: "center",
    width: (parameters.SCREEN_WIDTH * 11) / 12,
    height: parameters.SCREEN_HEIGHT / 4,
    alignItems: "center",
    marginTop: "7%",
    borderRadius: 10,
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  nameBox3: {
    display: "flex",
    backgroundColor: colors.orange,
    alignSelf: "center",
    width: (parameters.SCREEN_WIDTH * 11) / 12,
    height: parameters.SCREEN_HEIGHT / 5,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: "7%",
    marginBottom: parameters.SCREEN_HEIGHT / 8,
    borderRadius: 10,
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  informationTopic: {
    display: "flex",
    borderRadius: 10,
    width: "85%",
    height: "30%",
    justifyContent: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 2,
  },
  informationTopicText: {
    color: colors.grey,
    fontWeight: "bold",
    fontSize: 20,
  },
  informationDetailText: {
    color: colors.grey,
    fontSize: 18,
  },
  informationDetailText2: {
    color: colors.grey2,
    fontSize: 18,
  },
  informationBody: {
    display: "flex",
    borderRadius: 10,
    width: "100%",
    height: "70%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  informationDetail: {
    display: "flex",
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  informationDetail2: {
    display: "flex",
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
  },
  button2: {
    display: "flex",
    flexDirection: "row",
    height: 45,
    width: 240,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button2Text: {
    color: colors.orange,
    fontSize: 22,
    fontFamily: "sans-serif-medium",
    marginTop: -2,
  },
  textInput: {
    width: (parameters.SCREEN_WIDTH * 4) / 6,
    height: 50,
    marginBottom: 10,
    backgroundColor: "white",
  },
  emergencyBody: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "70%",
  },
  button: {
    height: 40,
    width: 120,
    backgroundColor: colors.orange,
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    alignSelf: "center",
    justifyContent: "center",
    color: colors.white,
    fontSize: 17,
    marginTop: -2,
  },
  nameBox4: {
    display: "flex",
    backgroundColor: colors.midBoxWhite,
    alignSelf: "center",
    width: (parameters.SCREEN_WIDTH * 11) / 12,
    height: parameters.SCREEN_HEIGHT / 3,
    alignItems: "center",
    marginTop: "7%",
    borderRadius: 10,
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
