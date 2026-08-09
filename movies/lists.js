import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native-web";

import { Image } from "react-native-web";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import Logout from "./logout";
import { Input } from "antd";
import config from "../config";
import LoadingState from "../component/ui/LoadingState";
import { colors, theme } from "../component/ui/theme";
const { Search } = Input;

export default function Movielist({ navigation }) {
  const [isHovered, setIsHovered] = useState(false);

  const handlePressIn = () => {
    setIsHovered(true);
  };

  const handlePressOut = () => {
    setIsHovered(false);
  };
  const handlePressog = () => {
    setIsHovered(true);

    setTimeout(() => {
      setIsHovered(false);
      navigation.navigate("Homescreen");
    }, 2000);
  };

  const logoutEmoji = isHovered ? "👋👋" : "👋";
  const [myData, setmyData] = useState([]);
  const [input, setinput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fun1 = (_id) => {
    try {
      const { data } = axios
        .delete(`${config.backend_url}/api/movie/${_id}`)
        .then((response) => {
          console.log(`Rating with ID ${_id} deleted successfully`);
          setmyData((prevData) => prevData.filter((data) => data._id !== _id));
        })
        .catch((error) => console.log(error));
    } catch (err) {
      console.log(err);
    }
  };
  const fun2 = (id) => {
    console.log("Movie Id is :  ");
    navigation.navigate("moviesdetail", { movie: id });
  };
  const storedUser = localStorage.getItem("User Name");
  const token = storedUser ? JSON.parse(storedUser)?.Token || JSON.parse(storedUser)?.token : "";
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${config.backend_url}/api/movie/get`, { headers: headers })
      .then((res) => {
        setmyData(Array.isArray(res.data) ? res.data : []);
        setError(Array.isArray(res.data) ? "" : "The collection response was not valid.");
      })
      .catch((error) => {
        console.log(error);
        setError("We could not load your collection.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //Search Bar****

  const search = () => {
    axios
      .get(`${config.backend_url}/api/movie/search/${input}`)
      .then((res) => {
        setmyData(Array.isArray(res.data) ? res.data : []);
        setError(Array.isArray(res.data) ? "" : "No valid movie results were returned.");
      })
      .catch((error) => {
        console.log(error);
        setError("Search is unavailable right now.");
      });
  };

  const filteredData = myData.filter((item) => {
    const moviex = typeof item.movie === "string" ? item.movie.toLowerCase() : "";
    const inputy = input.toLowerCase();
    return moviex.startsWith(inputy);
  });

  const handlePress = (value) => {
    setinput(value);
    const filteredDataWithSelectedMovie = myData.filter((item) => {
      const moviex = typeof item.movie === "string" ? item.movie.toLowerCase() : "";
      const inputy = value.toLowerCase();
      return moviex.startsWith(inputy);
    });
    setmyData(filteredDataWithSelectedMovie);
  };
  const handleInputChange = (event) => {
    const text = event.target.value;

    if (text === "") {
      setinput(text);
      setmyData(myData);
    } else {
      setinput(text);
      const filteredDataWithSelectedMovie = myData.filter((item) => {
        const moviex = typeof item.movie === "string" ? item.movie.toLowerCase() : "";
        const inputy = text.toLowerCase();
        return moviex.startsWith(inputy);
      });
      setmyData(filteredDataWithSelectedMovie);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={theme.eyebrow}>YOUR COLLECTION</Text>
        <Text style={styles.List}>Films that made the cut.</Text>
        <Text style={styles.subtitle}>Keep track of the stories you want to revisit.</Text>
      </View>
      <View style={styles.container2}>
        <Pressable style={theme.primaryButton} onPress={() => navigation.navigate("newmovieslist")}>
          <Text style={theme.primaryButtonText}>+ Add a film</Text>
        </Pressable>
      </View>
      <View style={styles.Logout}>
        <Pressable
          onPress={handlePressog}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={({ pressed }) => [
            styles.logoutButton,
            {
              backgroundColor: pressed ? "#F0F0F0" : "transparent",
              // Add more styles as needed
            },
          ]}
        >
          <Logout />
            <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
      <View style={styles.searchitemcontainer}>
        <View style={styles.searchabar}>
          <Search
            placeholder="Search Movie.."
            onChange={handleInputChange}
            value={input}
            onSearch={search}
            style={styles.search}
            allowClear={true}
          />
          {/* <View style={styles.FontAwesome}>
            <EvilIcons name="search" size={24} color="black" />
          </View> */}
        </View>
        {/* <View style={styles.searchButton}>
          <Button title="Search" onPress={search}></Button>
        </View> */}
        <View style={styles.searchmoviename}>
          {filteredData.map((post) => {
            const { _id, movie, image } = post;
            if (input !== "") {
              return (
                <View key={_id} style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      alignSelf: "flex-start",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handlePress(movie)}
                    >
                      <Text>{movie}</Text>
                    </TouchableOpacity>
                  </Text>
                  <Text
                    style={{
                      borderColor: "gray",
                      borderWidth: 1,
                      height: 1,
                      marginTop: 5,
                    }}
                  ></Text>
                </View>
              );
            }
          })}
        </View>
      </View>
      {loading || error ? <LoadingState error={error} onRetry={() => navigation.replace("movielist")} /> : <View style={styles.movieGrid}>{myData.map((data) => {
        const { _id, movie, image } = data;
        return (
          <View style={styles.container1} key={_id}>
            <Text style={styles.moviename}> {movie}</Text>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.icons}>
              <View style={styles.containerx}>
                <Octicons
                  name="star-fill"
                  size={20}
                  color={colors.gold}
                  onPress={() => fun2(_id)}
                />
              </View>
              <View style={styles.containery}>
                <AntDesign
                  name="delete"
                  size={20}
                  color={colors.accent}
                  onPress={() => fun1(_id)}
                />
              </View>
            </View>
          </View>
        );
      })}</View>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.paper,
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 30,
  },
  text: {
    marginBottom: 22,
  },
  subtitle: { color: colors.muted, fontSize: 15, marginTop: 8 },
  searchitemcontainer: {
    marginBottom: 22,
  },
  searchabar: {
    maxWidth: 520,
  },
  search: { borderColor: colors.line, borderRadius: 8, borderWidth: 1, height: 48, width: "100%" },
  searchmoviename: {
    maxWidth: 520,
  },
  container2: {
    alignSelf: "flex-start",
    marginBottom: 18,
  },
  container1: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 22,
    marginRight: 18,
    padding: 14,
    width: 210,
  },
  movieGrid: { flexDirection: "row", flexWrap: "wrap", maxWidth: 1120 },
  icons: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  containerx: { padding: 5 },
  containery: { padding: 5 },
  image: {
    backgroundColor: colors.line,
    borderRadius: 6,
    height: 260,
    width: "100%",
  },
  moviename: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 12,
  },
  List: {
    color: colors.ink,
    fontSize: 34,
    fontWeight: "800",
    marginTop: 7,
  },
  Logout: {
    position: "absolute",
    right: 32,
    top: 28,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.line,
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  logoutText: { color: colors.muted, fontSize: 13, fontWeight: "700", marginLeft: 5 },
});
