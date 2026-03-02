import React from "react";
import { View, Text, StyleSheet, Linking, Pressable, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const CONTENT_WIDTH = width > 900 ? 900 : width;
const SIDE_MARGIN = width > 900 ? (width - 900) / 2 : 24;

export default function Footer() {
  const openWebsite = () => {
    Linking.openURL("https://www.limkokwing.net");
  };

  return (
    <View style={styles.footer}>
      <View style={styles.container}>
        {/* University Name and Tagline */}
        <Text style={styles.university}>
          Limkokwing University of Creative Technology
        </Text>
        <Text style={styles.tagline}>
          Innovative • Global • Creative
        </Text>

        {/* Columns */}
        <View style={styles.columns}>
          <View style={styles.column}>
            <Text style={styles.label}>📍 Location</Text>
            <Text style={styles.text}>Maseru, Lesotho</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>📞 Contact</Text>
            <Text style={styles.text}>Toll Free: 80022066 / 80022088</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>🌐 Website</Text>
            <Pressable onPress={openWebsite}>
              <Text style={styles.link}>http://limkokwing.ac.ls/subpanel/limkokwing_university.asp</Text>
            </Pressable>
          </View>
        </View>

        {/* Copyright */}
        <Text style={styles.copy}>
          © {new Date().getFullYear()} Limkokwing University. All Rights Reserved.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#0f172a",
    marginTop: 40,
    paddingVertical: 20,
  },

  container: {
    paddingHorizontal: SIDE_MARGIN,
  },

  university: {
    fontSize: 10,
    fontWeight: "200",
    color: "#ffffff",
    marginBottom: 6,
    textAlign: "center",
  },

  tagline: {
    fontSize: 9,
    color: "#94a3b8",
    marginBottom: 20,
    textAlign: "center",
  },

  columns: {
    flexDirection: width > 600 ? "row" : "column", // row for large screens
    justifyContent: "space-between",
    marginBottom: 25,
  },

  column: {
    flex: 1,
    marginBottom: width > 600 ? 0 : 20, // spacing for stacked columns
    paddingHorizontal: width > 600 ? 10 : 0,
  },

  label: {
    fontSize: 9,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },

  text: {
    fontSize: 9,
    color: "#cbd5e1",
  },

  link: {
    fontSize: 6,
    color: "#38bdf8",
    textDecorationLine: "underline",
  },

  copy: {
    marginTop: 10,
    fontSize: 7,
    color: "#64748b",
    textAlign: "center",
  },
});