import axios from "axios";
import react, { useState } from "react";
import { Button } from "react-native";
import { Text, View, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-web";

export default function Password({ navigation }) {
  const [phNo, setphNo] = useState("");

  const [error, setError] = useState("");
  const token = JSON.parse(localStorage.getItem("User Name"));
  const userid = token.userId;

  const handleEnterPress = (userid) => {
    if (phNo === "") {
      setError("Please enter your Phno.");
      return;
    }
    axios.get(`http://localhost:3000/api/user/one/${userid}`).then((res) => {
      const fetchedPhNo = res.data.phno;

      if (phNo === fetchedPhNo.toString()) {
        navigation.navigate("NewPassword");
      } else {
        setError("Phone number does not match.");
      }
    });
  };
  return (
    <View style={Styles.input}>
      <Text color="red">
        <h1>Please Enter Ur Phno..</h1>
      </Text>
      <TextInput
        style={Styles.lastpassword}
        placeholder="Enter Phno"
        value={phNo}
        onChangeText={(text) => {
          setphNo(text);
          setError("");
        }}
      ></TextInput>
      {error !== "" && <Text style={Styles.error}>{error}</Text>}
      <Button
        title="Enter"
        color="red"
        onPress={() => handleEnterPress(userid)}
      />

      <TouchableOpacity onPress={() => navigation.navigate("OtherWay")}>
        <Text>
          <h4>Try Another Way!</h4>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const Styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: "#5dade2",
    alignItems: "center",
    justifyContent: "center",
  },
  lastpassword: {
    backgroundColor: "#f0f3f4",
    margin: 5,
    width: 250,
    borderRadius: 5,
    height: 30,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#02436d",
  },
  error: {
    color: "red",
    marginTop: 5,
  },
});
