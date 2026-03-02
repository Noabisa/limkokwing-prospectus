import { useEffect, useState } from "react";
import { Picker, Platform, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { faculties } from "../data/faculties";

export default function QuizScreen() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ technical: 0, creativity: 0, business: 0 });
  const [grades, setGrades] = useState({
    math: "", english: "", science: "", history: "", ict: "", geography: "", economics: ""
  });
  const [result, setResult] = useState("");
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  const gradeOptions = ["A", "B", "C", "D", "E", "F"];
  const gradeToScore = { A: 6, B: 5, C: 4, D: 3, E: 2, F: 0 };

  const questions = [
    { id: 1, text: "Do you enjoy solving technical or logical problems?", field: "technical" },
    { id: 2, text: "Do you enjoy creative arts, media, or design work?", field: "creativity" },
    { id: 3, text: "Are you interested in business, accounting, or management?", field: "business" },
    { id: 4, text: "Do you like experimenting with technology or coding?", field: "technical" },
    { id: 5, text: "Do you enjoy drawing, designing, or visual arts?", field: "creativity" },
    { id: 6, text: "Do you like managing money or planning projects?", field: "business" },
  ];

  // Shuffle questions when the component mounts or quiz restarts
  useEffect(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswer = (field, value) => {
    setAnswers({ ...answers, [field]: answers[field] + value });
    setStep(step + 1);
  };

  const calculateResult = () => {
    const scores = Object.fromEntries(
      Object.entries(grades).map(([key, val]) => [key, gradeToScore[val]])
    );

    if (Object.values(scores).some((v) => v === undefined)) {
      setResult("Please select all grades.");
      return;
    }

    let suggested = [];

    faculties.forEach((faculty) => {
      faculty.programmes.forEach((programme) => {
        const name = programme.name.toLowerCase();

        if (
          (name.includes("computer") || name.includes("engineering") || name.includes("ict")) &&
          scores.math >= 4 && scores.science >= 4 && scores.ict >= 4 && answers.technical >= 4
        ) {
          suggested.push(`${programme.name} (${faculty.name})`);
        }

        if (
          (name.includes("business") || name.includes("management") || name.includes("accounting") || name.includes("economics")) &&
          scores.math >= 3 && scores.english >= 4 && scores.economics >= 3 && answers.business >= 4
        ) {
          suggested.push(`${programme.name} (${faculty.name})`);
        }

        if (
          (name.includes("design") || name.includes("media") || name.includes("fashion")) &&
          scores.english >= 3 && scores.history >= 3 && answers.creativity >= 4
        ) {
          suggested.push(`${programme.name} (${faculty.name})`);
        }
      });
    });

    if (suggested.length === 0) {
      setResult("Based on your grades and interests, you may consider Foundation Programmes or Diplomas.");
    } else {
      setResult("You may qualify for the following programmes:\n\n" + suggested.join("\n"));
    }

    setStep(shuffledQuestions.length + 2); // final step
  };

  const restartQuiz = () => {
    setStep(1);
    setAnswers({ technical: 0, creativity: 0, business: 0 });
    setGrades({ math: "", english: "", science: "", history: "", ict: "", geography: "", economics: "" });
    setResult("");
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {step <= shuffledQuestions.length && shuffledQuestions.length > 0 && (
        <>
          <Text style={styles.question}>{shuffledQuestions[step - 1].text}</Text>
          {[
            { label: "Yes", value: 2 },
            { label: "Sometimes", value: 1 },
            { label: "No", value: 0 },
          ].map((option) => (
            <TouchableOpacity
              key={option.label}
              style={styles.button}
              onPress={() => handleAnswer(shuffledQuestions[step - 1].field, option.value)}
            >
              <Text style={styles.buttonText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      {step === shuffledQuestions.length + 1 && (
        <>
          <Text style={styles.question}>Enter your final grades:</Text>
          {Object.keys(grades).map((subj) => (
            <Text key={subj} style={styles.label}>
              {subj.charAt(0).toUpperCase() + subj.slice(1)}
              <Picker
                selectedValue={grades[subj]}
                onValueChange={(value) => setGrades({ ...grades, [subj]: value })}
                style={styles.picker}
              >
                <Picker.Item label="Select Grade" value="" />
                {gradeOptions.map((g) => (
                  <Picker.Item key={g} label={g} value={g} />
                ))}
              </Picker>
            </Text>
          ))}
          <TouchableOpacity style={styles.button} onPress={calculateResult}>
            <Text style={styles.buttonText}>Check Qualification</Text>
          </TouchableOpacity>
        </>
      )}

      {step > shuffledQuestions.length + 1 && (
        <>
          <Text style={styles.result}>{result}</Text>
          <TouchableOpacity style={styles.button} onPress={restartQuiz}>
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", padding: 20, backgroundColor: "#f4f6f9" },
  question: { fontSize: 20, marginBottom: 20, fontWeight: "bold", textAlign: "center" },
  label: { fontSize: 16, fontWeight: "600", marginTop: 10 },
  picker: { marginBottom: 15, ...Platform.select({ android: { color: "#000" }, ios: {} }) },
  button: { backgroundColor: "#2563eb", padding: 14, borderRadius: 10, marginBottom: 17 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 14 },
  result: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 30, color: "#0f172a" },
});