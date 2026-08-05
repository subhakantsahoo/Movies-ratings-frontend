import react, { useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default function Newpasswordcreated({ navigation }) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Homescreen");
    }, 3000);
  });
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>
        <h3>
          Your New Password Have Been Created..
          {<Text style={Styles.emoji}>🙂👍</Text>}
        </h3>
      </Text>
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
  text: {
    fontSize: 25,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontStyle: "bold",
  },
  emoji: {
    fontSize: 40,
  },
});
