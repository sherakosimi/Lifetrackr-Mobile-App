import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const NeuMorph = ({ children, size, style, color, onPress }) => {
  return (
    <View style={styles.topShadow}>
      <View style={styles.bottomShadow}>
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.inner,
            {
              width: size || 50,
              height: size || 50,
              borderRadius: size / 2 || 50 / 2,
            },
            style,
          ]}
        >
          {children}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NeuMorph;

const styles = StyleSheet.create({
  inner: {
    backgroundColor: "#E3E6EC",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#D6DCE8",
    borderWidth: 1,
  },
  topShadow: {
    shadowOffset: {
      width: -12,
      height: -12,
    },
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowColor: "#FBFFFF",
  },
  bottomShadow: {
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowColor: "#D1D9E6",
  },
});
