import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import NeuMorphRec from "../components/NeuMorphRec";
import NeuMorph from "../components/NeuMorph";
import * as SecureStore from "expo-secure-store";

const Settings = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  const LogOut = async () => {
    await SecureStore.deleteItemAsync("token");
    // navigation.navigate("SignIn");
  };

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "stretch" }}>
        <View style={{ marginHorizontal: 32, marginTop: 60 }}>
          <View style={styles.topContainer}>
            <NeuMorph>
              <Icon name="star-outline" color="#3F4A62" size={27} />
            </NeuMorph>
            <View>
              <Text style={styles.headerText}>Settings</Text>
            </View>
            <NeuMorph onPress={() => LogOut()}>
              <Icon name="export-variant" size={24} color="#3F4A62" />
            </NeuMorph>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.subHeading}>App Settings</Text>
            <NeuMorphRec style={styles.appSettingsContainer}>
              <View style={styles.settingsRow}>
                <NeuMorph style={{ left: 20 }} size={45}>
                  <Icon name="bell-ring" color="#3F4A62" size={25} />
                </NeuMorph>
                <View style={styles.textContainer}>
                  <Text style={styles.name}>Notifications</Text>
                  <Text style={styles.lastAction}>
                    Manage your notifications
                  </Text>
                </View>
              </View>
              <View style={styles.settingsRow}>
                <NeuMorph style={{ left: 20 }} size={45}>
                  <Icon name="format-text-variant" color="#3F4A62" size={28} />
                </NeuMorph>
                <View style={styles.textContainer}>
                  <Text style={styles.name}>Language</Text>
                  <Text style={styles.lastAction}>Set up your language</Text>
                </View>
              </View>
              <View style={styles.settingsRow}>
                <NeuMorph style={{ left: 20 }} size={45}>
                  <Icon name="theme-light-dark" color="#3F4A62" size={28} />
                </NeuMorph>
                <View style={styles.textContainer}>
                  <Text style={styles.name}>Theme</Text>
                  <Text style={styles.lastAction}>Change the theme</Text>
                </View>
              </View>
            </NeuMorphRec>
          </View>
          <View style={{ marginTop: 35 }}>
            <Text style={styles.subHeading}>Help</Text>
            <NeuMorphRec style={styles.helpContainer}>
              <View style={styles.settingsRow}>
                <NeuMorph style={{ left: 20 }} size={45}>
                  <Icon name="text-box-outline" color="#3F4A62" size={25} />
                </NeuMorph>
                <Text style={styles.helpName}>Terms and Privacy Policy</Text>
              </View>
              <View style={styles.settingsRow}>
                <NeuMorph style={{ left: 20 }} size={45}>
                  <Icon name="shield-check-outline" color="#3F4A62" size={25} />
                </NeuMorph>
                <Text style={styles.helpName}>Help Center</Text>
              </View>
            </NeuMorphRec>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#ECF0F3",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 23,
  },
  contentContainer: {
    marginHorizontal: 32,
    marginTop: 40,
    flexDirection: "column",
  },
  subHeading: {
    fontFamily: "Nunito_700Bold",
    fontSize: 16,
  },
  appSettingsContainer: {
    height: 200,
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  settingsRow: {
    width: "100%",
    height: 45,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "column",
    left: 35,
    top: 2,
    height: 45,
    width: 270,
  },
  name: {
    fontFamily: "Nunito_700Bold",
    fontSize: 17,
    color: "#3E3E3E",
  },
  lastAction: {
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
    color: "#6B6B6B",
  },
  helpContainer: {
    height: 145,
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  helpName: {
    left: 35,
    fontFamily: "Nunito_700Bold",
    fontSize: 17,
    color: "#3E3E3E",
    alignSelf: "center",
  },
});
