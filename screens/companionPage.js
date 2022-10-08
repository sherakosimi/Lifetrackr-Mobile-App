import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import NeuMorphRec from "../components/NeuMorphRec";
import NeuMorph from "../components/NeuMorph";
import { useDispatch, useSelector } from "react-redux";
import {
  getIcon,
  getPercentage,
  getTime,
  getTypeIcon,
  getFrequency,
  fetchData,
} from "../filters/Filters";
import { TaskType } from "../filters/Pickers";

const CompanionPage = ({ route, navigation }) => {
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });
  const { companions, events } = useSelector((state) => state.companions);
  const [refreshing, setRefreshing] = useState(false);
  const { name, notes, image, companionID, type, tokenID } = route.params;

  useEffect(() => {
    setRefreshing(false);
  }, [events, companions]);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [data, setData] = useState(null);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData(tokenID, dispatch);
    setRefreshing(false);
  };

  const changeModalVisibility = (bool) => {
    setisModalVisible(bool);
  };

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "stretch", flex: 1 }}>
        <View style={{ marginHorizontal: 32, marginTop: 60 }}>
          <View style={styles.topContainer}>
            <NeuMorph onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" color="#3F4A62" size={35} />
            </NeuMorph>
            <View>
              <Text style={styles.headerText}>{name}</Text>
            </View>
            <NeuMorph>
              <Icon name="delete-outline" size={27} color="#3F4A62" />
            </NeuMorph>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.subHeading}>Plant</Text>
              <Icon
                name={getTypeIcon(type)}
                size={20}
                color="#3F4A62"
                style={{ left: 5 }}
              />
            </View>

            <View style={styles.imageInfoContainer}>
              <NeuMorphRec style={styles.imageContainer}>
                <Image
                  style={{ width: "96%", height: "96%", borderRadius: 10 }}
                  source={{
                    uri: image,
                  }}
                />
              </NeuMorphRec>
              <NeuMorphRec style={styles.infoContainer}>
                <Text style={styles.infoText}>Info</Text>
                {notes ? (
                  <Text style={styles.notesText}>{notes}</Text>
                ) : (
                  <Text style={styles.notesText}>Add Notes</Text>
                )}

                <Text></Text>
              </NeuMorphRec>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 25,
            }}
          >
            <Text style={styles.subHeading}>Reminders</Text>
            <Icon name="plus" size={27} color="#3F4A62" />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <FlatList
            style={{
              width: "100%",
            }}
            numColumns={1}
            horizontal={false}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            // companions.filter(
            //   (x) => x.companion === item.companion_id
            // )[0].name
            data={events.filter((x) => x.companion_id === companionID)}
            renderItem={({ item }) => (
              <NeuMorphRec
                style={{
                  borderRadius: 10,
                  marginTop: 20,
                  width: "85%",
                  alignSelf: "center",
                }}
                onPress={() => {
                  changeModalVisibility(true);
                  setData(item);
                }}
              >
                <View style={styles.component}>
                  <View style={styles.remindersContainer}>
                    <Icon
                      name={getIcon(item.action)[0]}
                      size={35}
                      color="#3F4A62"
                      style={{ left: 3 }}
                    />
                    <View style={styles.textContainer}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.lastAction}>
                        Each {getFrequency(item.frequency).frequency}{" "}
                        {getFrequency(item.frequency).dataType}
                      </Text>
                    </View>
                    <NeuMorph size={40} style={{ right: 5 }}>
                      <View
                        style={{
                          width: "100%",
                          height: "100%",
                          overflow: "hidden",
                          borderRadius: 100,
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            height: getPercentage(
                              item.next_trigger,
                              item.frequency
                            ),
                            backgroundColor: getIcon(item.action)[1],
                            width: "100%",
                          }}
                        ></View>
                      </View>
                      <Text style={styles.iconReminder}>
                        {getTime(item.last_trigger).duration}{" "}
                        {getTime(item.last_trigger).dateType} ago
                      </Text>
                    </NeuMorph>
                  </View>
                </View>
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible}
                  nRequestClose={() => changeModalVisibility(false)}
                >
                  <TaskType
                    changeModalVisibility={changeModalVisibility}
                    item={data}
                    token={tokenID}
                    setRefreshing={setRefreshing}
                  />
                </Modal>
              </NeuMorphRec>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default CompanionPage;

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
  contentContainer: {
    marginHorizontal: "6%",
    marginTop: "8%",
    flexDirection: "column",
  },
  subHeading: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 18,
    color: "#3F4A62",
  },
  imageInfoContainer: {
    height: 145,
    width: "100%",

    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    height: 140,
    width: 175,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    height: 140,
    width: 160,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  infoText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    left: 10,
    top: 7,
    color: "#3F4A62",
  },
  notesText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 12,
    color: "#748492",
    alignSelf: "center",
  },
  component: {
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  remindersContainer: {
    width: "94%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "column",
    left: 15,
    height: 45,
    width: 260,
    top: 2,
    overflow: "hidden",
  },
  name: {
    fontFamily: "Nunito_700Bold",
    fontSize: 17,
    color: "#3F4A62",
  },
  lastAction: {
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
    color: "#748492",
  },
  iconReminder: {
    fontFamily: "Nunito_400Regular",
    width: 26,
    lineHeight: 12,
    fontSize: 10,
    position: "absolute",
    textAlign: "center",
    color: "#6B6B6B",
  },
});
