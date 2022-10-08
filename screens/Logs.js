import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Logs = ({ navigator }) => {
  return (
    <View style={styles.container}>
      <Text> Logs</Text>
    </View>
  );
};

export default Logs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F4EF",
  },
});
