import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native-web";
import axios from "axios";
import { AirbnbRating, Rating } from "react-native-ratings";
import Logout from "./logout";
export default function Moviesdetail({ route, navigation }) {
  const [myData, setmyData] = useState([]);
  const [movie, setmovie] = useState("");
  const [userdata, setuserdata] = useState([]);
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
  const fun1 = () => {
    //const {_id,movie,rating}=myData;
    navigation.navigate("ratings", { movie: route.params.movie });
    console.log("@@@@@@@@@%%%%%%%%%", route.params.movie);
  };

  useEffect(() => {
    if (route.params) {
      console.log(route.params.movie);
      axios
        .get(`http://localhost:3000/api/rating/one/${route.params.movie}`)
        .then((res) => {
          console.log(res);
          setuserdata(res.data);
        });
    }
  }, [route?.params]);

  //  console.log(route?.params);

  // useEffect(() => {
  //   // if(req.params.id ===route.params.rating)
  //   axios
  //     .get(`http://localhost:3000/api/rating/get` /*${route.params.movie}*/)

  //     .then((res) => setuserdata(res.data));
  // }, []);

  //   useEffect(() => {
  //     if (route.params) {
  //       console.log(route.params.movie);
  //       axios
  //         .get(`http://localhost:3000/api/movie/one/${route.params.movie}`)
  //         .then((res) => {
  //           console.log(res);
  //           setmyData(res.data);
  //         });
  //     }
  //   }, [route]);

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

  const sum = userdata.reduce((acc, curr) => acc + curr.rating, 0);
  const avgRating = (sum / userdata.length).toFixed(1);

  // const fun2 = () => {
  //     //const {_id,movie,rating}=myData;
  //     navigation.navigate("moviesdetail");
  //   };

  const userRatingList = () => {
    //  const { rating, movie, user } = props;
    return (
      <View>
        {userdata.map((data) => (
          <View key={data._id}>
            {/* const {(_id, rating, movie, user)} = data; */}
            <Text>
              <Text>{data.user && data.user.user}</Text>
              --------------------------------------------
              {/* {data.user.user && <Text>{data.user.user}</Text>} */}
              <View>
                <Rating
                  type="star"
                  imageSize={20}
                  ratingCount={5}
                  disabled={false}
                  fractions={1}
                  jumpValue={0.1}
                  readonly={true}
                  startingValue={data.rating}
                />
              </View>
            </Text>
          </View>
        ))}
      </View>
    );
  };

  // const data=userdata.map((data)=>{data.user}{data.rating});

  return (
    <View style={styles.container}>
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
      <View style={styles.container4}>
        <Text style={styles.moviedata}>{myData.movie}</Text>
        <Image source={{ uri: myData.image }} style={styles.image}></Image>
      </View>

      <View style={styles.avg}>
        <Text>
          <View>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={30}
              // showRating={true}
              //    ratingTextColor="red"
              readonly={true}
              fractions={1}
              //jumpValue={0.1}
              ratingBackgroundColor="#aed6f1"
              startingValue={avgRating}
            />
          </View>
          {avgRating}
        </Text>
      </View>
      <View style={styles.Add}>
        <Button title="Add" onPress={() => fun1(route.params.rating)} />
      </View>

      <View style={styles.userRatingList}>
        <Text style={styles.RatingText}>Ratings</Text>

        <Text style={styles.username}> {userRatingList()}</Text>
      </View>

      <View style={styles.containerx}></View>
      {/* <View style={styles.list}>
            <TouchableOpacity onPress={()=>navigation.navigate("movielist",avgRating)}>List</TouchableOpacity>
            
        </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    alignContent: "center",
    // justifyContent:'center',
    alignItems: "center",
    //  margin:-100,
    backgroundColor: "white",
  },
  text: {
    alignContent: "center",
    textAlign: "center",
    margin: 100,
  },
  text1: {
    alignContent: "center",
    textAlign: "center",
    margin: 10,
    justifyContent: "center",
  },
  Add: {
    justifyContent: "center",
    marginLeft: 450,
    margin: 190,
  },
  container1: {
    //justifyContent:'center',
    textAlign: "center",
    marginLeft: -400,
    //  alignContent:'space-between'
  },
  container3: {
    justifyContent: "center",
    marginLeft: 400,
    marginTop: -58,
  },
  containerx: {
    container1: {
      textAlign: "center",
      marginTop: 20,
    },
    list: {
      justifyContent: "center",
      marginLeft: 270,
      margin: 1,
    },
  },
  container4: {
    justifyContent: "center",
    marginRight: 700,
    // marginTop:30
    margin: 70,
  },
  moviedata: {
    fontSize: 28,
    color: "black",
    textAlign: "center",
    //    marginVertical: 20,
    //margin:20
  },
  avg: {
    justifyContent: "center",
    margin: -170,
    // marginLeft:0
  },
  userRatingList: {
    justifyContent: "center",
    margin: 0,
  },
  RatingText: {
    fontSize: 25,
    color: "black",
    textAlign: "center",
  },
  username: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  image: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "red",
    marginTop: 0,
    width: 290,
    height: 350,
    marginRight: 10,
  },
  Logout: {
    justifyContent: "center",
    marginLeft: 700,
    // marginTop:30
    margin: 10,
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
