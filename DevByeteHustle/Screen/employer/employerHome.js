import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const EmployerHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Employer!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PostJob")}
      >
        <Text style={styles.buttonText}>Post a Job</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 40 },
  button: { backgroundColor: "#197fe6", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 20 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default EmployerHome;
