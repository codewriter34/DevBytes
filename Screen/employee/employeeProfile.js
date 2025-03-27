import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Feather'; // Ensure you have react-native-vector-icons installed

export default function ProfilePage({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://www.w3schools.com/w3images/avatar2.png", // Placeholder image
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.jobTitle}>Software Engineer</Text>
            <Text style={styles.location}>Location: New York, USA</Text>
          </View>
        </View>

        {/* About Me Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.sectionContent}>
            I'm a passionate software engineer with experience in building scalable web and mobile applications. I love to solve problems and continuously learn new technologies.
          </Text>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            <Text style={styles.skill}>React Native</Text>
            <Text style={styles.skill}>JavaScript</Text>
            <Text style={styles.skill}>Node.js</Text>
            <Text style={styles.skill}>Python</Text>
            <Text style={styles.skill}>AWS</Text>
          </View>
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          <View style={styles.experienceContainer}>
            <Text style={styles.experienceJob}>Senior Developer - Tech Company</Text>
            <Text style={styles.experienceDuration}>January 2021 - Present</Text>
            <Text style={styles.experienceDescription}>
              Working on a variety of projects using React Native and Node.js. Leading a team of developers to deliver high-quality products.
            </Text>
          </View>
          <View style={styles.experienceContainer}>
            <Text style={styles.experienceJob}>Junior Developer - Startup</Text>
            <Text style={styles.experienceDuration}>June 2018 - December 2020</Text>
            <Text style={styles.experienceDescription}>
              Developed web applications using JavaScript, React, and Python. Contributed to all phases of the development lifecycle.
            </Text>
          </View>
        </View>

        {/* Edit Profile Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
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
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    justifyContent: "center",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  jobTitle: {
    fontSize: 18,
    color: "#555",
  },
  location: {
    fontSize: 14,
    color: "#888",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skill: {
    backgroundColor: "#D8D4F2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 14,
    color: "#332E3C",
  },
  experienceContainer: {
    marginBottom: 16,
  },
  experienceJob: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#332E3C",
  },
  experienceDuration: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
  },
  experienceDescription: {
    fontSize: 14,
    color: "#555",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  editButton: {
    backgroundColor: "#1980e6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E4E4E4",
  },
});

