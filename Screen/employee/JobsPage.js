import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Feather";

const jobs = [
  { id: "1", title: "Software Engineer", company: "Tech Corp", location: "San Francisco", description: "Full-stack development role", startDate: "2025-04-01", expiryDate: "2025-06-30" },
  { id: "2", title: "Product Manager", company: "Innovate Ltd", location: "New York", description: "Lead product development", startDate: "2025-03-15", expiryDate: "2025-05-15" },
];

export default function JobsPage({ navigation }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredJobs = jobs.filter((job) => {
    if (selectedCategory && job[selectedCategory]) {
      return job[selectedCategory].toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Available Jobs</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search jobs..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryLabel}>Search by:</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Job Title" value="title" />
          <Picker.Item label="Location" value="location" />
        </Picker>
      </View>

      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.jobCard}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.jobCompany}>{item.company}</Text>
            <Text style={styles.jobLocation}>{item.location}</Text>
            <Text style={styles.jobDescription}>{item.description}</Text>
            <Text style={styles.jobDates}>Start: {item.startDate} | Expiry: {item.expiryDate}</Text>
            <TouchableOpacity style={styles.addToCartButton}>
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noJobsText}>No jobs available</Text>}
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('EmployeeHome')}>
          <Icon name="home" size={24} color="#007BFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Jobs')}>
          <Icon name="briefcase" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
          <Icon name="message-circle" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Earnings')}>
          <Icon name="dollar-sign" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
          <Icon name="user" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 16 },
  pageTitle: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 20 },
  searchContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  searchInput: { flex: 1, backgroundColor: "#FFF", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 30, fontSize: 16, borderWidth: 1, borderColor: "#DDD" },
  searchButton: { backgroundColor: "#1980e6", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 30, justifyContent: "center", alignItems: "center" },
  searchButtonText: { color: "#fff", fontSize: 14 },
  categoryContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20, alignItems: "center" },
  categoryLabel: { fontSize: 16, color: "#333" },
  picker: { width: 150, height: 40 },
  jobCard: { backgroundColor: "#FFF", padding: 16, marginBottom: 16, borderRadius: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  jobTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  jobCompany: { fontSize: 16, color: "#555" },
  jobLocation: { fontSize: 14, color: "#888", marginVertical: 8 },
  jobDescription: { fontSize: 14, color: "#666", marginBottom: 10 },
  jobDates: { fontSize: 14, color: "#444", marginBottom: 10 },
  addToCartButton: { backgroundColor: "#6C63FF", paddingVertical: 8, borderRadius: 5, alignItems: "center" },
  addToCartText: { color: "#FFF", fontWeight: "bold" },
  noJobsText: { fontSize: 16, color: "#888", textAlign: "center", marginTop: 50 },
  bottomNav: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding: 10, backgroundColor: "#FFF", borderTopWidth: 1, borderTopColor: "#DDD", position: "absolute", bottom: 0, left: 0, right: 0 },
});