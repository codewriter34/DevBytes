import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Picker } from "@react-native-picker/picker";

export default function EmployeeAdminPage({ navigation }) {
  const [language, setLanguage] = useState("English");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");
  const [initialPin, setInitialPin] = useState("");
  const [regions, setRegions] = useState([]);

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
    setRegions(["Region 1", "Region 2", "Region 3"]);
  };

  const handleReset = () => {
    setLanguage("English");
    setCountry("");
    setRegion("");
    setPhoneNumber("");
    setPin("");
    setInitialPin("");
    Alert.alert("Reset", "All fields have been reset");
  };

  const handleSave = () => {
    Alert.alert("Saved", "Your settings have been updated");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: "https://via.placeholder.com/80" }} style={styles.profileImage} />
        <Text style={styles.profileName}>David Jerome</Text>
        <Text style={styles.profileEmail}>Jerome@gmail.com</Text>
      </View>

      <View style={styles.settingsContainer}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <View style={styles.dropdownContainer}>
          <View style={styles.iconTextContainer}>
            <Icon name="globe" size={20} />
            <Text style={styles.boldText}>Language</Text>
          </View>
          <Picker selectedValue={language} onValueChange={(itemValue) => setLanguage(itemValue)}>
            <Picker.Item label="English" value="English" />
            <Picker.Item label="French" value="French" />
          </Picker>
        </View>

        <View style={styles.dropdownContainer}>
          <View style={styles.iconTextContainer}>
            <Icon name="flag" size={20} />
            <Text style={styles.boldText}>Country/Region</Text>
          </View>
          <Picker selectedValue={country} onValueChange={handleCountryChange}>
            <Picker.Item label="Select Country" value="" />
            <Picker.Item label="Cameroon" value="Cameroon" />
            <Picker.Item label="Nigeria" value="Nigeria" />
          </Picker>
        </View>

        {country && (
          <View style={styles.dropdownContainer}>
            <View style={styles.iconTextContainer}>
              <Icon name="map-pin" size={20} />
              <Text style={styles.boldText}>Region</Text>
            </View>
            <Picker selectedValue={region} onValueChange={(itemValue) => setRegion(itemValue)}>
              {regions.map((reg, index) => (
                <Picker.Item key={index} label={reg} value={reg} />
              ))}
            </Picker>
          </View>
        )}

        <View style={styles.inputContainer}>
          <View style={styles.iconTextContainer}>
            <Icon name="phone" size={20} />
            <Text style={styles.boldText}>Phone Number</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.iconTextContainer}>
            <Icon name="key" size={20} />
            <Text style={styles.boldText}>Enter Initial PIN</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your initial PIN"
            keyboardType="numeric"
            secureTextEntry
            value={initialPin}
            onChangeText={setInitialPin}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.iconTextContainer}>
            <Icon name="key" size={20} />
            <Text style={styles.boldText}>Change PIN</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter new PIN"
            keyboardType="numeric"
            secureTextEntry
            value={pin}
            onChangeText={setPin}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={{ color: "white" }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={{ color: "white" }}>Save Updates</Text>
          </TouchableOpacity>
        </View>
      </View>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#F9FAFB", padding: 16 },
  profileHeader: { alignItems: "center", marginBottom: 20 },
  profileImage: { width: 80, height: 80, borderRadius: 40 },
  profileName: { fontSize: 20, fontWeight: "bold", marginTop: 8 },
  profileEmail: { fontSize: 16, color: "gray" },
  settingsContainer: { backgroundColor: "#FFF", padding: 16, borderRadius: 10 },
  sectionTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
  dropdownContainer: { marginVertical: 10 },
  inputContainer: { marginVertical: 10 },
  iconTextContainer: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  boldText: { fontWeight: "bold", marginLeft: 8 },
  input: { borderWidth: 1, borderColor: "#DDD", borderRadius: 8, padding: 10, marginTop: 5 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  resetButton: { backgroundColor: "#19A", padding: 10, borderRadius: 5 },
  saveButton: { backgroundColor: "#1980e6", padding: 10, borderRadius: 5 },
  bottomNav: { flexDirection: "row", justifyContent: "space-around", backgroundColor: "#FFF", paddingVertical: 10, borderTopWidth: 1, borderTopColor: "#E4E4E4" },
  navItem: { alignItems: "center" },
  navText: { fontSize: 12, color: "#000", marginTop: 2 },
});
