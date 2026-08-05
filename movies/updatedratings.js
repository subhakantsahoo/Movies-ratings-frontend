//import { useState } from "react";
import React, { useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
//import { AirbnbRating } from "react-native-ratings";
//import { AirbnbRating } from "react-native-ratings";
import { Rating } from "react-native-ratings";
import { Button, TextInput, TouchableOpacity } from "react-native-web";
import { useState } from "react";
import axios from "axios";
import authContext from "./user-context";

export default function Ratings({ navigation, route }) {
  const [rating, setrating] = useState("");
  const [movie, setmovie] = useState("");
  const [year, setyear] = useState("");
  const [myData, setmyData] = useState([]);
  const [user, setuser] = useState("");
  const usercontext = useContext(authContext);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/rating/get")
  //     .then((res) => setrating(res.data));
  // }, [route]);

  useEffect(() => {
    if (route.params) {
      console.log(route.params.movie);
      axios
        .get(`http://localhost:3000/api/movie/one/${route.params.movie}`)
        .then((res) => {
          console.log(res);
          setmyData(res.data);
        });
    }
  }, [route]);

  const fun2 = (userId) => {
    try {
      const token = route.params.movie;
      console.log("********###", token);

      const user = JSON.parse(localStorage.getItem("User Name"));
      console.log("$$$$$$$$$$", user);
      const userID = user?.userId;
      axios
        .post(`http://localhost:3000/api/rating/create`, {
          rating: rating,
          movie: route.params?.movie,
          user: userID,
        })
        .then((response) => {
          console.log("************", response);
          if (response.data) {
            navigation.navigate("moviesdetail", { movie: response.data.movie }),
              {
                ...response?.data,
              };
          } else {
            alert(response.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.data}>
        <Text style={styles.moviename}> {myData.movie} </Text>
        <Image source={{ uri: myData.image }} style={styles.image}></Image>
      </View>
      <Rating
        type="star"
        ratingCount={5}
        showRating={true}
        ratingTextColor="red"
        fractions={1}
        jumpValue={0.1}
        onFinishRating={(rating) => setrating(rating)}
        value={rating}
        startingValue={0}
        //   onFinishRating={(rating)=>setrating(rating)}
      />

      {/* <View style={styles.box}> */}
      {/* <TextInput style={styles.name} placeholder='UserName' onChangeText={(user)=>setuser(user)} value={user}></TextInput> */}
      {/* //       <TextInput style={styles.year} placeholder='Year' onChangeText={(year)=>setyear(year)} value={year}></TextInput> */}
      {/* <TextInput style={styles.score} placeholder='Score' onChangeText={(rating)=>setrating(rating)} value={rating}></TextInput> */}
      {/* </View>  */}
      <View style={styles.container2}>
        <Button
          title="cancel"
          onPress={() => navigation.navigate("moviesdetail")}
        ></Button>
      </View>
      <View style={styles.container3}>
        <Button title="submit" onPress={() => fun2()}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    //justifyContent:'center'
  },
  container1: {
    fontSize: 28,
    color: "black",
    textAlign: "center",
    marginVertical: 20,
  },
  container2: {
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    marginRight: 400,
    margin: 100,
  },
  container3: {
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    marginLeft: 300,
    margin: -130,
  },
  box: {
    backgroundColor: "#aed6f1",
    width: 160,
    height: 120,
    flexShrink: 50,
    //alignContent:'center',
    // justifyContent:'center'
    //textAlign:'center',
    //alignContent:'center',
    //justifyContent:'center',
    //alignItems:'center',
    margin: 20,
    marginLeft: 550,
  },
  name: {
    backgroundColor: "#f0f3f4",
    margin: 5,
    width: 150,
    borderRadius: 5,
    height: 35,
  },
  score: {
    backgroundColor: "#f0f3f4",
    margin: 5,
    width: 150,
    borderRadius: 5,
    height: 35,
  },
  year: {
    backgroundColor: "#f0f3f4",
    margin: 5,
    width: 150,
    borderRadius: 5,
    height: 35,
  },
  data: {
    margin: 10,
    justifyContent: "center",
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },
  image: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "red",
    marginTop: 0,
    width: 200,
    height: 270,
    marginLeft: 10,
  },
  moviename: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "bold",
  },
});
