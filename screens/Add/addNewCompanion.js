import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Modal, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import NeuMorphRec from "../../components/NeuMorphRec";
import NeuMorph from "../../components/NeuMorph";
import { useDispatch, useSelector } from "react-redux";
import {
  getCompanions,
  createCompanion,
  getEvents,
} from "../../redux/reducers/companions";
import { useFormik, Formik, yupToFormErrors } from "formik";
import * as yup from "yup";

const AddNewCompanion = ({ navigation, route }) => {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });
  const dispatch = useDispatch();
  const [type, setType] = useState("undefined");
  const { tokenID } = route.params;
  const { companions, events } = useSelector((state) => state.companions);

  const LoginSchema = yup.object().shape({
    name: yup.string().min(2, "Too Short!").required("Required"),
    companion_type: yup.string().required("Required"),
  });

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      name: "",
      notes: "",
      companion_type: "",
      image: "https://i.ytimg.com/vi/NuwM2jPAmDI/maxresdefault.jpg",
    },
    validationSchema: LoginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      values.companion_type = values.companion_type.toLowerCase();
      dispatch(createCompanion(tokenID, values));
      dispatch(getEvents(tokenID));
      dispatch(getCompanions(tokenID));
      navigation.navigate("Companions");
    },
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "stretch", flex: 1 }}>
        <View style={{ marginHorizontal: 32, marginTop: 60 }}>
          <View style={styles.topContainer}>
            <NeuMorph onPress={() => navigation.popToTop()}>
              <Icon name="close" color="#3F4A62" size={35} />
            </NeuMorph>
            <View>
              <Text style={styles.headerText}>
                {values.name ? values.name : "New Companion"}
              </Text>
            </View>
            <NeuMorph onPress={handleSubmit}>
              <Icon name="check" size={27} color="#3F4A62" />
            </NeuMorph>
          </View>
          <View
            style={{
              marginTop: 50,
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Text style={styles.loginText}>Add New Companion</Text>
          </View>

          <View
            style={{
              width: "100%",
            }}
          >
            <View style={styles.emailContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={{
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBottomColor: "rgba(107, 107, 107, 0.5)",
                  height: 40,
                  backgroundColor: "transparent",
                  fontSize: 14,
                }}
                placeholder="Companion’s name"
                placeholderTextColor={"rgba(107, 107, 107, 0.5)"}
                onChangeText={handleChange("name")}
                value={values.name}
              />

              <Text style={[styles.signUp, { color: "red" }]}>
                {errors.name}
              </Text>
            </View>
            <View style={styles.emailContainer}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={{
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBottomColor: "rgba(107, 107, 107, 0.5)",
                  height: 40,
                  backgroundColor: "transparent",
                  fontSize: 14,
                }}
                placeholder="Your notes"
                placeholderTextColor={"rgba(107, 107, 107, 0.5)"}
                onChangeText={handleChange("notes")}
                value={values.notes}
              />

              <Text style={[styles.signUp, { color: "red" }]}>
                {errors.notes}
              </Text>
            </View>

            <View style={{ marginTop: 40 }}>
              <Text style={styles.companionType}>Companion Type:</Text>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    height: 80,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <NeuMorph
                    onPress={() => setType("Dog")}
                    style={
                      type == "Dog" ? { backgroundColor: "#8A6CFF" } : null
                    }
                  >
                    <Image
                      source={
                        type == "Dog"
                          ? require("../../assets/dogLogoWhite.png")
                          : require("../../assets/dogLogo.png")
                      }
                      style={{
                        width: 25,
                        marginRight: 3,
                        resizeMode: "contain",
                      }}
                    />
                  </NeuMorph>

                  <Text style={styles.typeName}>Dog</Text>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    height: 80,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <NeuMorph
                    onPress={() => setType("Cat")}
                    style={
                      type == "Cat" ? { backgroundColor: "#8A6CFF" } : null
                    }
                  >
                    <Image
                      source={
                        type == "Cat"
                          ? require("../../assets/catLogoWhite.png")
                          : require("../../assets/catLogo.png")
                      }
                      style={{
                        width: 27,
                        resizeMode: "contain",
                      }}
                    />
                  </NeuMorph>
                  <Text style={styles.typeName}>Cat</Text>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    height: 80,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <NeuMorph
                    onPress={() => setType("Reptile")}
                    style={
                      type == "Reptile" ? { backgroundColor: "#8A6CFF" } : null
                    }
                  >
                    <Image
                      source={
                        type == "Reptile"
                          ? require("../../assets/reptileLogoWhite.png")
                          : require("../../assets/reptileLogo.png")
                      }
                      style={{
                        width: 27,
                        resizeMode: "contain",
                      }}
                    />
                  </NeuMorph>
                  <Text style={styles.typeName}>Reptile</Text>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    height: 80,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <NeuMorph
                    onPress={() => setType("Leaf")}
                    style={
                      type == "Leaf" ? { backgroundColor: "#8A6CFF" } : null
                    }
                  >
                    <Image
                      source={
                        type == "Leaf"
                          ? require("../../assets/leafLogoWhite.png")
                          : require("../../assets/leafLogo.png")
                      }
                      style={{
                        width: 23,
                        resizeMode: "contain",
                      }}
                    />
                  </NeuMorph>
                  <Text style={styles.typeName}>Plant</Text>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    height: 80,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <NeuMorph
                    onPress={() => setType("Parrot")}
                    style={
                      type == "Parrot" ? { backgroundColor: "#8A6CFF" } : null
                    }
                  >
                    <Image
                      source={
                        type == "Parrot"
                          ? require("../../assets/parrotLogoWhite.png")
                          : require("../../assets/parrotLogo.png")
                      }
                      style={{
                        width: 27,
                        resizeMode: "contain",
                      }}
                    />
                  </NeuMorph>
                  <Text style={styles.typeName}>Bird</Text>
                </View>
              </View>
            </View>
          </View>
          {/* <NeuMorphRec
            disabled={true}
            style={{ borderRadius: 10, marginTop: 20, width: "100%" }}
          >
            <View style={styles.emailContainer}>
              <TextInput
                style={styles.placeholder}
                placeholder="Name"
                placeholderTextColor={"#7E7E7E"}
                onChangeText={handleChange("name")}
                value={values.name}
              />
            </View>
          </NeuMorphRec>
          {errors.name ? (
            <Text style={[styles.signUp, { color: "red" }]}>{errors.name}</Text>
          ) : (
            <Text style={[styles.signUp]}></Text>
          )} */}
          {/* <NeuMorphRec
            disabled={true}
            style={{
              borderRadius: 10,
              marginTop: 7,
              width: "100%",
              height: 100,
            }}
          >
            <View style={styles.notesContainer}>
              <TextInput
                multiline={true}
                style={styles.placeholder}
                placeholder="Notes"
                placeholderTextColor={"#7E7E7E"}
                onChangeText={handleChange("notes")}
                value={values.notes}
              />
            </View>
          </NeuMorphRec> */}
          {/* <NeuMorphRec
            onPress={() => changeModalVisibility(true)}
            style={{ borderRadius: 10, marginTop: 33, width: "100%" }}
          >
            <View style={styles.emailContainer}>
              <Text style={[styles.placeholder, { color: "#7E7E7E" }]}>
                {values.companion_type
                  ? values.companion_type
                  : "Companion Type"}
              </Text>
            </View>
            <Modal
              transparent={true}
              animationType="fade"
              visible={isModalVisible}
              nRequestClose={() => changeModalVisibility(false)}
            >
              <CompanionTypes
                changeModalVisibility={changeModalVisibility}
                typeCompanions={typeCompanions}
              />
            </Modal>
          </NeuMorphRec>
          {!values.companion_type ? (
            <Text style={[styles.signUp, { color: "red" }]}>
              {errors.companion_type}
            </Text>
          ) : (
            <Text style={[styles.signUp]}></Text>
          )} */}
        </View>
      </View>
    </View>
  );
};

export default AddNewCompanion;

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
    color: "#3F4A62",
  },
  loginText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 20,
    color: "#3F4A62",
  },
  emailContainer: {
    width: "100%",
    height: 50,
    marginTop: 30,
  },
  label: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16,
    color: "#3F4A62",
  },
  notesContainer: {
    width: "100%",
    height: "95%",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "5%",
  },
  descriptionText: {
    color: "#7E7E7E",
    fontFamily: "Nunito_400Regular",
    fontSize: 11,
    marginLeft: 1,
    marginTop: 4,
  },
  placeholder: {
    width: "92%",
    fontSize: 15,
    fontFamily: "Nunito_600SemiBold",
    textAlign: "left",
  },
  companionType: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16,
    color: "#3F4A62",
  },
  signUp: {
    color: "#7E7E7E",
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
    marginTop: 0,
  },
  typeName: {
    fontSize: 14,
    fontFamily: "Nunito_600SemiBold",
    color: "#3F4A62",
  },
});
