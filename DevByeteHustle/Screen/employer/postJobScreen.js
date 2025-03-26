import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, addDoc } from "firebase/firestore";
import { db } from './App'; // Import Firestore database

const PostJobScreen = ({ navigation }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [workType, setWorkType] = useState('Remote');

  const handleSubmit = async () => {
    if (!jobTitle || !jobDescription || !jobLocation) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    try {
      // Add job details to Firestore
      await addDoc(collection(db, "jobs"), {
        jobTitle,
        jobDescription,
        jobLocation,
        workType,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Job posted successfully!");
      navigation.goBack(); // Navigate back after submission
    } catch (error) {
      console.error("Error adding job: ", error);
      Alert.alert("Error", "Failed to post job!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post a New Job</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Job Title" 
        value={jobTitle} 
        onChangeText={setJobTitle} 
      />

      <TextInput 
        style={[styles.input, styles.textArea]} 
        placeholder="Job Description" 
        multiline 
        numberOfLines={4} 
        value={jobDescription} 
        onChangeText={setJobDescription} 
      />

      <TextInput 
        style={styles.input} 
        placeholder="Job Location" 
        value={jobLocation} 
        onChangeText={setJobLocation} 
      />

      {/* Work Type Selection */}
      <View style={styles.workTypeContainer}>
        {["Remote", "Onsite", "Hybrid"].map((type) => (
          <TouchableOpacity 
            key={type} 
            style={[styles.workTypeButton, workType === type && styles.selectedWorkType]} 
            onPress={() => setWorkType(type)}
          >
            <Text style={styles.workTypeText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Post Job</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 5, 
    padding: 10, 
    marginBottom: 15 
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  
  workTypeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  workTypeButton: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  selectedWorkType: { backgroundColor: '#007BFF', borderColor: '#007BFF' },
  workTypeText: { color: '#000' },

  submitButton: { backgroundColor: '#007BFF', padding: 15, borderRadius: 5, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontWeight: 'bold' }
});

export default PostJobScreen;