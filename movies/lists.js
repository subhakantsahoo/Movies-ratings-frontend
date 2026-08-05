import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native-web";

import { Image } from "react-native-web";
import { useState } from "react";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import Logout from "./logout";
import { Input, Space } from "antd";
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
  const [movie, setmovie] = useState("");

  const fun1 = (_id) => {
    try {
      const { data } = axios
        .delete(`http://localhost:3000/api/movie/${_id}`)
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
  const token = JSON.parse(localStorage.getItem("User Name")).token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/movie/get", { headers: headers })
      .then((res) => {
        setmyData(res.data);
      });
  }, []);

  //Search Bar****

  const search = () => {
    axios
      .get(`http://localhost:3000/api/movie/search/${input}`)
      .then((res) => {
        setmyData(res.data);
      })
      .catch((error) => console.log(error));
  };

  const filteredData = myData.filter((item) => {
    const moviex = item.movie.toLowerCase();
    const inputy = input.toLowerCase();
    return moviex.startsWith(inputy);
  });

  const handlePress = (value) => {
    setinput(value);
    const filteredDataWithSelectedMovie = myData.filter((item) => {
      const moviex = item.movie.toLowerCase();
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
        const moviex = item.movie.toLowerCase();
        const inputy = text.toLowerCase();
        return moviex.startsWith(inputy);
      });
      setmyData(filteredDataWithSelectedMovie);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.List}>Movies List</Text>
      </View>
      <View style={styles.container2}>
        <Button
          title="AddNewMovie"
          onPress={() => navigation.navigate("newmovieslist")}
        ></Button>
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
          <Text>Logout{logoutEmoji}</Text>
        </Pressable>
      </View>
      <View style={styles.searchitemcontainer}>
        <View style={styles.searchabar}>
          <Search
            placeholder="Search Movie.."
            onChange={handleInputChange}
            value={input}
            onSearch={search}
            style={{
              width: 200,
            }}
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
                <View style={{ marginVertical: 10 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      alignSelf: "flex-start",
                    }}
                  >
                    <TouchableOpacity
                      key={_id}
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
      {myData.map((data) => {
        const { _id, movie, image } = data;
        return (
          <View style={styles.container1} key={_id}>
            <Text style={styles.moviename}> {movie}</Text>
            <Image source={{ uri: image }} style={styles.image}></Image>
            <View style={styles.icons}>
              <View style={styles.containerx}>
                <Octicons
                  name="star-fill"
                  size={20}
                  color="black"
                  onPress={() => fun2(_id)}
                />
              </View>
              <View style={styles.containery}>
                <AntDesign
                  name="delete"
                  size={20}
                  color="black"
                  onPress={() => fun1(_id)}
                />
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    alignContent: "center",
    textAlign: "center",
    margin: 10,
  },
  searchitemcontainer: {
    alignContent: "center",
    justifyContent: "center",
  },
  searchabar: {
    marginRight: 300,
    margin: 10,
  },
  searchbox: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 10,
    alignContent: "center",
    fontSize: 15,
  },
  FontAwesome: {
    marginLeft: 130,
    margin: -30,
  },

  searchButton: {
    alignItems: "flex-start",

    marginLeft: 230,

    margin: -10,
  },
  searchmoviename: {
    marginRight: 310,
    margin: 20,
  },

  container2: {
    justifyContent: "center",
    marginLeft: 290,
    margin: -20,
  },
  container1: {
    textAlign: "center",
    marginRight: 400,
    alignContent: "space-between",
    margin: 70,
  },
  container3: {
    justifyContent: "center",
    marginLeft: 400,
    marginTop: -58,
  },
  icons: {
    justifyContent: "center",
    width: 100,
    marginLeft: 400,
    margin: -60,
  },

  containerx: {
    alignItems: "center",
    margin: -18,
    marginRight: 50,
  },
  containery: {
    alignItems: "center",
    margin: -6,
    marginLeft: 50,
  },
  image: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "green",
    marginTop: 0,
    width: 140,
    height: 180,
    marginLeft: 155,
  },
  moviename: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "bold",
  },
  List: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  Logout: {
    justifyContent: "center",
    marginLeft: 950,
    margin: -15,
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
  },
});
