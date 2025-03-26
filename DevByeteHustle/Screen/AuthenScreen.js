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
  Keyboard
} from "react-native";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const AuthScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleSignup = async () => {
    if (!acceptedTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    try {
      if (!auth || !db) {
        console.error("Firebase is not initialized correctly.");
        alert("Internal error: Firebase is not initialized.");
        return;
      }

      console.log("Starting user registration...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User registered successfully:", user.uid);

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        firstName,
        email,
        phone,
        role,
      });

      console.log("User data stored in Firestore:", { firstName, email, phone, role });

      await sendEmailVerification(user);
      alert("Signup successful! Please verify your email before logging in.");

      if (role === "employer") {
        navigation.navigate("EmployerDashboard");
      } else {
        navigation.navigate("EmployeeDashboard");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert(`Signup failed: ${error.message}`);
    }
  };

  const handleLoginNavigation = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>DevBytesHustle</Text>

          <View style={styles.textContainer}>
            <Text style={styles.heading}>Join Talents or Discover the Best Talent for your Team</Text>
            <Text style={styles.description}>Join thousands of Cameroonians using DevBytesHustle</Text>
          </View>

          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setRole("employee")}>
              <Text style={role === "employee" ? styles.selected : styles.checkboxText}>Employee</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setRole("employer")}>
              <Text style={role === "employer" ? styles.selected : styles.checkboxText}>Employer</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.termsContainer} onPress={() => setAcceptedTerms(!acceptedTerms)}>
            <Text style={acceptedTerms ? styles.selected : styles.checkboxText}>✔ Accept our Terms and Conditions</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLoginNavigation}>
            <Text style={styles.footer}>Already have an account? Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "flex-start", padding: 20, backgroundColor: "#fff" },
  textContainer: { marginBottom: 20 },
  title: { fontSize: 32, fontWeight: "bold", textAlign: "center", marginBottom: 40, marginTop: 20 },
  heading: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  description: { textAlign: "center", marginBottom: 20, color: "gray" },
  label: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  input: { backgroundColor: "#f0f0f0", padding: 12, borderRadius: 8, marginBottom: 10 },
  checkboxContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  checkboxText: { fontSize: 16, color: "gray" },
  selected: { fontSize: 16, fontWeight: "bold", color: "#197fe6" },
  termsContainer: { marginBottom: 20 },
  button: { backgroundColor: "#197fe6", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  footer: { textAlign: "center", marginTop: 20, color: "gray" },
});

export default AuthScreen;
