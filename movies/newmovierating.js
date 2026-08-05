//import { useState } from "react";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
//import { AirbnbRating } from "react-native-ratings";
//import { AirbnbRating } from "react-native-ratings";
import { Rating } from "react-native-ratings";
import { Button, TextInput, TouchableOpacity } from "react-native-web";
import { useState } from "react";
import axios from "axios";
export default function Newmovieratings({ navigation, route }) {
  const [rating, setrating] = useState("");
  const [movie, setmovie] = useState("");
  const [image, setimage] = useState("");
  const [year, setyear] = useState("");
  //const { id } = route.params;
  //console.log(route.params);
  const fun2 = () => {
    try {
      const data = axios
        .post(`http://localhost:3000/api/movie/create`, {
          movie: movie,
          image: image,
        })
        .then((response) => {
          console.log("************", response);
          if (response.data) {
            navigation.navigate("movielist", { movie: response.data.movie }),
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
      <Text style={styles.container1}>Enter New Movie Name</Text>

      <View style={styles.box}>
        <TextInput
          style={styles.name}
          placeholder="MovieName"
          onChangeText={(movie) => setmovie(movie)}
          value={movie}
        ></TextInput>
        <TextInput
          style={styles.url}
          placeholder="Image Link"
          onChangeText={(image) => setimage(image)}
          value={image}
        ></TextInput>

        {/* <TextInput style={styles.year} placeholder='Year' onChangeText={(year)=>setyear(year)} value={year}></TextInput>  */}
        {/* <TextInput style={styles.score} placeholder='Score' onChangeText={(rating)=>setrating(rating)} value={rating}></TextInput> */}
      </View>
      <View style={styles.container2}>
        <Button title="submit" onPress={fun2}></Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aed6f1",

    //justifyContent:'center'
  },
  container1: {
    fontSize: 28,
    color: "black",
    textAlign: "center",
    marginVertical: 20,
  },
  container2: {
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    margin: -40,
  },
  container3: {
    justifyContent: "center",
    marginLeft: 450,
    margin: 10,
  },
  box: {
    backgroundColor: "#aed6f1",
    width: 160,
    height: 120,
    //  marginLeft:1000,

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
    marginLeft: 20,
  },
  url: {
    backgroundColor: "#f0f3f4",
    margin: 5,
    width: 150,
    borderRadius: 5,
    height: 35,
    marginLeft: 20,
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
});
