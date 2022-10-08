import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import NeuMorph from "../components/NeuMorph";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { array, setFrequency } from "./Filters";
import { useDispatch, useSelector } from "react-redux";
import {
  modifyEvent,
  getCompanions,
  getEvents,
  deleteEvent,
} from "../redux/reducers/companions";

const WIDTH = Dimensions.get("window").width;
const OPTIONS2 = ["Plant", "Dog", "Cat", "Reptile"];
const HEIGHT = Dimensions.get("window").height;

const TaskType = (props) => {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });
  const [showData, setShowData] = useState(false);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const [text, onChangeText] = useState(props.item.name);

  const onPressItem = (item) => {
    setShowData(true);
    setData(item);
  };

  const onPress = () => {
    if (text) {
      let freq = setFrequency(data.number, data.type);
      console.log(freq);
      let updatedData = {
        name: text,
        notes: props.item.notes,
        priority: "m",
        frequency: freq,
      };
      console.log(updatedData);
      console.log(props.item.event_id);
      dispatch(modifyEvent(props.token, updatedData, props.item.event_id));

      dispatch(getEvents(props.token));
      dispatch(getCompanions(props.token));
      props.changeModalVisibility(false);
    } else {
      Alert.alert(
        "Name Field is Required",
        "Please type a name",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel"),
          },
        ],
        { cancelable: true }
      );
    }
  };

  const option = array.map((item, index) => {
    if (!fontsLoaded) {
      return null;
    } else {
      return (
        <TouchableOpacity
          style={styles.option}
          key={index}
          onPress={() => onPressItem(item)}
        >
          {item.type == "day" ||
          item.type == "month" ||
          item.type == "year" ||
          item.type == "hour" ? (
            <Text style={styles.text}>
              Each {item.number} {item.type}
            </Text>
          ) : (
            <Text style={styles.text}>
              {item.number} {item.type}
            </Text>
          )}
        </TouchableOpacity>
      );
    }
  });
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => props.changeModalVisibility(false)}
      >
        <View
          style={{
            width: WIDTH - 70,
            backgroundColor: "#C3D4FF",
            borderRadius: 10,
            justifyContent: "column",
            alignItems: "center",
            height: showData ? 130 : 200,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              backgroundColor: "#ECF0F3",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              height: showData ? "50%" : "35%",
            }}
          >
            <NeuMorph
              size={40}
              onPress={() => props.changeModalVisibility(false)}
            >
              <Icon name="close" color="#3F4A62" size={27} />
            </NeuMorph>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              onChangeText={onChangeText}
              value={text}
            />
            {showData ? (
              <NeuMorph size={40} onPress={() => onPress()}>
                <Icon name="check" color="#3F4A62" size={27} />
              </NeuMorph>
            ) : (
              <NeuMorph
                size={40}
                onPress={() => {
                  dispatch(deleteEvent(props.item.event_id, props.token));
                  dispatch(getEvents(props.token));
                  dispatch(getCompanions(props.token));
                  props.changeModalVisibility(false);
                }}
              >
                <Icon name="delete-outline" color="#3F4A62" size={27} />
              </NeuMorph>
            )}
          </View>
          {showData ? (
            <View
              style={{
                height: "50%",
                width: "80%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.textData}>
                Each {data.number} {data.type}
              </Text>
            </View>
          ) : (
            <ScrollView style={{ width: "100%" }}>{option}</ScrollView>
          )}
        </View>
      </TouchableOpacity>
    );
  }
};

const AddModal = (props) => {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  const dispatch = useDispatch();
  console.log("ahaha");
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: "transparent", justifyContent: "flex-end" },
        ]}
        onPress={() => {
          props.navigation.goBack();
          props.changeModalVisibility(false);
        }}
      >
        <View
          style={{
            marginBottom: 130,
            width: WIDTH - 200,
            backgroundColor: "#7D8EB9",
            borderRadius: 10,
            justifyContent: "column",
            alignItems: "center",
            height: 150,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              backgroundColor: "#ECF0F3",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              height: "35%",
            }}
          >
            <NeuMorph
              size={35}
              onPress={() => props.changeModalVisibility(false)}
            >
              <Icon name="close" color="#3F4A62" size={25} />
            </NeuMorph>
            <Text style={styles.input}>Add New</Text>

            <View style={{ width: 30, backgroundColor: "black" }}></View>
          </View>
          <View
            style={{ height: "75%", width: "100%", backgroundColor: "#C3D4FF" }}
          >
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("AddNewCompanion", {
                  tokenID: props.tokenID,
                });
                props.changeModalVisibility(false);
              }}
              style={{
                height: "45%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                borderBottomWidth: 1,
                borderColor: "#748492",
              }}
            >
              <Text style={styles.choice}>Companion</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("AddNewReminder", {
                  tokenID: props.tokenID,
                });
                props.changeModalVisibility(false);
              }}
              style={{
                height: "42%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                borderBottomWidth: 1,
                borderColor: "#748492",
              }}
            >
              <Text style={styles.choice}>Reminder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

const CompanionID = (props) => {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });
  const { companions, events } = useSelector((state) => state.companions);
  const onPressItem = (item) => {
    props.changeModalVisibility(false);
    props.companionID(item.companion, item.name);
  };

  const option = companions.map((item, index) => {
    return (
      <TouchableOpacity
        style={styles.option}
        key={index}
        onPress={() => onPressItem(item)}
      >
        <Text style={styles.text}>{item.name} </Text>
      </TouchableOpacity>
    );
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(52, 52, 52, 0.8)",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => props.changeModalVisibility(false)}
      >
        <View
          style={{
            width: WIDTH - 20,
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <ScrollView>{option}</ScrollView>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  option: {
    borderRadius: 10,
    borderBottomWidth: 1,
    borderColor: "#3F4A62",
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    margin: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#3F4A62",
    textAlign: "center",
    alignSelf: "center",
    fontFamily: "Nunito_600SemiBold",
  },
  textData: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#3F4A62",
    textAlign: "center",
    fontFamily: "Nunito_600SemiBold",
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 20,
    width: 100,
    borderColor: "#3F4A62",
    fontWeight: "bold",
    color: "#3F4A62",
    fontFamily: "Nunito_600SemiBold",
    textAlign: "center",
  },
  choice: {
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
    color: "#3F4A62",
    textAlign: "center",
  },
});

export { TaskType, AddModal, CompanionID };
