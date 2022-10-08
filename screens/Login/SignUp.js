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
import { useFormik } from "formik";
import NeuMorph from "../../components/NeuMorph";
import NeuMorphRec from "../../components/NeuMorphRec";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, createUser, getToken } from "../../redux/reducers/users";
import * as yup from "yup";

const LoginSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(2, "Too Short!").required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Required"),
});

const SignUp = ({ navigation }) => {
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
    if (message) {
      showAlert("Success", message, "Login");
    }
    console.log(message);
  }, [error, message]);

  const showAlert = (message, description, button) => {
    Alert.alert(message, description, [
      {
        text: button,
        onPress: () => navigation.navigate("SignIn"),
      },
    ]);
  };

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: { email: "", password: "", confirmPassword: "", name: "" },
      validationSchema: LoginSchema,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: (values) => {
        dispatch(createUser(values.email.toLowerCase(), values.password));
      },
    });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          width: "90%",
          marginLeft: "-22%",
          marginTop: "10%",
          alignSelf: "flex-start",
        }}
      >
        <Image
          source={require("../../assets/SignUpLeaf.png")}
          style={styles.image}
        />
      </View>

      <View
        style={{
          marginHorizontal: 40,
          marginTop: "3%",
          flexDirection: "column",
        }}
      >
        <View
          style={{
            width: 200,
          }}
        >
          <Text style={styles.loginText}>Sign Up</Text>
          <Image
            source={require("../../assets/frogPrint.png")}
            style={{
              width: "100%",
              resizeMode: "contain",
              marginTop: "-50%",
              marginLeft: "-15%",
            }}
          />
        </View>

        <View
          style={{
            width: "100%",
            marginTop: "-17%",
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
              placeholder="Your name"
              placeholderTextColor={"rgba(107, 107, 107, 0.5)"}
              onChangeText={handleChange("name")}
              value={values.name}
            />

            <Text style={[styles.signUp, { color: "red" }]}>{errors.name}</Text>
          </View>

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
                fontSize: 14,
              }}
              secureTextEntry
              placeholder="Your password"
              placeholderTextColor={"rgba(107, 107, 107, 0.5)"}
              onChangeText={handleChange("password")}
              value={values.password}
            />

            <Text style={[styles.signUp, { color: "red" }]}>
              {errors.password}
            </Text>
          </View>
          <View style={styles.emailContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderBottomColor: "rgba(107, 107, 107, 0.5)",
                height: 40,
                backgroundColor: "transparent",
                fontSize: 14,
              }}
              secureTextEntry
              placeholder="Repeat your password"
              placeholderTextColor={"rgba(107, 107, 107, 0.5)"}
              onChangeText={handleChange("confirmPassword")}
              value={values.confirmPassword}
            />

            <Text style={[styles.signUp, { color: "red" }]}>
              {errors.confirmPassword}
            </Text>
          </View>

          <NeuMorphRec
            style={{
              borderRadius: 10,
              marginTop: "15%",
              width: "100%",
            }}
            onPress={handleSubmit}
          >
            <Text style={styles.done}>Sign up</Text>
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
              Already have an account?
            </Text>
            <Text
              style={[styles.signUp, { color: "#8A6CFF", fontSize: 13 }]}
              onPress={() => navigation.navigate("SignIn")}
            >
              {" "}
              Sign In
            </Text>
          </View>
        </View>
      </View>
      <Image
        source={require("../../assets/SignInLeaf2.png")}
        style={{
          resizeMode: "contain",
          height: 130,
          marginTop: "-5%",
        }}
      />
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF0F3",
    flexDirection: "column",
  },
  image: {
    alignSelf: "flex-start",
    width: "100%",
    resizeMode: "contain",
  },
  welcomeText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 40,
    color: "#3E3E3E",
  },
  appName: {
    fontFamily: "Nunito_700Bold",
    fontSize: 40,
    color: "#3E3E3E",
  },
  loginText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 36,
    color: "#3F4A62",
  },
  emailContainer: {
    width: "100%",
    height: 50,
    marginTop: 30,
  },
  done: {
    fontFamily: "Nunito_700Bold",
    fontSize: 21,
    color: "#3F4A62",
  },
  descriptionText: {
    color: "#7E7E7E",
    fontFamily: "Nunito_400Regular",
    fontSize: 11,
    marginLeft: 1,
    marginTop: 4,
  },
  label: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16,
    color: "#3F4A62",
  },
  signUp: {
    color: "#7E7E7E",
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
  },
});
