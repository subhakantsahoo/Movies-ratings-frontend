import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "./theme";

export default function LoadingState({ error, onRetry, label = "Loading your collection" }) {
  return (
    <View style={styles.container}>
      {error ? (
        <>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>{error}</Text>
          {onRetry && (
            <Text onPress={onRetry} style={styles.retry}>
              Try again
            </Text>
          )}
        </>
      ) : (
        <>
          <ActivityIndicator color={colors.accent} size="large" />
          <Text style={styles.message}>{label}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 220,
    padding: 28,
  },
  title: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  message: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 14,
    textAlign: "center",
  },
  retry: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 18,
  },
});
