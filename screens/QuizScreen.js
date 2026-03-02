import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from "react-native";

export default function QuizScreen() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    technical: 0,
    creativity: 0,
    business: 0,
  });

  const [grades, setGrades] = useState({
    math: "",
    english: "",
    science: "",
  });

  const [result, setResult] = useState("");

  // =========================
  // Handle Quiz Answers
  // =========================
  const handleAnswer = (field, value) => {
    setAnswers({ ...answers, [field]: value });
    setStep(step + 1);
  };

  // =========================
  // Qualification Logic
  // =========================
  const calculateResult = () => {
    const math = parseInt(grades.math);
    const english = parseInt(grades.english);
    const science = parseInt(grades.science);

    if (!math || !english || !science) {
      setResult("Please enter all grades correctly.");
      return;
    }

    // ICT / Engineering
    if (math >= 60 && science >= 60 && answers.technical >= 2) {
      setResult("You qualify for: ICT, Computer Science, or Engineering 🎓");
    }
    // Business
    else if (math >= 50 && english >= 60 && answers.business >= 2) {
      setResult("You qualify for: Business Management or Accounting 📊");
    }
    // Design / Media
    else if (english >= 50 && answers.creativity >= 2) {
      setResult("You qualify for: Graphic Design or Media Studies 🎨");
    } else {
      setResult("You may consider Foundation Programme or Diploma Studies.");
    }

    setStep(5);
  };

  // =========================
  // Render
  // =========================
  return (
    <ScrollView contentContainerStyle={styles.container}>

      {step === 1 && (
        <>
          <Text style={styles.question}>
            1. Do you enjoy solving technical problems?
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => handleAnswer("technical", 2)}>
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleAnswer("technical", 0)}>
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.question}>
            2. Are you creative and enjoy design work?
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => handleAnswer("creativity", 2)}>
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleAnswer("creativity", 0)}>
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.question}>
            3. Are you interested in business and entrepreneurship?
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => handleAnswer("business", 2)}>
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleAnswer("business", 0)}>
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 4 && (
        <>
          <Text style={styles.question}>
            Enter Your Final Grades (%)
          </Text>

          <TextInput
            placeholder="Mathematics %"
            keyboardType="numeric"
            style={styles.input}
            value={grades.math}
            onChangeText={(text) => setGrades({ ...grades, math: text })}
          />

          <TextInput
            placeholder="English %"
            keyboardType="numeric"
            style={styles.input}
            value={grades.english}
            onChangeText={(text) => setGrades({ ...grades, english: text })}
          />

          <TextInput
            placeholder="Science %"
            keyboardType="numeric"
            style={styles.input}
            value={grades.science}
            onChangeText={(text) => setGrades({ ...grades, science: text })}
          />

          <TouchableOpacity style={styles.button} onPress={calculateResult}>
            <Text style={styles.buttonText}>Check Qualification</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 5 && (
        <>
          <Text style={styles.result}>{result}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setStep(1);
              setAnswers({ technical: 0, creativity: 0, business: 0 });
              setGrades({ math: "", english: "", science: "" });
              setResult("");
            }}
          >
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
        </>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f4f6f9",
  },

  question: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    marginBottom: 17,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },

  result: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
});