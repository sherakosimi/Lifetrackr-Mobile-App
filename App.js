import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import store from "./redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "./navigation/Tabs";
import SignIn from "./screens/Login/SignIn";
import SignUp from "./screens/Login/SignUp";
import Main from "./Main";
import { getCompanions } from "./redux/reducers/companions";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    // schedulePushNotification();
    //registerForPushNotificationsAsync();
  });
  async function schedulePushNotification() {
    const trigger = new Date(Date.now() + 60 * 60 * 1000);
    trigger.setMinutes(0);
    trigger.setSeconds(0);
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Time's up!",
        body: "Change sides!",
      },
      trigger,
    });
    console.log("notif id on scheduling", id);
    return id;
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        sound: true,
        lightColor: "#FF231F7C",
        lockscreenVisibility:
          Notifications.AndroidNotificationVisibility.PUBLIC,
        bypassDnd: true,
      });
    }

    return token;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
