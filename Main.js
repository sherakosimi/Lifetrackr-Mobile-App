import React, { useEffect, useState } from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "./navigation/Tabs";
import SignIn from "./screens/Login/SignIn";
import SignUp from "./screens/Login/SignUp";
import CompanionPage from "./screens/companionPage";
import Settings from "./screens/Settings";
import { getCompanions, getEvents } from "./redux/reducers/companions";
import * as SecureStore from "expo-secure-store";
import LottieView from "lottie-react-native";
import AddNewCompanion from "./screens/Add/addNewCompanion";
import AddNewReminder from "./screens/Add/addNewReminder";
import { View, Text, StyleSheet } from "react-native";
const Stack = createStackNavigator();

export default function Main() {
  const dispatch = useDispatch();
  const { users, error, user, token, loading } = useSelector(
    (state) => state.users
  );
  const [tokenID, setTokenID] = useState(null);

  useEffect(() => {
    let cleanup = false;
    const getToken = async () => {
      //await SecureStore.deleteItemAsync("token");
      let token1 = await SecureStore.getItemAsync("token");

      if (!cleanup) {
        setTokenID(token1);
        token1 = null;
        if (tokenID) {
          dispatch(getCompanions(tokenID));
          dispatch(getEvents(tokenID));
        }
      }
    };
    getToken();
    return () => (cleanup = true);
  }, [token, tokenID]);

  if (loading) {
    return (
      <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <LottieView source={require("./95967-loader.json")} autoPlay loop />
      </View>
    );
  }

  if (!tokenID) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={Tabs}
            options={{ headerShown: false }}
            initialParams={{ tokenID: tokenID }}
          />
          <Stack.Screen
            name="CompanionOverview"
            component={CompanionPage}
            initialParams={{ tokenID: tokenID }}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddNewCompanion"
            component={AddNewCompanion}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddNewReminder"
            component={AddNewReminder}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    zIndex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
