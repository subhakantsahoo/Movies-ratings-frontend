import react from "react";
//import react ,{useState} from 'react';
import { Text, View, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-web";
import axios from "axios";
import { useState } from "react";

export default function Newpassword({ navigation }) {
  const [password, setpassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [error, setError] = useState("");
  const [isFieldsFilled, setIsFieldsFilled] = useState(false);

  const token = JSON.parse(localStorage.getItem("User Name"));
  const userid = token.userId;
  const confirmPassWord = async (userid) => {
    setIsFieldsFilled(true);
    const isFieldsValid = checkFields(password, confirm);
    if (!isFieldsValid) {
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/api/user/${userid}`, {
        _id: userid,
        password: password,
      });

      navigation.navigate("Result");
    } catch (error) {
      console.log(error);
    }
  };
  const checkFields = (passwordValue, confirmValue) => {
    if (passwordValue === confirmValue && passwordValue !== "") {
      setError("");
      return true;
    }
    if (passwordValue === "") {
      return false;
    }
    if (confirmValue === "") {
      setError("Please confirm  Pasword");
      return false;
    } else {
      setError("Passwords do not match or are empty");
      return false;
    }
  };

  const handlePasswordChange = (text) => {
    setpassword(text);
    // checkFields(text, confirm);
    if (isFieldsFilled) {
      checkFields(text, confirm);
    }
  };

  const handleConfirmChange = (text) => {
    setconfirm(text);
    // checkFields(password, text);
    // setError("Please confirm the New Pasword");
    if (isFieldsFilled) {
      checkFields(password, text);
    }
    // setError("Please confirm the New Password");
  };

  return (
    <View style={Styles.container}>
      <Text>
        <h2>Create A New Password</h2>
      </Text>
      <TextInput
        style={Styles.newpassword}
        placeholder="New Password"
        onChangeText={handlePasswordChange}
      ></TextInput>
      <TextInput
        style={Styles.confirm}
        placeholder="Confirm Password"
        onChangeText={handleConfirmChange}
      ></TextInput>
      {error !== "" && <Text style={Styles.error}>{error}</Text>}
      <Button
        title="Enter"
        color="red"
        onPress={() => confirmPassWord(userid)}
      ></Button>
    </View>
  );
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5dade2",
    alignItems: "center",
    justifyContent: "center",
  },
  newpassword: {
    backgroundColor: "#f0f3f4",
    margin: 5,
    width: 250,
    borderRadius: 5,
    height: 30,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#02436d",
  },
  confirm: {
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
