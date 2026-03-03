import { Video } from "expo-av";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const CONTENT_WIDTH = width > 900 ? 900 : width;
const SIDE_MARGIN = width > 900 ? (width - 900) / 2 : 24;
const IMAGE_WIDTH = CONTENT_WIDTH - SIDE_MARGIN * 2;

export default function CourseDetailsScreen({ route }) {
  const { course } = route.params;

  const [rating, setRating] = useState(course.rating || 0);
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    course.image,
    course.image1,
    course.image2,
  ].filter(Boolean);

  // 🔥 AUTO SLIDE
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === images.length - 1 ? 0 : currentIndex + 1;

      scrollRef.current?.scrollTo({
        x: nextIndex * IMAGE_WIDTH,
        animated: true,
      });

      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  // Detect manual swipe
  const handleScroll = (event) => {
    const slide = Math.round(
      event.nativeEvent.contentOffset.x / IMAGE_WIDTH
    );
    setCurrentIndex(slide);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* TITLE */}
      <Text style={styles.title}>{course.name}</Text>
      <Text style={styles.level}>{course.level}</Text>

      {/* DESCRIPTION */}
      {course.description && (
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>Course Description</Text>
          <Text style={styles.entry}>{course.description}</Text>
        </View>
      )}

      {/* IMAGE SLIDER */}
      {images.length > 0 && (
        <View style={styles.sliderContainer}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
          >
            {images.map((img, index) => (
              <Image
                key={index}
                source={
                  typeof img === "number"
                    ? img
                    : img?.uri
                    ? img
                    : { uri: img }
                }
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          {/* DOT INDICATORS */}
          {images.length > 1 && (
            <View style={styles.dotsContainer}>
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    currentIndex === index && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          )}
        </View>
      )}

      {/* ENTRY REQUIREMENTS */}
      <View style={styles.card}>
        <Text style={styles.sectionHeader}>Entry Requirements</Text>
        <Text style={styles.entry}>{course.entryRequirements}</Text>
      </View>

      {/* ⭐ RATING */}
      <View style={styles.card}>
        <Text style={styles.sectionHeader}>Rate this course</Text>

        <View style={styles.stars}>
          {[1, 2, 3, 4, 5, 6].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Text style={styles.star}>
                {star <= rating ? "⭐" : "☆"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.ratingText}>
          Rating: {rating} / 6
        </Text>
      </View>

      {/* VIDEO */}
      {course.video && (
  <View style={styles.card}>
    <Text style={styles.sectionHeader}>Course Video</Text>

    <Video
      source={course.video}
      style={styles.video}
      useNativeControls
      resizeMode="cover"
      shouldPlay={false}
      isLooping={false}
      isMuted={false}
    />
  </View>
)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    marginTop: 30,
    marginBottom: 6,
    paddingHorizontal: SIDE_MARGIN,
  },

  level: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 20,
    paddingHorizontal: SIDE_MARGIN,
  },

  sliderContainer: {
    width: IMAGE_WIDTH,
    height: 240,
    alignSelf: "center",
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 10,
  },

  image: {
    width: IMAGE_WIDTH,
    height: 240,
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#cbd5e1",
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: "#2563eb",
    width: 10,
    height: 10,
  },

  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: SIDE_MARGIN,
    padding: 20,
    borderRadius: 24,
    marginBottom: 30,
    elevation: 4,
  },

  sectionHeader: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
  },

  entry: {
    fontSize: 15,
    lineHeight: 22,
  },

  stars: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },

  star: {
    fontSize: 30,
    marginHorizontal: 4,
  },

  ratingText: {
    fontSize: 16,
    textAlign: "center",
  },

  video: {
  width: "100%",
  height: 220,
  backgroundColor: "#000",
  borderRadius: 20,
},
});