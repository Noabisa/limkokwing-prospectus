import { useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { faculties } from "../data/faculties";

const { width } = Dimensions.get("window");
const CONTENT_WIDTH = width > 900 ? 900 : width;
const SIDE_MARGIN = width > 900 ? (width - 900) / 2 : 24;

export default function CareerGuideScreen({ navigation }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [step, setStep] = useState("quiz");
  const [scores, setScores] = useState({ Science: 0, Business: 0, Design: 0 });
  const [results, setResults] = useState([]);

  //QUIZ QUESTIONS
  const questions = [
    { question: "1. Which subject do you enjoy most?", options: [
      { text: "Mathematics & Physics", category: "Science" },
      { text: "Accounting & Economics", category: "Business" },
      { text: "Art & Design", category: "Design" },
    ]},
    { question: "2. What type of tasks excite you?", options: [
      { text: "Solving technical problems", category: "Science" },
      { text: "Managing businesses", category: "Business" },
      { text: "Creating visuals & media", category: "Design" },
    ]},
    { question: "3. Which career sounds interesting?", options: [
      { text: "Software Engineer", category: "Science" },
      { text: "Entrepreneur", category: "Business" },
      { text: "Fashion Designer", category: "Design" },
    ]},
    { question: "4. What skill describes you?", options: [
      { text: "Logical & Analytical", category: "Science" },
      { text: "Leadership & Strategy", category: "Business" },
      { text: "Creative & Artistic", category: "Design" },
    ]},
    { question: "5. What environment suits you?", options: [
      { text: "Tech Lab", category: "Science" },
      { text: "Corporate Office", category: "Business" },
      { text: "Creative Studio", category: "Design" },
    ]},
  ];

  // QUIZ LOGIC
  const handleAnswer = (option) => {
    const updatedScores = { ...scores, [option.category]: scores[option.category] + 1 };
    setScores(updatedScores);

    if (currentQuestion < questions.length - 1) setCurrentQuestion(currentQuestion + 1);
    else calculateResult(updatedScores);
  };

  //CALCULATE RESULT
  const calculateResult = (finalScores) => {
    const highestCategory = Object.keys(finalScores).reduce((a, b) =>
      finalScores[a] > finalScores[b] ? a : b
    );

    const matchedCourses = [];

    faculties.forEach((faculty) => {
      faculty.programmes.forEach((course) => {
        const isScience = faculty.name.toLowerCase().includes("information") || faculty.name.toLowerCase().includes("architecture");
        const isBusiness = faculty.name.toLowerCase().includes("business");
        const isDesign = faculty.name.toLowerCase().includes("design") || faculty.name.toLowerCase().includes("communication");

        const categoryMatch =
          (highestCategory === "Science" && isScience) ||
          (highestCategory === "Business" && isBusiness) ||
          (highestCategory === "Design" && isDesign);

        if (categoryMatch) matchedCourses.push(course);
      });
    });

    setResults(matchedCourses);
    setStep("results");
  };

  const resetAll = () => {
    setCurrentQuestion(0);
    setScores({ Science: 0, Business: 0, Design: 0 });
    setResults([]);
    setStep("quiz");
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.cardContainer, { width: CONTENT_WIDTH, marginHorizontal: SIDE_MARGIN }]}>

        
        {step === "quiz" && (
          <>
            <Text style={styles.progress}>Question {currentQuestion + 1} of {questions.length}</Text>
            <Text style={styles.question}>{questions[currentQuestion].question}</Text>
            {questions[currentQuestion].options.map((option, index) => (
              <TouchableOpacity key={index} style={styles.optionCard} onPress={() => handleAnswer(option)}>
                <Text style={styles.optionText}>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        //results
        {step === "results" && (
          <>
            <Text style={styles.title}>Courses You Qualify For</Text>
            {results.length === 0 && <Text style={{ marginBottom: 20 }}>No matching courses found.</Text>}
            <FlatList
              data={results}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.resultCard}
                  onPress={() => navigation.navigate("CourseDetails", { course: item })}
                >
                  <Text style={styles.resultText}>{item.name}</Text>
                  <Text style={styles.level}>{item.level}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={[styles.button, { marginTop: 20 }]} onPress={resetAll}>
              <Text style={styles.buttonText}>Start Again</Text>
            </TouchableOpacity>
          </>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 24,
    alignItems: "center",
    backgroundColor: "#f1f5f9",
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 24,
    elevation: 5,
  },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 20 },
  progress: { fontSize: 14, color: "#64748b", marginBottom: 10 },
  question: { fontSize: 20, fontWeight: "700", marginBottom: 20 },
  optionCard: { backgroundColor: "#f8fafc", padding: 16, borderRadius: 14, marginBottom: 15, elevation: 2 },
  optionText: { fontSize: 16, fontWeight: "600" },
  button: { backgroundColor: "#2563eb", padding: 16, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "700" },
  resultCard: { backgroundColor: "white", padding: 16, borderRadius: 14, marginBottom: 12 },
  resultText: { fontSize: 16, fontWeight: "700" },
  level: { fontSize: 13, color: "#64748b" },
});
