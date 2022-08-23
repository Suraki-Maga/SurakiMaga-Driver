import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import Header from "../context/Header";
import { colors, parameters } from "../globals/styles";

const StudentList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.nameView}>
          <Text style={styles.title}>Morning Student List</Text>
        </View>
        <TouchableOpacity style={styles.studentNameContainer}>
          <View style={styles.studentProfilePic}>
            <Image
              source={require("../../assets/images/profilePic.jpg")}
              style={styles.profilePicSmall}
            />
          </View>
          <View style={styles.nameAndStatus}>
            <View style={styles.name}>
              <Text style={styles.nameText}>Prasad Lakshan</Text>
            </View>
            <View style={styles.status}>
              <Text style={styles.statusText}>Status</Text>
              <Text style={styles.statusText}>Present</Text>
            </View>
          </View>
          <View style={styles.rightSide}>
            <Image
              source={require("../../assets/images/sideArrow.png")}
              style={styles.sideArrow}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.studentNameContainer}>
          <View style={styles.studentProfilePic}>
            <Image
              source={require("../../assets/images/profilePic.jpg")}
              style={styles.profilePicSmall}
            />
          </View>
          <View style={styles.nameAndStatus}>
            <View style={styles.name}>
              <Text style={styles.nameText}>Asitha Muthumala</Text>
            </View>
            <View style={styles.status}>
              <Text style={styles.statusText}>Status</Text>
              <Text style={styles.statusText}>Present</Text>
            </View>
          </View>
          <View style={styles.rightSide}>
            <Image
              source={require("../../assets/images/sideArrow.png")}
              style={styles.sideArrow}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.studentNameContainer}>
          <View style={styles.studentProfilePic}>
            <Image
              source={require("../../assets/images/profilePic.jpg")}
              style={styles.profilePicSmall}
            />
          </View>
          <View style={styles.nameAndStatus}>
            <View style={styles.name}>
              <Text style={styles.nameText}>Nishamal Perera</Text>
            </View>
            <View style={styles.status}>
              <Text style={styles.statusText}>Status</Text>
              <Text style={styles.statusText}>Present</Text>
            </View>
          </View>

          <View style={styles.rightSide}>
            <Image
              source={require("../../assets/images/sideArrow.png")}
              style={styles.sideArrow}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.studentNameContainer}>
          <View style={styles.studentProfilePic}>
            <Image
              source={require("../../assets/images/profilePic.jpg")}
              style={styles.profilePicSmall}
            />
          </View>
          <View style={styles.nameAndStatus}>
            <View style={styles.name}>
              <Text style={styles.nameText}>Akila Dissanayake</Text>
            </View>
            <View style={styles.status}>
              <Text style={styles.statusText}>Status</Text>
              <Text style={styles.statusText}>Present</Text>
            </View>
          </View>

          <View style={styles.rightSide}>
            <Image
              source={require("../../assets/images/sideArrow.png")}
              style={styles.sideArrow}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.studentNameContainer}>
          <View style={styles.studentProfilePic}>
            <Image
              source={require("../../assets/images/profilePic.jpg")}
              style={styles.profilePicSmall}
            />
          </View>
          <View style={styles.nameAndStatus}>
            <View style={styles.name}>
              <Text style={styles.nameText}>Prasad Lakshan</Text>
            </View>
            <View style={styles.status}>
              <Text style={styles.statusText}>Status</Text>
              <Text style={styles.statusText}>Present</Text>
            </View>
          </View>
          <View style={styles.rightSide}>
            <Image
              source={require("../../assets/images/sideArrow.png")}
              style={styles.sideArrow}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.studentNameContainer}>
          <View style={styles.studentProfilePic}>
            <Image
              source={require("../../assets/images/profilePic.jpg")}
              style={styles.profilePicSmall}
            />
          </View>
          <View style={styles.nameAndStatus}>
            <View style={styles.name}>
              <Text style={styles.nameText}>Asitha Muthumala</Text>
            </View>
            <View style={styles.status}>
              <Text style={styles.statusText}>Status</Text>
              <Text style={styles.statusText}>Present</Text>
            </View>
          </View>
          <View style={styles.rightSide}>
            <Image
              source={require("../../assets/images/sideArrow.png")}
              style={styles.sideArrow}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.studentNameContainer}>
          <View style={styles.studentProfilePic}>
            <Image
              source={require("../../assets/images/profilePic.jpg")}
              style={styles.profilePicSmall}
            />
          </View>
          <View style={styles.nameAndStatus}>
            <View style={styles.name}>
              <Text style={styles.nameText}>Nishamal Perera</Text>
            </View>
            <View style={styles.status}>
              <Text style={styles.statusText}>Status</Text>
              <Text style={styles.statusText}>Present</Text>
            </View>
          </View>

          <View style={styles.rightSide}>
            <Image
              source={require("../../assets/images/sideArrow.png")}
              style={styles.sideArrow}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.studentNameContainer}>
          <View style={styles.studentProfilePic}>
            <Image
              source={require("../../assets/images/profilePic.jpg")}
              style={styles.profilePicSmall}
            />
          </View>
          <View style={styles.nameAndStatus}>
            <View style={styles.name}>
              <Text style={styles.nameText}>Akila Dissanayake</Text>
            </View>
            <View style={styles.status}>
              <Text style={styles.statusText}>Status</Text>
              <Text style={styles.statusText}>Present</Text>
            </View>
          </View>

          <View style={styles.rightSide}>
            <Image
              source={require("../../assets/images/sideArrow.png")}
              style={styles.sideArrow}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default StudentList;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: colors.white,
    height: parameters.SCREEN_HEIGHT,
    paddingTop: parameters.statusBarHeight,
    alignItems: "center",
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
  scrollview: {
    display: "flex",
    marginBottom: 20,
  },
  studentNameContainer: {
    display: "flex",
    backgroundColor: colors.midBoxWhite,
    flexDirection: "row",
    alignSelf: "center",
    width: (parameters.SCREEN_WIDTH * 11) / 12,
    height: 80,
    marginTop: "2%",
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
  studentProfilePic: {
    display: "flex",
    justifyContent: "center",
    width: "30%",
    alignItems: "center",
  },
  profilePicSmall: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  nameAndStatus: {
    display: "flex",
    width: "55%",
  },
  name: {
    display: "flex",
    width: "100%",
    height: "60%",
    justifyContent: "center",
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  status: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    height: "40%",
  },
  statusText: {
    fontSize: 16,
  },
  rightSide: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
    height: "100%",
  },
  sideArrow: {
    display: "flex",
    tintColor: colors.orange,
    width: "50%",
    height: "50%",
  },
});
