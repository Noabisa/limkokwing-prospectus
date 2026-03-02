import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";


const { width } = Dimensions.get("window");

const CONTENT_WIDTH = width > 900 ? 900 : width;
const SIDE_MARGIN = width > 900 ? (width - 900) / 2 : 24;

export default function CoursesScreen({ route, navigation }) {
  const { faculty } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{faculty.name}</Text>

      <FlatList
  data={faculty.programmes}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("CourseDetails", { course: item })}
    >
      <Image
  source={
    typeof item.image === "number"
      ? item.image        // local image (require)
      : item.image?.uri   // remote image already wrapped
      ? item.image
      : { uri: item.image } // remote image as string
  }
  style={styles.image}
/>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.level}>{item.level}</Text>
      </View>
    </TouchableOpacity>
  )}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  // =========================
  // Header
  // =========================
  header: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 30,
    marginBottom: 24,
    paddingHorizontal: SIDE_MARGIN,
    letterSpacing: 0.5,
  },

  // =========================
  // Course Card
  // =========================
  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: SIDE_MARGIN,
    marginBottom: 24,
    borderRadius: 24,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },

  image: {
    width: "100%",
    height: 200,
  },

  cardContent: {
    padding: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 6,
  },

  level: {
    fontSize: 14,
    color: "#64748b",
  },
});