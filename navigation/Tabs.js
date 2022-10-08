import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, StyleSheet } from "react-native";
import Reminders from "../screens/Reminders";
import Settings from "../screens/Settings";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Logs from "../screens/Logs";
import Companions from "../screens/Companions";
import AddNew from "../screens/Add/addNew";
import { LinearGradient } from "expo-linear-gradient";

const Tab = createBottomTabNavigator();
const Tabs = ({ route, navigation }) => {
  const { tokenID } = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveBackgroundColor: "transparent",
        tabBarStyle: {
          shadowColor: "#ACC1D0",
          shadowOffset: {
            width: 2,
            height: 3,
          },
          shadowOpacity: 100,
          shadowRadius: 10,
          height: 90,
          position: "absolute",
          elevation: 0,
          backgroundColor: "#ECF0F3",
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Reminders"
        component={Reminders}
        initialParams={{ tokenID: tokenID }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.buttonWrapper}>
              <Icon
                name="alarm"
                size={focused ? 35 : 32}
                color={focused ? "#6190E8" : "#3F4A62"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Companions"
        component={Companions}
        initialParams={{ tokenID: tokenID }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.buttonWrapper}>
              <Icon
                name="camera-iris"
                size={focused ? 37 : 32}
                color={focused ? "#6190E8" : "#3F4A62"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddNew}
        initialParams={{ tokenID: tokenID, showModal: true }}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.shadow}>
              <LinearGradient
                style={styles.buttonAddWrapper}
                colors={["#6190E8", "#A7BFE8"]}
              >
                <Icon name="plus" size={37} color={"#ECF0F3"} />
              </LinearGradient>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Logs"
        initialParams={{ tokenID: tokenID }}
        component={Logs}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.buttonWrapper}>
              <Icon
                name="console"
                size={focused ? 37 : 32}
                color={focused ? "#6190E8" : "#3F4A62"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        initialParams={{ tokenID: tokenID }}
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.buttonWrapper}>
              <Icon
                name="cog"
                size={focused ? 37 : 32}
                color={focused ? "#6190E8" : "#3F4A62"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Tabs;

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    top: 10,
    height: 65,
    width: 65,
    borderRadius: 25,
  },
  buttonAddWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: 70,
    bottom: 10,
    borderRadius: 40,
  },
});
