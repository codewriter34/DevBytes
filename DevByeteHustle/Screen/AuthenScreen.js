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
  Alert,
  Pressable
} from "react-native";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const AuthScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [role, setRole] = useState("employee");
  const [errorMessage, setErrorMessage] = useState("");
  const [adminButtonVisible, setAdminButtonVisible] = useState(false);

  // Utility function to fetch user data from Firestore
  const fetchUserDataFromFirestore = async (uid) => {
    const userRef = collection(db, 'users');
    const q = query(userRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    } else {
      throw new Error('User data not found');
    }
  };

  // Signup handler
  const handleSignup = async () => {
    if (!acceptedTerms) {
      Alert.alert("Error", "Please accept the terms and conditions");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send verification email
      await sendEmailVerification(user);

      // Store user data in Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        firstName,
        email,
        phone,
        role,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Signup successful! Please verify your email before logging in.");
      navigation.navigate("Login");

    } catch (error) {
      console.error("Error during signup:", error);
      Alert.alert("Error", error.message);
    }
  };

  // Login handler
  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    try {
      console.log("Attempting to log in with email:", email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User logged in:", user.uid);

      // Check if the email is verified
      if (!user.emailVerified) {
        setErrorMessage('Please verify your email before logging in.');
        await signOut(auth);
        return;
      }

      // Fetch user data from Firestore
      try {
        console.log("Fetching user data from Firestore for UID:", user.uid);
        const userData = await fetchUserDataFromFirestore(user.uid);
        const role = userData.role;
        console.log("User role retrieved from Firestore:", role);

        Alert.alert('Success', 'Logged in successfully!');

        // Redirect based on role
        switch (role.toLowerCase()) {
          case 'employee':
            navigation.replace('EmployeeDashboard'); // Adjust this to the correct employee screen
            break;
          case 'employer':
            navigation.replace('EmployerDashboard'); // Adjust this to the correct employer screen
            break;
          default:
            setErrorMessage('User role not recognized. Please contact support.');
        }
      } catch (error) {
        console.error("Error fetching user data from Firestore:", error);
        setErrorMessage('User data not found. Please contact support.');
      }
    } catch (error) {
      console.error('Firebase Error:', error);
      if (error.code === 'auth/user-not-found') {
        setErrorMessage('No user found with this email.');
      } else if (error.code === 'auth/wrong-password') {
        setErrorMessage('Incorrect password.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleLoginNavigation = () => {
    navigation.navigate("Login");
  };

  // Direct Access to Admin Section (for MVP/demo purposes)
  const handleAdminAccess = () => {
    navigation.replace('AdminDashboard');
  };

  const handleLongPress = () => {
    setAdminButtonVisible(true);
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

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLoginNavigation}>
            <Text style={styles.footer}>Already have an account? Login</Text>
          </TouchableOpacity>

          {/* Hidden Admin Access Button */}
          {adminButtonVisible && (
            <TouchableOpacity style={styles.adminButton} onPress={handleAdminAccess}>
              <Text style={styles.adminButtonText}>Access Admin Section</Text>
            </TouchableOpacity>
          )}

          {/* Long press area to reveal the admin button */}
          <Pressable onLongPress={handleLongPress} style={styles.hiddenArea}>
            <Text style={styles.hiddenText}>Long press here to reveal admin access</Text>
          </Pressable>
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
  errorText: { color: 'red', fontSize: 16, marginBottom: 10, textAlign: 'center' },
  termsContainer: { marginBottom: 20 },
  button: { backgroundColor: "#197fe6", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  footer: { textAlign: "center", marginTop: 20, color: "gray" },
  checkboxContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  checkboxText: { fontSize: 16, color: "gray" },
  selected: { fontSize: 16, fontWeight: "bold", color: "#197fe6" },
  adminButton: { backgroundColor: "red", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 20 },
  adminButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  hiddenArea: { marginTop: 30, padding: 10, backgroundColor: 'transparent', alignItems: 'center' },
  hiddenText: { color: 'transparent' }, // Make the text invisible
});

export default AuthScreen;