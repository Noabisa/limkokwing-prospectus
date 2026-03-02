import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { faculties } from "../data/faculties";

const { width } = Dimensions.get("window");

const CONTENT_WIDTH = width > 900 ? 900 : width;
const SIDE_MARGIN = width > 900 ? (width - 900) / 2 : 24;

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const mottos = [
  {
    title: "Be the Best in digital & creative skills",
    description:
      "From augmented reality and touchscreen consoles to 3D printers, we provide the latest technology and expert guidance to ensure that your creativity is your limit.",
    image: require("../assets/images/motto1.jpg"),
  },
  {
    title: "Be the Best in making global connections",
    description:
      "Build your network, gain cultural insights, and explore global business opportunities with students from over 150 countries.",
    image: require("../assets/images/motto2.jpg"),
  },
  {
    title: "Be the Best in your sphere of studies",
    description:
      "Our programmes in design, business, and architecture are crafted to inspire critical thinking and innovation.",
    image: require("../assets/images/motto3.jpg"),
  },
  {
    title: "Be the Best trained to succeed",
    description:
      "Adapt and thrive in a highly competitive, globalised society. Our incubation units will train you to come up with innovative and practical solutions to current industry challenges.",
    image: require("../assets/images/motto4.jpg"),
  },
];

useEffect(() => {
  const interval = setInterval(() => {
    let nextIndex = currentIndex + 1;

    if (nextIndex >= mottos.length) {
      nextIndex = 0;
    }

    Animated.timing(slideAnim, {
      toValue: -nextIndex * CONTENT_WIDTH,
      duration: 800,
      useNativeDriver: true,
    }).start();

    setCurrentIndex(nextIndex);
  }, 3000);

  return () => clearInterval(interval);
}, []);

  const allCourses = useMemo(() => {
  return faculties.flatMap(faculty =>
    faculty.programmes.map(course => ({
      ...course,
      facultyName: faculty.name,
    }))
  );
}, []);

const filteredCourses = useMemo(() => {
  if (!searchQuery.trim()) return [];

  const words = searchQuery
    .toLowerCase()
    .split(" ")
    .filter(word => word.length > 0);

  return allCourses.filter(course => {
    const courseName = course.name.toLowerCase();

    return words.every(word => courseName.includes(word));
  });
}, [searchQuery, allCourses]);


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

  {/* HERO BANNER */}
<View style={styles.bannerWrapper}>
  <Image
    source={require("../assets/images/luct.jpg")}
    style={styles.bannerImage}
    resizeMode="cover"
  />

  <View style={styles.overlay} />

  <View style={styles.heroTextContainer}>
    <Text style={styles.heroTitle}>
      Welcome to Limkokwing University
    </Text>
    <Text style={styles.heroSubtitle}>
      Explore our faculties and discover your future career path.
    </Text>
  </View>
</View>

<View style={styles.searchContainer}>
  <TextInput
    placeholder="Search for a course..."
    value={searchQuery}
    onChangeText={setSearchQuery}
    style={styles.searchInput}
  />
</View>
{searchQuery.length > 0 && (
  <View style={{ paddingHorizontal: SIDE_MARGIN }}>
    <Text style={styles.sectionHeader}>Search Results</Text>

    {filteredCourses.length === 0 ? (
      <Text style={{ marginBottom: 20 }}>No courses found.</Text>
    ) : (
      filteredCourses.map(course => (
        <Pressable
          key={course.id}
          style={styles.searchCard}
          onPress={() =>
            navigation.navigate("CourseDetails", { course })
          }
        >
          <Image source={{ uri: course.image }} style={styles.searchImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.searchTitle}>{course.name}</Text>
            <Text style={styles.searchFaculty}>
              {course.facultyName}
            </Text>
          </View>
        </Pressable>
      ))
    )}
  </View>
)}

<View style={styles.facultyGridContainer}>
  {faculties.map((faculty) => (
    <Pressable
      key={faculty.id}
      style={({ pressed }) => [
        styles.facultyGridCard,
        { transform: [{ scale: pressed ? 0.97 : 1 }] }
      ]}
      onPress={() =>
        navigation.navigate("Courses", { faculty })
      }
    >
      <Text style={styles.facultyGridText}>
        {faculty.name}
      </Text>
    </Pressable>
  ))}
</View>

{/* Mottos Slider */}
<View style={styles.sliderWrapper}>
  <Animated.View
    style={[
      styles.sliderContainer,
      { transform: [{ translateX: slideAnim }] },
    ]}
  >
    {mottos.map((item, index) => (
      <View key={index} style={styles.mottoSlide}>
        <Image source={item.image} style={styles.mottoImage} />
        

        <View style={styles.mottoContent}>
          <Text style={styles.mottoTitle}>{item.title}</Text>
          <Text style={styles.mottoDescription}>
            {item.description}
          </Text>
        </View>
      </View>
    ))}
  </Animated.View>
</View>
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

 // =========================
// HERO BANNER WITH OVERLAY
// =========================

bannerWrapper: {
  height: CONTENT_WIDTH * 0.55,
  marginBottom: 90,
  position: "relative",
},

bannerImage: {
  width: "100%",
  height: "100%",
},

overlay: {
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.45)", 
},

heroTextContainer: {
  position: "absolute",
  bottom: 10,
  left: SIDE_MARGIN,
  right: SIDE_MARGIN,
},

heroTitle: {
  fontSize: 26,
  fontWeight: "900",
  color: "#ffffff",
  marginBottom: 10,
},

heroSubtitle: {
  fontSize: 15,
  color: "#e2e8f0",
  lineHeight: 22,
},

heroButton: {
  marginTop: 15,
  backgroundColor: "#38bdf8",
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 12,
  alignSelf: "flex-start",
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 6,
  elevation: 4,
},

heroButtonText: {
  color: "#ffffff",
  fontWeight: "700",
  fontSize: 14,
},

facultyDropdown: {
  marginTop: 20,
  backgroundColor: "#1e293b",
  borderRadius: 12,
  overflow: "hidden",
},

dropdownItem: {
  paddingVertical: 10,
  paddingHorizontal: 11,
  borderBottomWidth: 1,
  borderBottomColor: "#334155",
},

dropdownText: {
  color: "#ffffff",
  fontWeight: "600",
  fontSize: 12,
},

  // Section Header
  sectionHeader: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 18,
    paddingHorizontal: SIDE_MARGIN,
  },

  // Faculties
  facultyContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: SIDE_MARGIN,
    marginBottom: 30,
  },

  facultyCard: {
    width: "48%",
    height: 55,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },

  cardTitle: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },

 // SLIDER WRAPPER
sliderWrapper: {
  width: CONTENT_WIDTH,
  height: 380,
  overflow: "hidden",
  alignSelf: "center",
  marginBottom: 60,
},

sliderContainer: {
  flexDirection: "row",
  width: CONTENT_WIDTH * 4, // number of mottos
},

mottoSlide: {
  width: CONTENT_WIDTH,
  alignItems: "center",
},

mottoImage: {
  width: "100%",
  height: 220,
  borderRadius: 20,
},


mottoContent: {
  marginTop: 20,
  paddingHorizontal: 20,
  alignItems: "center",
},

mottoTitle: {
  fontSize: 18,
  fontWeight: "800",
  color: "#0f172a",
  textAlign: "center",
  marginBottom: 10,
},

mottoDescription: {
  fontSize: 14,
  color: "#475569",
  textAlign: "center",
  lineHeight: 22,
},

  searchContainer: {
  paddingHorizontal: SIDE_MARGIN,
  marginBottom: 20,
},

searchInput: {
  backgroundColor: "#f1f5f9",
  padding: 14,
  borderRadius: 12,
  fontSize: 15,
  borderWidth: 1,
  borderColor: "#e2e8f0",
},

searchCard: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#757677",
  padding: 12,
  borderRadius: 14,
  marginBottom: 12,

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 6,
  elevation: 3,
},

searchImage: {
  width: 60,
  height: 60,
  borderRadius: 10,
  marginRight: 12,
},

searchTitle: {
  fontSize: 14,
  fontWeight: "600",
  color: "#0f172a",
},

searchFaculty: {
  fontSize: 12,
  color: "#64748b",
},


// =======================
// HERO BUTTON ROW
// =======================

heroButtonRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 20,
},

heroPrimaryButton: {
  flex: 1,
  backgroundColor: "#38bdf8",
  paddingVertical: 13,
  borderRadius: 14,
  marginRight: 10,
  alignItems: "center",
  elevation: 4,
},

heroPrimaryText: {
  color: "#ffffff",
  fontWeight: "700",
  fontSize: 14,
},

heroSecondaryButton: {
  flex: 1,
  backgroundColor: "#0f172a",
  paddingVertical: 13,
  borderRadius: 14,
  marginLeft: 10,
  alignItems: "center",
  elevation: 4,
},

heroSecondaryText: {
  color: "#ffffff",
  fontWeight: "700",
  fontSize: 14,
},

// =======================
// FACULTY GRID
// =======================

facultyGridContainer: {
  paddingHorizontal: SIDE_MARGIN,
  marginTop: 30,
  marginBottom: 30,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
},

facultyGridCard: {
  width: "48%",
  backgroundColor: "#1e293b",
  paddingVertical: 20,
  paddingHorizontal: 12,
  borderRadius: 18,
  marginBottom: 15,
  justifyContent: "center",
  alignItems: "center",

  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 6,
  elevation: 5,
},

facultyGridText: {
  color: "#ffffff",
  fontSize: 13,
  fontWeight: "600",
  textAlign: "center",
},
});