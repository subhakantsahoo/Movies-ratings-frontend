//import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";
import { TextInput } from "react-native";
import axios from "axios";
import authContext from "./user-context";
import config from "../config";
import { colors, theme } from "../component/ui/theme";
export default function Homescreen({ navigation }) {
  const [user, setuser] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [intro] = useState(new Animated.Value(0));

  const usercontext = useContext(authContext);
  // const tokencontext=useContext(AuthContext);

  useEffect(() => {
    Animated.timing(intro, { toValue: 1, duration: 650, useNativeDriver: true }).start();
  }, []);
  const userValidation = () => {
    if (user.trim() === "" || password.trim() === "") {
      setError("Enter both your username and password to continue.");
      return;
    }
    setLoading(true);
    setError("");
    axios
      .post(`${config.backend_url}/api/auth/login`, {
        user: user,
        password: password,
      })
      .then((response) => {
        if (response.data) {
          const userId = response.data.userId;
          localStorage.setItem("User Name", JSON.stringify(response.data));
          usercontext.setuser(user);
          navigation.navigate("movielist", { userId: userId });
        } else {
          setError("We could not verify those details.");
        }
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Those details were not recognised. Try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.brandPanel}>
        <Text style={styles.brandMark}>FRAME / 01</Text>
        <View>
          <Text style={styles.brandTitle}>Stories worth{`\n`}remembering.</Text>
          <Text style={styles.brandCopy}>A considered home for your watchlist, ratings, and the films that stay with you.</Text>
        </View>
        <Text style={styles.brandFooter}>CURATE YOUR CINEMA</Text>
      </View>
      <Animated.View style={[styles.formPanel, { opacity: intro, transform: [{ translateY: intro.interpolate({ inputRange: [0, 1], outputRange: [18, 0] }) }] }]}>
        <Text style={theme.eyebrow}>Welcome back</Text>
        <Text style={styles.heading}>Your cinema, continued.</Text>
        <Text style={[theme.body, styles.subheading]}>Sign in to pick up where you left off.</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>USERNAME</Text>
          <TextInput style={theme.input} placeholder="Enter your username" value={user} onChangeText={setuser} autoCapitalize="none" />
          <Text style={styles.label}>PASSWORD</Text>
          <TextInput style={theme.input} placeholder="Enter your password" value={password} secureTextEntry onChangeText={setpassword} />
        </View>
        {error !== "" && <Text style={styles.error}>{error}</Text>}
        <Pressable style={({ pressed }) => [theme.primaryButton, pressed && styles.pressed, loading && styles.disabled]} onPress={userValidation} disabled={loading}>
          <Text style={theme.primaryButtonText}>{loading ? "Signing in..." : "Enter the collection"}</Text>
        </Pressable>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}><Text style={styles.link}>Forgot password?</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("registrationfile")}><Text style={styles.link}>Create account</Text></TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.paper,
    flexDirection: "row",
  },
  brandPanel: { backgroundColor: colors.midnight, flex: 1, justifyContent: "space-between", padding: 54 },
  brandMark: { color: colors.gold, fontSize: 12, fontWeight: "800", letterSpacing: 3 },
  brandTitle: { color: colors.white, fontSize: 48, fontWeight: "800", lineHeight: 54 },
  brandCopy: { color: "#B6C0CB", fontSize: 16, lineHeight: 25, marginTop: 24, maxWidth: 360 },
  brandFooter: { color: "#73808D", fontSize: 11, fontWeight: "800", letterSpacing: 2 },
  formPanel: { alignSelf: "center", justifyContent: "center", maxWidth: 490, padding: 54, width: "52%" },
  heading: { color: colors.ink, fontSize: 32, fontWeight: "800", marginTop: 12 },
  subheading: { marginTop: 10 },
  inputGroup: { gap: 9, marginTop: 34 },
  label: { color: colors.muted, fontSize: 11, fontWeight: "800", letterSpacing: 1.5, marginTop: 10 },
  error: {
    color: colors.accentDark,
    fontSize: 13,
    marginBottom: 15,
    marginTop: 15,
  },
  actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 24 },
  link: { color: colors.accentDark, fontSize: 13, fontWeight: "700" },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.55 },
});
