//import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from "react";
import { createContext } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import axios from "axios";
import authContext from "./user-context";
// import AuthContext from './token-context';

export default function Homescreen({ navigation }) {
  const [showEmoji, setShowEmoji] = useState(false);

  // const history=useNavigation();
  // const [user,setuser]=useState('');
  const [user, setuser] = useState("");
  const [password, setpassword] = useState("");
  const [Error, setError] = useState("");

  const usercontext = useContext(authContext);
  // const tokencontext=useContext(AuthContext);

  useEffect(() => {
    setuser(localStorage.getItem("User Name"));
    // setuser(localStorage.setItem(""));
  }, []);

  //  const handleLogin = () => {

  //   if (user === '' && password === '') {
  //       setError('');
  //       navigation.navigate('movielist')
  //   }
  // //  else if (user === 'trex' && password === 'trex123') {
  // //     setError('');
  // //     navigation.navigate('Back')
  // // }
  //   else {
  //     setError('Invalid username or password');
  //   }
  // };

  //************************* */
  const handleMouseEnter = () => {
    setShowEmoji(true);
  };

  const handleMouseLeave = () => {
    setShowEmoji(false);
  };

  const userValidation = () => {
    console.log("***********");
    if (user.trim() === "" || password.trim() === "") {
      alert("Please enter both username and password");
      return;
    }
    axios
      .post(`http://localhost:3000/api/auth/login`, {
        user: user,
        password: password,
      })
      .then((response) => {
        console.log("token is created", response.data);
        if (response.data) {
          // const token = response.data.token;
          const authToken = response.data.Token;
          const userId = response.data.userId;
          console.log("Here is the authToken :: ", authToken);
          console.log("Here is the userId which is get from Token :: ", userId);
          console.log(
            "Here is the response data(created Token) setItem in localStorage***:: ",
            response.data
          );
          localStorage.setItem("User Name", JSON.stringify(response.data));
          usercontext.setuser(user);
          // tokencontext.setToken(token)
          // axios.defaults.headers.common['Authorization*******'] = `${token}`;
          navigation.navigate("movielist", { userId: userId });
        } else {
          alert(response.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
        console.log("Invalid UserName or Password");
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputbox}>
        <TextInput
          style={styles.user}
          placeholder="Username"
          onChangeText={(user) => {
            setuser(user);
          }}
        ></TextInput>
        <TextInput
          style={styles.password}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setpassword(password)}
        ></TextInput>
      </View>
      <View style={styles.forgetpassword}>
        <TouchableOpacity
          style={styles.passwordforget}
          onPress={() => navigation.navigate("Home")}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Text>
            Forget Password ?
            {showEmoji && <Text style={styles.emoji}> 😖</Text>}
          </Text>
        </TouchableOpacity>

        <View style={styles.Button}>
          <Button
            onPress={() => navigation.navigate("registrationfile")}
            title="Register"
            color={"#85929e"}
          ></Button>
        </View>
        <View style={styles.Button1}>
          <Button
            onPress={userValidation}
            title="Login"
            color={"#85929e"}
          ></Button>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3498db",
    alignContent: "center",
    justifyContent: "center",
  },

  user: {
    backgroundColor: "#f0f3f4",
    margin: 5,
    width: 251,
    borderRadius: 5,
    height: 30,
    borderColor: "#02436d",
  },
  password: {
    backgroundColor: "#f0f3f4",
    width: 250,
    borderRadius: 5,
    height: 30,
    borderColor: "#02436d",
    margin: 3,
  },
  passwordforget: {
    margin: 10,
    alignContent: "center",
    alignSelf: "center",
  },
  inputbox: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    margin: 20,
  },
  Buttonarea: {
    justifyContent: "space-around",
  },
  Button: {
    alignItems: "center",
    margin: 1,
  },
  Button1: {
    alignItems: "center",
    margin: 10,
  },
  error: {
    color: "red",
    marginBottom: 20,
  },
  emoji: {
    fontSize: 20,
  },
});
