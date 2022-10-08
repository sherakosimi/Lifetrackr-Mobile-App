import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import NeuMorph from "../components/NeuMorph";
import { useDispatch, useSelector } from "react-redux";
import {
  getIcon,
  getPercentage,
  getTime,
  getTypeIcon,
  fetchData,
} from "../filters/Filters";
import { updateEvent, getEvents } from "../redux/reducers/companions";
import { getCompanions } from "../redux/reducers/companions";

const Reminders = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { tokenID } = route.params;
  const { companions, events } = useSelector((state) => state.companions);
  const [refreshing, setRefreshing] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });

  useEffect(() => {
    setRefreshing(false);
    setFilterData(events);
  }, [events, companions]);

  const searchFilter = (text) => {
    if (text) {
      const newData = events.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(events);
      setSearch(text);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData(tokenID, dispatch);
    setRefreshing(false);
  };

  const onPress = (id) => {
    dispatch(updateEvent(id, tokenID));
    dispatch(getEvents(tokenID));
    dispatch(getCompanions(tokenID));
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
              <Icon name="view-list" color="#3F4A62" size={27} />
            </NeuMorph>
            <View>
              <Text style={styles.headerText}>Reminders</Text>
            </View>
            <NeuMorph>
              <Icon name="plus" size={28} color="#3F4A62" />
            </NeuMorph>
          </View>
        </View>
      </View>
      <View style={styles.searchBar}>
        <Icon
          style={{ marginLeft: 10 }}
          name="magnify"
          color="#3F4A62"
          size={22}
        />

        <TextInput
          style={styles.input}
          placeholder="Search"
          value={search}
          placeholderTextColor="#748492"
          underlineColorAndroid="transparent"
          onChangeText={(text) => searchFilter(text)}
        />
      </View>
      <View style={{ width: "100%", flex: 1 }}>
        <View style={styles.listContainer}>
          <FlatList
            style={{
              heigth: "100%",
              width: "100%",
              paddingHorizontal: "7.5%",
            }}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            numColumns={2}
            horizontal={false}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            data={filterData}
            renderItem={({ item }) => (
              <NeuMorph
                size={170}
                style={{ borderRadius: 10, marginTop: 24 }}
                onPress={() =>
                  navigation.navigate("CompanionOverview", {
                    name: companions.filter(
                      (x) => x.companion === item.companion_id
                    )[0].name,
                    notes: companions.filter(
                      (x) => x.companion === item.companion_id
                    )[0].notes,
                    image: companions.filter(
                      (x) => x.companion === item.companion_id
                    )[0].image,
                    companionID: companions.filter(
                      (x) => x.companion === item.companion_id
                    )[0].companion,
                    type: companions.filter(
                      (x) => x.companion === item.companion_id
                    )[0].companion_type,
                  })
                }
              >
                <View style={styles.component}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: item.image,
                    }}
                  />
                  <View style={styles.bottomContainer}>
                    <View style={styles.textContainer}>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={styles.name}
                          numberOfLines={1}
                          ellipsizeMode={"tail"}
                        >
                          {item.name}
                        </Text>
                        <Icon
                          style={{ top: 3, marginLeft: 8 }}
                          name={getTypeIcon(item.companion_type)}
                          color="#3F4A62"
                          size={16}
                        />
                      </View>
                      <Text style={styles.lastAction}>
                        Last {getTime(item.last_trigger).duration}
                        {getTime(item.last_trigger).dateType} ago
                      </Text>
                    </View>
                    <NeuMorph
                      onPress={() => onPress(item.event_id)}
                      size={40}
                      style={{
                        right: 5,
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          alignSelf: "flex-end",
                          height: "100%",
                          overflow: "hidden",
                          borderRadius: 100,
                          justifyContent: "flex-end",
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
                      <Icon
                        name={getIcon(item.action)[0]}
                        color="#748492"
                        size={27}
                        style={{ position: "absolute" }}
                      />
                    </NeuMorph>
                  </View>
                </View>
              </NeuMorph>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default Reminders;

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
  searchBar: {
    width: "85%",
    alignSelf: "center",
    height: 40,
    marginTop: 20,
    backgroundColor: "#E3E6EC",
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#D6DCE8",
  },
  input: {
    textAlign: "center",
    width: "85%",
    height: 30,
    fontSize: 14,
  },
  listContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 10,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
  component: {
    width: 170,
    height: 170,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
  },

  image: {
    height: 105,
    width: 158,
    marginTop: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  bottomContainer: {
    width: 158,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 59,
  },
  textContainer: {
    flexDirection: "column",
    width: 100,
  },
  name: {
    fontFamily: "Nunito_700Bold",
    fontSize: 19,
    left: 3,
    color: "#3F4A62",
    bottom: 1,
    maxWidth: 100,
  },
  lastAction: {
    fontFamily: "Nunito_400Regular",
    fontSize: 14,
    left: 3,
    bottom: 2,
    color: "#748492",
  },
});
