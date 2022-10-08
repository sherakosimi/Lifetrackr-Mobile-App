import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SaveAreaView,
  TouchableOpacity,
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
import NeuMorphRec from "../components/NeuMorphRec";
import NeuMorph from "../components/NeuMorph";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../filters/Filters";

const Companions = ({ navigation, route }) => {
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });
  const { tokenID } = route.params;
  const dispatch = useDispatch();
  const { companions, events } = useSelector((state) => state.companions);
  const [refreshing, setRefreshing] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setRefreshing(false);
    setFilterData(companions);
  }, [companions, events]);

  const searchFilter = (text) => {
    if (text) {
      const newData = companions.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(companions);
      setSearch(text);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData(tokenID, dispatch);
    setRefreshing(false);
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
              <Text style={styles.headerText}>Companions</Text>
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
              width: "100%",
            }}
            numColumns={1}
            horizontal={false}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            data={filterData}
            renderItem={({ item }) => (
              <NeuMorphRec
                style={{ borderRadius: 10, marginTop: 15, alignSelf: "center" }}
                onPress={() =>
                  navigation.navigate("CompanionOverview", {
                    name: item.name,
                    notes: item.notes,
                    image: item.image,
                    companionID: item.companion,
                    type: item.companion_type,
                  })
                }
              >
                <View style={styles.component}>
                  <View style={styles.contentContainer}>
                    <View style={styles.imageContainer}>
                      <Image
                        style={styles.image}
                        source={{
                          uri: item.image,
                        }}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.name}>{item.name}</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={styles.lastAction}>Reminders:</Text>
                        {events &&
                          events
                            .filter((x) => x.companion_id === item.companion)
                            .map((item, key, { length }) => (
                              <Text
                                key={key}
                                style={[styles.lastAction, { marginLeft: 2 }]}
                              >
                                {item.action}
                                {length - 1 === key ? null : ","}
                              </Text>
                            ))}
                      </View>
                    </View>
                    <NeuMorph style={{ left: 40 }} size={40}>
                      <Icon name="dots-vertical" color="#3F4A62" size={28} />
                    </NeuMorph>
                  </View>
                </View>
              </NeuMorphRec>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </View>
  );
};

export default Companions;

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
    width: "100%",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: "94%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    height: 45,
    width: 45,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "white",
  },
  image: {
    height: "100%",
    width: "100%",

    borderRadius: 100,
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
    left: 12,
    height: 45,
    width: 210,
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
});
