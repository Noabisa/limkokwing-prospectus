import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

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
        contentContainerStyle={{ paddingBottom: 40 }}
       renderItem={({ item }) => (
  <View style={styles.card}>
    <Image
      source={
        typeof item.image === "number"
          ? item.image
          : item.image?.uri
          ? item.image
          : { uri: item.image }
      }
      style={styles.image}
      resizeMode="cover"
    />

    <View style={styles.cardContent}>
<View style={styles.titleRow}>

  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingRight: 10 }}
    style={{ flex: 1, marginRight: 10 }}
  >
    <Text style={styles.title}>
      {item.name}
    </Text>
  </ScrollView>

  <TouchableOpacity
    onPress={() =>
      navigation.navigate("CourseDetails", { course: item })
    }
  >
    <Text style={styles.detailsText}>More Details</Text>
  </TouchableOpacity>

</View>

  <Text style={styles.level}>{item.level}</Text>

</View>
  </View>
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

  header: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 30,
    marginBottom: 24,
    paddingHorizontal: SIDE_MARGIN,
  },

  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: SIDE_MARGIN,
    marginBottom: 24,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 6,
  },

  image: {
    width: "100%",
    height: 200,
  },

  cardContent: {
    padding: 20,
  },

  level: {
    fontSize: 14,
    color: "#64748b",
  },
titleRow: {
  flexDirection: "row",
  alignItems: "center",
},

title: {
  fontSize: 18,
  fontWeight: "700",
  color: "#1e293b",
  marginRight: 15,   
},

detailsText: {
  fontSize: 14,
  fontWeight: "600",
  color: "#2563eb",
},
});