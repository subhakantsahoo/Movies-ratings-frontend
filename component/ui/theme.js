import { StyleSheet } from "react-native";

export const colors = {
  ink: "#111827",
  muted: "#667085",
  paper: "#F7F8FA",
  white: "#FFFFFF",
  line: "#E6E8EC",
  accent: "#E85D3F",
  accentDark: "#B83B28",
  midnight: "#17202A",
  gold: "#DCA94B",
};

export const theme = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  content: {
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    paddingHorizontal: 28,
    paddingVertical: 26,
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  title: {
    color: colors.ink,
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  body: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.ink,
    height: 52,
    paddingHorizontal: 16,
    width: "100%",
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 50,
    paddingHorizontal: 22,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
});
