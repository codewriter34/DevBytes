import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Ensure you have react-native-vector-icons installed

export default function ProfilePage({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            {/* Settings Icon */}
            <TouchableOpacity onPress={() => navigation.navigate("employeeAdmin")}>
              <Icon name="settings" size={24} color="#000" style={styles.settingsIcon} />
            </TouchableOpacity>
          </View>
          <Image
            source={{
              uri: "https://www.w3schools.com/w3images/avatar2.png", // Placeholder image
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Jenny Landson</Text>
            <Text style={styles.jobTitle}>Product Manager at Microsoft</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.connectButton}>
                <Text style={styles.connectButtonText}>Connect</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageButton}>
                <Text style={styles.messageButtonText}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.sectionContent}>Female</Text>
          <Text style={styles.sectionContent}>San Francisco Bay Area</Text>
          <Text style={styles.jobOpportunities}>Open to job opportunities</Text>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {["Product Management", "Agile Methodologies", "Scrum", "User Experience Design", "Product Development", "Product Strategy"].map(
              (skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill}
                </Text>
              )
            )}
          </View>
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {[{ company: "Microsoft", position: "Product Manager" },
            { company: "Google", position: "Associate Product Manager" },
            { company: "Amazon", position: "Technical Program Manager" }]
            .map((experience, index) => (
              <View key={index} style={styles.experienceContainer}>
                <Text style={styles.experienceJob}>{experience.company}</Text>
                <Text style={styles.experiencePosition}>{experience.position}</Text>
              </View>
            ))}
          <TouchableOpacity>
            <Text style={styles.showMore}>Show more experiences</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
<View style={styles.bottomNav}>
  <TouchableOpacity onPress={() => navigation.navigate("employeeHome")} style={styles.navItem}>
    <Icon name="home" size={24} color="#000" />
    <Text style={styles.navText}>Home</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate("JobsPage")} style={styles.navItem}>
    <Icon name="briefcase" size={24} color="#000" />
    <Text style={styles.navText}>Jobs</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate("employeeMessages")} style={styles.navItem}>
    <Icon name="message-circle" size={24} color="#000" />
    <Text style={styles.navText}>Messages</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate("employeePayment")} style={styles.navItem}>
    <Icon name="dollar-sign" size={24} color="#000" />
    <Text style={styles.navText}>Payments</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => navigation.navigate("employeeProfile")} style={styles.navItem}>
    <Icon name="user" size={24} color="#000" />
    <Text style={styles.navText}>Profile</Text>
  </TouchableOpacity>
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    position: "relative", // Ensure the header has a relative position
  },
  headerTop: {
    position: "absolute", // Position the settings icon at the top right
    top: 10,
    right: 10,
    zIndex: 1, // Ensure the icon stays on top of other elements
  },
  settingsIcon: {
    marginTop: -15,
    
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    justifyContent: "center",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  jobTitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  connectButton: {
    backgroundColor: "#E4E4E4",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  connectButtonText: {
    color: "#000",
    fontSize: 14,
  },
  messageButton: {
    backgroundColor: "#1980e6",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  messageButtonText: {
    color: "#fff",
    fontSize: 14,
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
  },
  jobOpportunities: {
    fontSize: 16,
    color: "#1980e6",
    marginTop: 4,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skill: {
    backgroundColor: "#E4E4E4",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 14,
    color: "#000",
  },
  experienceContainer: {
    marginBottom: 16,
  },
  experienceJob: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#332E3C",
  },
  experiencePosition: {
    fontSize: 14,
    color: "#555",
  },
  showMore: {
    fontSize: 14,
    color: "#1980e6",
    marginTop: 8,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E4E4E4",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E4E4E4",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#000",
    marginTop: 4,
  },
  
});
