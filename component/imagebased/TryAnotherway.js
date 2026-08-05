import react, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-web";
import axios from "axios";
//import Test from './component/axiocomponet/testaxio';
import { useEffect } from "react";
import { Columns } from "react-native-feather";

//import Test from '../axiocomponet/testaxio';
export default function AnotherWay({ navigation }) {
  const [data, setdata] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  const fun1 = () => {
    axios
      .get("http://localhost:3000/api/user/get/")
      .then((resp) => {
        setdata(resp.data);
        console.warn(resp.data);
        setButtonClicked(true);
      })
      .catch((err) => {
        console.error("404");
      });
  };

  const fun2 = () => {
    if (!buttonClicked) {
      return null;
    }
    return (
      <View>
        <View style={Styles.dataContainer}>
          {data.map((item, index) => {
            return (
              <View style={Styles.userData} key={index}>
                <View style={Styles.row}>
                  <Text style={Styles.heading}>User:</Text>
                  <Text style={Styles.detail}>{item.user}</Text>
                </View>
                <View style={Styles.row}>
                  <Text style={Styles.heading}>Password:</Text>
                  <Text style={Styles.detail}>{item.password}</Text>
                </View>
                <View style={Styles.row}>
                  <Text style={Styles.heading}>Phno:</Text>
                  <Text style={Styles.detail}>{item.phno}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={Styles.middleContainer}>
          <Text style={Styles.emoji}>😂😂😂😂😂😂</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={Styles.container}>
      <View style={Styles.container1}>
        <Text>
          <h1>Hello world...!!</h1>
        </Text>
        <Button
          style={{ margin: 10 }}
          title="click"
          color="black"
          onPress={fun1}
        ></Button>
        <Button
          style={Styles.home}
          title="Home"
          color="green"
          onPress={() => navigation.navigate("Homescreen")}
        />
      </View>

      <View style={Styles.container2}>{fun2()}</View>
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  container1: {
    flex: 1,
    backgroundColor: "#5dade2",
    alignItems: "center",
    justifyContent: "center",
    // padding: 10,
  },
  container2: {
    flex: 1,
    backgroundColor: "#5da",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  flexactivity: {
    backgroundColor: "#e74c3c",
  },
  home: {
    marginTop: 10,
  },
  textshow: {
    textAlign: "center",

    alignContent: "space-between",
  },
  detail: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "bold",
  },
  heading: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "bold",
  },
  dataContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  userData: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    marginRight: 5,
  },
  detail: {
    fontSize: 16,
  },
  middleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  emoji: {
    fontSize: 40,
  },
});
