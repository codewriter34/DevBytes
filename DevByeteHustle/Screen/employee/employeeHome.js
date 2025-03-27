import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const EmployeeHome = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTab, setSelectedTab] = useState('available');

  const availableJobs = [
    { id: '1', title: 'Frontend Developer', company: 'Tech Corp' },
    { id: '2', title: 'UI/UX Designer', company: 'DesignHub' },
    { id: '3', title: 'React Native Developer', company: 'CodeWorks' },
  ];

  const recommendedJobs = [
    { id: '4', title: 'Backend Developer', company: 'Soft Solutions' },
    { id: '5', title: 'Project Manager', company: 'InnovateX' },
  ];

  const recentApplications = [
    { id: '6', title: 'Mobile App Developer', status: 'Interview' },
    { id: '7', title: 'Software Engineer', status: 'Pending' },
  ];

  const openJobDetails = (job) => {
    setSelectedJob(job);
    setModalVisible(true);
  };

  const statusStyles = {
    Pending: { backgroundColor: '#FFA500' },
    Interview: { backgroundColor: '#007BFF' },
    Accepted: { backgroundColor: '#28A745' },
    Rejected: { backgroundColor: '#DC3545' },
    default: { backgroundColor: '#6C757D' },
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.profileImage} />
          <Text style={styles.title}>DevBytes Hustlers</Text>
        </View>
        <TouchableOpacity>
          <Icon name="bell" size={24} color="#000" />
        </TouchableOpacity>
      </View>
           {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for jobs..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.tabsContainer}>
  <TouchableOpacity onPress={() => setSelectedTab('available')} style={styles.tab}>
    <Text style={[styles.tabText, selectedTab === 'available' && styles.activeTabText]}>
      Available Jobs
    </Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => setSelectedTab('recommended')} style={styles.tab}>
    <Text style={[styles.tabText, selectedTab === 'recommended' && styles.activeTabText]}>
      Recommended Jobs
    </Text>
  </TouchableOpacity>
</View>

<Text style={styles.sectionTitle}>
  {selectedTab === 'available' ? 'Available Jobs' : 'Recommended Jobs'}
</Text>
<View style={{ height: 150 }}>
  <FlatList
    data={selectedTab === 'available' ? availableJobs : recommendedJobs}
    keyExtractor={(item) => item.id}
    horizontal
    showsHorizontalScrollIndicator={false}
    nestedScrollEnabled={true}
    renderItem={({ item }) => (
      <TouchableOpacity 
        style={styles.jobCard} 
        onPress={() => navigation.navigate("JobsPage", { job: item })} // Navigate to JobsPage
      >
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Text style={styles.companyName}>{item.company}</Text>
      </TouchableOpacity>
    )}
  />
</View>


      {/* Recent Applications */}
      <Text style={styles.sectionTitle}>Recent Applications</Text>
        <FlatList
          data={recentApplications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.applicationCard}>
              <View>
                <Text style={styles.jobTitle}>{item.title}</Text>
              </View>
              <View style={[styles.statusContainer, statusStyles[item.status] || statusStyles.default]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
          )}
        />
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
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  profileContainer: { flexDirection: 'row', alignItems: 'center' },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  title: { fontSize: 20, fontWeight: 'bold' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 10, padding: 10, marginBottom: 20 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20 },
  tabsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  tab: { paddingVertical: 10, paddingHorizontal: 20 },
  tabText: { fontSize: 16, color: '#007BFF' },
  activeTabText: { fontWeight: 'bold', textDecorationLine: 'underline' },
  jobCard: { backgroundColor: '#f5f5f5', padding: 15, borderRadius: 10, marginRight: 10 },
  jobTitle: { fontSize: 16, fontWeight: 'bold' },
  companyName: { fontSize: 14, color: '#666' },
  applicationCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, backgroundColor: '#f5f5f5', borderRadius: 10, marginTop: 10, borderWidth: 1, borderColor: '#ddd' },
  statusContainer: { paddingVertical: 5, paddingHorizontal: 10, borderRadius: 5 },
  statusText: { fontSize: 14, fontWeight: 'bold', color: '#fff' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', padding: 15, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ddd' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  modalCompany: { fontSize: 16, marginBottom: 10 },
  closeButton: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5, marginTop: 10 },
  closeButtonText: { color: '#fff', fontWeight: 'bold' },
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

export default EmployeeHome;
