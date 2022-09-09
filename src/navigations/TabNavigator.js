import { StyleSheet, Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import ProfilePage from "../screens/ProfilePage";
import { useIsFocused } from "@react-navigation/native";
import Map from "../screens/Map";
import SchoolVan from "../screens/SchoolVan";
import NotAssignedError from "../screens/NotAssignedError";
import apiClient from "../Services/apiClient";
import { colors } from "../globals/styles";
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const isFocused = useIsFocused();
  const [isAssigned, setIsAssigned] = useState(false);
  useEffect(() => {
    const ac = new AbortController();
    async function checkIsAssigned() {
      const { data, error } = await apiClient.checkIsAssigned();
      console.log("isChecked called");
      console.log(data);
      setIsAssigned(data.result);
      return () => ac.abort();
    }
    checkIsAssigned();
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 15,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: colors.midBoxWhite,
          borderRadius: 15,
          height: 70,
          ...styles.shadow,
        },
      }}
      initialRouteName="Map"
    >
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("../../assets/images/profileicon.png")}
                style={{
                  width: focused ? 35 : 25,
                  height: focused ? 35 : 25,
                  tintColor: focused ? colors.orange : "#748c94",
                }}
              />
              <Text style={{ color: focused ? colors.orange : "#748c94" }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Map"
        component={isAssigned ? Map : NotAssignedError}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("../../assets/images/mapicon.png")}
                style={{
                  width: focused ? 35 : 25,
                  height: focused ? 35 : 25,
                  tintColor: focused ? colors.orange : "#748c94",
                }}
              />
              <Text style={{ color: focused ? colors.orange : "#748c94" }}>
                Map
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="School Van"
        component={isAssigned ? SchoolVan : NotAssignedError}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("../../assets/images/schoolvanicon.png")}
                style={{
                  width: focused ? 35 : 25,
                  height: focused ? 35 : 25,
                  tintColor: focused ? colors.orange : "#748c94",
                }}
              />
              <Text style={{ color: focused ? colors.orange : "#748c94" }}>
                School Van
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  shadow: {
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
