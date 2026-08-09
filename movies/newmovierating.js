//import { useState } from "react";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-web";
import axios from "axios";
import config from "../config";
import LoadingState from "../component/ui/LoadingState";
import { colors, theme } from "../component/ui/theme";

export default function Newmovieratings({ navigation }) {
  const [movie, setmovie] = useState("");
  const [image, setimage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addMovie = async () => {
    if (!movie.trim() || !image.trim()) {
      setError("Add a film title and a poster image URL.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axios.post(`${config.backend_url}/api/movie/create`, {
        movie: movie.trim(),
        image: image.trim(),
      });
      setSuccess("Film added to your collection.");
      setTimeout(() => navigation.navigate("movielist", { refresh: Date.now() }), 450);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "The film could not be added. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.shell}>
        <Text style={theme.eyebrow}>New entry</Text>
        <Text style={styles.title}>Add a film to the archive.</Text>
        <Text style={theme.body}>Give your collection another story to return to.</Text>
        <View style={styles.form}>
          <Text style={styles.label}>FILM TITLE</Text>
          <TextInput style={theme.input} placeholder="e.g. The Empire Strikes Back" onChangeText={setmovie} value={movie} />
          <Text style={styles.label}>POSTER IMAGE URL</Text>
          <TextInput style={theme.input} placeholder="https://..." autoCapitalize="none" onChangeText={setimage} value={image} />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? <Text style={styles.success}>{success}</Text> : null}
          {loading ? <LoadingState label="Adding film to your archive" /> : <Pressable style={theme.primaryButton} onPress={addMovie}><Text style={theme.primaryButtonText}>Add to collection</Text></Pressable>}
          <Pressable style={styles.cancel} onPress={() => navigation.goBack()}><Text style={styles.cancelText}>Cancel</Text></Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.paper,
    flex: 1,
    justifyContent: "center",
    padding: 28,
  },
  shell: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 12,
    borderWidth: 1,
    maxWidth: 680,
    padding: 42,
    width: "100%",
  },
  title: { color: colors.ink, fontSize: 34, fontWeight: "800", marginBottom: 10, marginTop: 10 },
  form: { gap: 10, marginTop: 30 },
  label: { color: colors.muted, fontSize: 11, fontWeight: "800", letterSpacing: 1.5, marginTop: 8 },
  error: { color: colors.accentDark, fontSize: 13, marginTop: 8 },
  success: { color: "#16805C", fontSize: 13, marginTop: 8 },
  cancel: { alignItems: "center", padding: 12 },
  cancelText: { color: colors.muted, fontSize: 13, fontWeight: "700" },
});
