import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import { Video } from "expo-av"; // Make sure to install expo-av

const { width } = Dimensions.get("window");

const CONTENT_WIDTH = width > 900 ? 900 : width;
const SIDE_MARGIN = width > 900 ? (width - 900) / 2 : 24;

export default function CourseDetailsScreen({ route }) {
  const { course } = route.params;
  const [rating, setRating] = useState(course.rating);

  const handleRating = (value) => {
    const newRating = rating + value;
    setRating(newRating > 6 ? 6 : newRating); // Max 6
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{course.name}</Text>
      <Text style={styles.level}>{course.level}</Text>
      <Image
       source={
    typeof course.image === "number"
      ? course.image
      : course.image?.uri
      ? course.image
      : { uri: course.image }
  }
  style={styles.image}
/>

      <Text style={styles.entryHeader}>Entry Requirements:</Text>
      <Text style={styles.entry}>{course.entryRequirements}</Text>

      <Text style={styles.ratingHeader}>Rate this course:</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5, 6].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(1)}>
            <Text style={{ fontSize: 30 }}>{star <= rating ? "⭐" : "☆"}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.ratingText}>Rating: {rating} / 6</Text>

      <Text style={styles.videoHeader}>Course Video:</Text>
      <Video
  source={
    typeof course.video === "number"
      ? course.video               // local video (require)
      : { uri: course.video }      // online video
  }
  style={styles.video}
  useNativeControls
  resizeMode="contain"
/>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  // =========================
  // Title Section
  // =========================
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 30,
    marginBottom: 6,
    paddingHorizontal: SIDE_MARGIN,
  },

  level: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 24,
    paddingHorizontal: SIDE_MARGIN,
  },

  // =========================
  // Image
  // =========================
  image: {
    width: CONTENT_WIDTH - SIDE_MARGIN * 2,
    height: 240,
    alignSelf: "center",
    borderRadius: 24,
    marginBottom: 30,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 8,
  },

  // =========================
  // Entry Requirements Card
  // =========================
  entryHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 10,
  },

  entry: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },

  entryCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: SIDE_MARGIN,
    padding: 22,
    borderRadius: 24,
    marginBottom: 30,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 4,
  },

  // =========================
  // Rating Section
  // =========================
  ratingHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 14,
  },

  stars: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },

  ratingText: {
    fontSize: 16,
    textAlign: "center",
    color: "#334155",
    marginBottom: 20,
  },

  ratingCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: SIDE_MARGIN,
    padding: 24,
    borderRadius: 24,
    marginBottom: 30,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 4,
  },

  // =========================
  // Video Section
  // =========================
videoHeader: {
  fontSize: 20,
  fontWeight: "700",
  color: "#1e293b",
  marginBottom: 14,
},

video: {
  width: "100%",
  height: 240,
  borderRadius: 20,
  overflow: "hidden",
},

videoCard: {
  backgroundColor: "#ffffff",
  marginHorizontal: SIDE_MARGIN,
  padding: 20,
  borderRadius: 24,
  marginBottom: 50,

  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowOffset: { width: 0, height: 8 },
  shadowRadius: 12,
  elevation: 6,
},
});