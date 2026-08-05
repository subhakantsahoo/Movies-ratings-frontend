import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native-web";
import { AntDesign } from "@expo/vector-icons";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function Logout({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.container} onClick={handlePress}>
      {isLoading ? (
        <LoadingOutlined name="loading" size={24} />
      ) : (
        <AntDesign name="logout" size={24} color="black" />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    display: "inline-block",
  },
});
