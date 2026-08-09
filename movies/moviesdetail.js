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
import config from "../config";
import LoadingState from "../component/ui/LoadingState";
import { colors, theme } from "../component/ui/theme";
export default function Moviesdetail({ route, navigation }) {
  const [myData, setmyData] = useState({});
  const [userdata, setuserdata] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    const movieId = route?.params?.movie;
    if (!movieId) {
      setError("This movie could not be found.");
      setLoading(false);
      return;
    }
    Promise.all([
      axios.get(`${config.backend_url}/api/rating/one/${movieId}`),
      axios.get(`${config.backend_url}/api/movie/one/${movieId}`),
    ])
      .then(([ratingsResponse, movieResponse]) => {
        setuserdata(Array.isArray(ratingsResponse.data) ? ratingsResponse.data : []);
        setmyData(movieResponse.data && typeof movieResponse.data === "object" ? movieResponse.data : {});
      })
      .catch(() => setError("We could not load this film right now."))
      .finally(() => setLoading(false));
  }, [route?.params?.movie]);

  const sum = userdata.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0);
  const avgRating = userdata.length ? (sum / userdata.length).toFixed(1) : "0.0";

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
      {loading || error ? <LoadingState error={error} onRetry={() => navigation.replace("moviesdetail", route.params)} /> : null}
      {!loading && !error && <>
      <View style={styles.topbar}>
        <Pressable onPress={() => navigation.goBack()}><Text style={styles.back}>Back to collection</Text></Pressable>
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
      <View style={styles.hero}>
        <View style={styles.posterFrame}>
        <Image source={{ uri: myData.image }} style={styles.image}></Image>
        </View>
        <View style={styles.info}>
          <Text style={theme.eyebrow}>Film detail</Text>
          <Text style={styles.moviedata}>{myData.movie}</Text>
          <Text style={styles.description}>A film in your personal archive, ready for another viewing.</Text>
          <View style={styles.ratingPanel}>
            <Text style={styles.ratingLabel}>COMMUNITY RATING</Text>
            <View style={styles.ratingRow}>
              <Rating type="star" ratingCount={5} imageSize={25} readonly fractions={1} startingValue={avgRating} />
              <Text style={styles.ratingValue}>{avgRating}</Text>
            </View>
          </View>
          <Pressable style={theme.primaryButton} onPress={fun1}><Text style={theme.primaryButtonText}>Add your rating</Text></Pressable>
        </View>
      </View>

      <View style={styles.userRatingList}>
        <Text style={styles.RatingText}>Recent ratings</Text>

        <Text style={styles.username}> {userRatingList()}</Text>
      </View>

      <View style={styles.containerx}></View>
      </>}
      {/* <View style={styles.list}>
            <TouchableOpacity onPress={()=>navigation.navigate("movielist",avgRating)}>List</TouchableOpacity>
            
        </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.paper,
    flex: 1,
    paddingHorizontal: 42,
    paddingVertical: 28,
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
  topbar: { alignItems: "center", flexDirection: "row", justifyContent: "space-between", marginBottom: 34 },
  back: { color: colors.muted, fontSize: 13, fontWeight: "700" },
  logoutText: { color: colors.muted, fontSize: 13, fontWeight: "700", marginLeft: 5 },
  hero: { alignItems: "center", flexDirection: "row", gap: 56, justifyContent: "center", maxWidth: 980, width: "100%" },
  posterFrame: { backgroundColor: colors.midnight, borderRadius: 10, padding: 8 },
  info: { maxWidth: 480, width: "45%" },
  description: { color: colors.muted, fontSize: 15, lineHeight: 23, marginBottom: 28, marginTop: 14 },
  ratingPanel: { borderColor: colors.line, borderRadius: 8, borderWidth: 1, marginBottom: 24, padding: 18 },
  ratingLabel: { color: colors.muted, fontSize: 11, fontWeight: "800", letterSpacing: 1.3, marginBottom: 10 },
  ratingRow: { alignItems: "center", flexDirection: "row", gap: 16 },
  ratingValue: { color: colors.ink, fontSize: 24, fontWeight: "800" },
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
  },
  moviedata: {
    color: colors.ink,
    fontSize: 42,
    fontWeight: "800",
    marginTop: 10,
  },
  avg: {
    justifyContent: "center",
    margin: -170,
    // marginLeft:0
  },
  userRatingList: {
    maxWidth: 980,
    paddingVertical: 34,
    width: "100%",
  },
  RatingText: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 18,
  },
  username: {
    color: colors.muted,
    fontSize: 15,
  },
  image: {
    borderRadius: 5,
    height: 440,
    width: 300,
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
});
