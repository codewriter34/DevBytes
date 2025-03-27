import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, FlatList, Alert, Modal } from "react-native";
import Icon from "react-native-vector-icons/Feather"; // Make sure to install the required icon library

const employees = [
  { id: "1", name: "John Doe", title: "Software Engineer", location: "New York", status: "Active" },
  { id: "2", name: "Jane Smith", title: "Product Manager", location: "San Francisco", status: "Active" },
  { id: "3", name: "Sam Wilson", title: "UX Designer", location: "Los Angeles", status: "On Leave" },
  // Add more employees as needed
];

export default function EmployeeAdminPage({ navigation }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this employee?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            // Handle deletion logic
            Alert.alert("Employee deleted!");
          },
        },
      ]
    );
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  const filteredEmployees = sortedEmployees.filter(employee => {
    return (
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedEmployee(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Employee Management</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search employees..."
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>

      {/* Sorting Options */}
      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort By:</Text>
        <TouchableOpacity onPress={() => setSortBy("name")} style={styles.sortButton}>
          <Text style={styles.sortButtonText}>Name</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortBy("title")} style={styles.sortButton}>
          <Text style={styles.sortButtonText}>Title</Text>
        </TouchableOpacity>
      </View>

      {/* Employee List */}
      <FlatList
        data={filteredEmployees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.employeeCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.employeeName}>{item.name}</Text>
              <Text style={styles.employeeTitle}>{item.title}</Text>
            </View>
            <Text style={styles.employeeLocation}>{item.location}</Text>
            <Text style={styles.employeeStatus}>Status: {item.status}</Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEmployeeSelect(item)}
              >
                <Text style={styles.editButtonText}>View Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noResultsText}>No employees found</Text>
        }
      />

      {/* Modal for Employee Profile */}
      {selectedEmployee && (
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="slide"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Employee Profile</Text>
              <Text style={styles.modalText}>Name: {selectedEmployee.name}</Text>
              <Text style={styles.modalText}>Title: {selectedEmployee.title}</Text>
              <Text style={styles.modalText}>Location: {selectedEmployee.location}</Text>
              <Text style={styles.modalText}>Status: {selectedEmployee.status}</Text>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F9FAFB",
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#332E3C",
  },
  searchInput: {
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 30,
    marginTop: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  sortContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 10,
  },
  sortLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    color: "#332E3C",
  },
  sortButton: {
    backgroundColor: "#1980e6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  sortButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  employeeCard: {
    backgroundColor: "#FFF",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  employeeName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#332E3C",
  },
  employeeTitle: {
    fontSize: 16,
    color: "#555",
  },
  employeeLocation: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  employeeStatus: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#1980e6",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  noResultsText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 50,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#332E3C",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  closeButton: {
    backgroundColor: "#1980e6",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#DDD",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
