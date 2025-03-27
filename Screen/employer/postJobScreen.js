import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

const PostJobScreen = ({ navigation }) => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skills, setSkills] = useState("");
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");

  const handlePostJob = async () => {
    if (!jobTitle || !jobDescription || !location || !salary || !jobType || !experienceLevel || !skills || !timeline || !budget) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await addDoc(collection(db, "jobs"), {
        jobTitle,
        jobDescription,
        location,
        salary,
        jobType,
        experienceLevel,
        skills: skills.split(","),
        timeline,
        budget,
        createdAt: new Date()
      });

      Alert.alert("Success", "Job posted successfully!");
      navigation.navigate("EmployerHome");
    } catch (error) {
      console.error("Error posting job:", error);
      Alert.alert("Error", "Failed to post job. Please try again later.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.title}>Post a Job</Text>

          {[{ label: "Job Title", value: jobTitle, setter: setJobTitle },
            { label: "Job Description", value: jobDescription, setter: setJobDescription, multiline: true },
            { label: "Location", value: location, setter: setLocation },
            { label: "Salary (USD)", value: salary, setter: setSalary, keyboardType: "numeric" },
            { label: "Job Type (e.g., Fixed, Hourly)", value: jobType, setter: setJobType },
            { label: "Experience Level (e.g., Beginner, Expert)", value: experienceLevel, setter: setExperienceLevel },
            { label: "Skills (comma-separated)", value: skills, setter: setSkills },
            { label: "Timeline (e.g., 2 weeks)", value: timeline, setter: setTimeline },
            { label: "Budget (USD)", value: budget, setter: setBudget, keyboardType: "numeric" }
          ].map((item, index) => (
            <View key={index}>
              <Text style={styles.label}>{item.label}</Text>
              <TextInput
                placeholder={`Enter ${item.label}`}
                value={item.value}
                onChangeText={item.setter}
                style={[styles.input, item.multiline && styles.textArea]}
                keyboardType={item.keyboardType || "default"}
                multiline={item.multiline || false}
              />
            </View>
          ))}

          <TouchableOpacity style={styles.button} onPress={handlePostJob}>
            <Text style={styles.buttonText}>Post Job</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { padding: 20 },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 30, textAlign: "center", color: "#197fe6" },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  input: { backgroundColor: "#f8f8f8", padding: 12, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: "#ddd" },
  textArea: { height: 120 },
  button: { backgroundColor: "#197fe6", padding: 18, borderRadius: 12, alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 }
});

export default PostJobScreen;
