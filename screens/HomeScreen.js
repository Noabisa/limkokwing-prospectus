import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useMemo } from "react";
import { faculties } from "../data/faculties";
import Footer from "../components/Footer";



const { width } = Dimensions.get("window");

const CONTENT_WIDTH = width > 900 ? 900 : width;
const SIDE_MARGIN = width > 900 ? (width - 900) / 2 : 24;

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFacultyDropdown, setShowFacultyDropdown] = useState(false);

  const mottos = [
    {
      title: "Be the Best in digital & creative skills",
      description:
        "From augmented reality and touchscreen consoles to 3D printers, we provide the latest technology and expert guidance to ensure that your creativity is your limit.",
      },
    {
      title: "Be the Best in making global connections",
      description:
        "Build your network, gain cultural insights, and explore global business opportunities with students from over 150 countries.",
    },
    {
      title: "Be the Best in your sphere of studies",
      description:
        "Our programmes in design, business, and architecture are crafted to inspire critical thinking and innovation.",
    },
    {
      title: "Be the Best trained to succeed",
      description:
        "Adapt and thrive in a competitive world through practical industry-driven training.",
    },
    {
      title: "Be the Best to nurture & build your future",
      description:
        "Our experts help you nurture your talents and fast-track your future career.",
    },
    {
      title: "Be the Best among the best",
      description:
        "Join Lesotho’s most award-winning university and prepare for an international career.",
    },
  ];

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

    {/* Faculties Button */}
    <Pressable
      style={({ pressed }) => [
        styles.heroButton,
        { opacity: pressed ? 0.8 : 1 }
      ]}
      onPress={() => setShowFacultyDropdown(!showFacultyDropdown)}
    >
      <Text style={styles.heroButtonText}>View Faculties</Text>
    </Pressable>

    {/* Dropdown List */}
    {showFacultyDropdown && (
      <View style={styles.facultyDropdown}>
        {faculties.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [
              styles.dropdownItem,
              { backgroundColor: pressed ? "#334155" : "#1e293b" },
            ]}
            onPress={() => {
              setShowFacultyDropdown(false);
              navigation.navigate("Courses", { faculty: item });
            }}
          >
            <Text style={styles.dropdownText}>{item.name}</Text>
          </Pressable>
        ))}
      </View>
    )}
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


      {/* Mottos */}
      <Text style={styles.sectionHeader}>Our Mottos</Text>
      <View style={styles.mottosContainer}>
        {mottos.map((item, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.mottoCard,
              {
                transform: [{ scale: pressed ? 0.98 : 1 }],
              },
            ]}
          >
            <Text style={styles.mottoTitle}>{item.title}</Text>
            <Text style={styles.mottoDescription}>
              {item.description}
            </Text>
          </Pressable>
        ))}
      </View>

      
      {/* ENROL STICKER */}
<View style={styles.enrolOuter}>
  <View style={styles.enrolSticker}>
    <Text style={styles.enrolMain}>ENROL NOW</Text>

    <View style={styles.enrolRow}>
      <Text style={styles.enrolIcon}>📞</Text>
      <Text style={styles.enrolText}>
        Toll free: 80022066 / 80022088
      </Text>
    </View>

    <View style={styles.enrolRow}>
      <Text style={styles.enrolIcon}>🌐</Text>
      <Text style={styles.enrolText}>
        www.limkokwing.net
      </Text>
    </View>
  </View>
</View>
      <Footer />
      
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
  marginBottom: 30,
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
  bottom: 40,
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

  // Mottos
  mottosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: SIDE_MARGIN,
    marginBottom: 50,
  },

  mottoCard: {
    width: "48%",
    backgroundColor: "#f1f5f9",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },

  mottoTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
  },

  mottoDescription: {
    fontSize: 12.5,
    color: "#475569",
    lineHeight: 18,
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

 // =============================
// ENROL STICKER (IMAGE STYLE)
// =============================

enrolOuter: {
  paddingHorizontal: SIDE_MARGIN,
  marginBottom: 0.1,
  alignItems: "center",
},

enrolSticker: {
  backgroundColor: "#c1121f", 
  width: "60%",
  borderRadius: 35, 
  paddingVertical: 1,
  paddingHorizontal:1,
  borderWidth: 4,
  borderColor: "#ffffff",
  transform: [{ rotate: "-2deg" }],

  shadowColor: "#000000",
  shadowOpacity: 0.9,
  shadowOffset: { width: 0, height: 10 },
  shadowRadius: 12,
  elevation: 9,
},

enrolMain: {
  fontSize: 20,
  fontWeight: "900",
  color: "#ffffff",
  textAlign: "center",
  marginBottom: 1,
  letterSpacing: 1.5,
},

enrolRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 1,
},

enrolIcon: {
  fontSize: 16,
  marginRight: 6,
},

enrolText: {
  fontSize: 14,
  fontWeight: "700",
  color: "#ffffff",
},
});