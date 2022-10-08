import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { useFormik, Formik } from "formik";
import NeuMorph from "../../components/NeuMorph";
import NeuMorphRec from "../../components/NeuMorphRec";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../../redux/reducers/users";
import * as yup from "yup";

const LoginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(2, "Too Short!").required("Required"),
});

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });
  const { error, message } = useSelector((state) => state.users);

  useEffect(() => {
    if (error) {
      showAlert("Unknown error", "Please try again later", "Try Again");
    }
  }, [error]);

  const showAlert = (message, description, button) =>
    Alert.alert(message, description, [
      {
        text: button,
        onPress: () => navigation.navigate("SignIn"),
      },
    ]);

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: LoginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      dispatch(getToken(values.email.toLowerCase(), values.password));
    },
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          marginTop: "-25%",
        }}
      >
        <Image
          source={require("../../assets/SignInLeaf.png")}
          style={styles.image}
        />
      </View>

      <View
        style={{
          marginHorizontal: 40,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            width: 150,
          }}
        >
          <Text style={styles.loginText}>Login</Text>
          <Image
            source={require("../../assets/dogPrint.png")}
            style={{
              width: "100%",
              resizeMode: "contain",
              marginTop: "-26%",
              marginLeft: "-15%",
              height: 80,
            }}
          />
        </View>

        <View
          style={{
            width: "100%",
          }}
        >
          <View style={styles.emailContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderBottomColor: "rgba(107, 107, 107, 0.5)",
                height: 40,
                backgroundColor: "transparent",
                fontSize: 14,
              }}
              placeholder="Your email"
              placeholderTextColor={"rgba(107, 107, 107, 0.5)"}
              onChangeText={handleChange("email")}
              value={values.email}
            />

            <Text style={[styles.signUp, { color: "red" }]}>
              {errors.email}
            </Text>
          </View>

          <View style={styles.emailContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderBottomColor: "rgba(107, 107, 107, 0.5)",
                height: 40,
                backgroundColor: "transparent",
                fontSize: 13,
              }}
              secureTextEntry
              placeholder="Password"
              placeholderTextColor={"rgba(107, 107, 107, 0.5)"}
              onChangeText={handleChange("password")}
              value={values.password}
            />
            <Text style={[styles.signUp, { color: "red" }]}>
              {errors.password}
            </Text>
            <Text style={[styles.signUp, { color: "#8A6CFF", paddingTop: 5 }]}>
              Forgot password?
            </Text>
          </View>

          <NeuMorphRec
            style={{ borderRadius: 10, marginTop: "20%", width: "100%" }}
            onPress={handleSubmit}
          >
            <Text style={styles.done}>Login</Text>
          </NeuMorphRec>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            <Text style={[styles.signUp, { fontSize: 13 }]}>
              Don't have an account?
            </Text>
            <Text
              style={[styles.signUp, { color: "#8A6CFF", fontSize: 13 }]}
              onPress={() => navigation.navigate("SignUp")}
            >
              {" "}
              Sign Up
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "33%",
                justifyContent: "center",

                borderBottomColor: "rgba(107, 107, 107, 0.5)",
                borderBottomWidth: 1,
              }}
            ></View>
            <Text style={styles.loginWith}>OR LOGIN WITH</Text>
            <View
              style={{
                flexDirection: "row",
                width: "33%",
                justifyContent: "center",

                borderBottomColor: "rgba(107, 107, 107, 0.5)",
                borderBottomWidth: 1,
              }}
            ></View>
          </View>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 25,
            }}
          >
            <Icon
              style={{ paddingHorizontal: 20 }}
              name="apple"
              color="#3F4A62"
              size={35}
            />
            <Icon
              style={{ paddingHorizontal: 20, paddingTop: 3 }}
              name="google"
              color="#3F4A62"
              size={29}
            />
            <Icon
              style={{ paddingHorizontal: 20, paddingTop: 3 }}
              name="facebook"
              color="#3F4A62"
              size={32}
            />
          </View>
        </View>
      </View>

      <Image
        source={require("../../assets/SignInLeaf2.png")}
        style={{
          resizeMode: "contain",
          marginTop: "-10%",
          marginLeft: "1%",
          height: 130,
        }}
      />
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF0F3",
    flexDirection: "column",
  },
  welcomeText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 42,
    color: "#3F4A62",
  },
  image: {
    alignSelf: "flex-end",
    width: "90%",

    resizeMode: "contain",
  },
  appName: {
    fontFamily: "Nunito_700Bold",
    fontSize: 42,
    color: "#3F4A62",
  },
  loginText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 36,
    color: "#3F4A62",
  },
  done: {
    fontFamily: "Nunito_700Bold",
    fontSize: 21,
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

  descriptionText: {
    color: "#7E7E7E",
    fontFamily: "Nunito_400Regular",
    fontSize: 11,
    marginLeft: 1,
    marginTop: 4,
  },
  signUp: {
    color: "#7E7E7E",
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
    marginTop: 0,
  },
  loginWith: {
    width: "34%",
    textAlign: "center",
    fontFamily: "Nunito_600SemiBold",
    fontSize: 11,
    color: "#3F4A62",
  },
});
