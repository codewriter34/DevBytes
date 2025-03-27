import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList, 
  ScrollView, 
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const EmployeeHome = () => {
  const navigation = useNavigation();
  const [balance, setBalance] = useState(250);
  const [recentEarnings, setRecentEarnings] = useState(120);
  const userName = "Alex Johnson"; // Replace with actual user's name
  
  const jobRecommendations = [
    { id: '1', title: 'Frontend Developer', company: 'Tech Corp' },
    { id: '2', title: 'UI/UX Designer', company: 'DesignHub' },
    { id: '3', title: 'React Native Developer', company: 'CodeWorks' },
  ];

  const recentApplications = [
    { id: '1', title: 'Backend Developer', status: 'Pending' },
    { id: '2', title: 'Mobile App Developer', status: 'Interview' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Dev Bytes Hustlers</Text>
          <TouchableOpacity>
            <Icon name="bell" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Notifications Panel */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.notificationCard}>
          <Text>You have 2 new job matches!</Text>
        </View>

        {/* User Profile Section */}
        <View style={styles.profileSection}>
          <Text style={styles.userName}>Hello, {userName}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileButton}>
            <Icon name="user" size={18} color="#007BFF" />
            <Text style={styles.profileLink}>View Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Balance & Earnings Summary */}
        <View style={styles.balanceCard}>
          <View>
            <Text style={styles.cardLabel}>Total Balance</Text>
            <Text style={styles.cardValue}>${balance}</Text>
          </View>
          <View>
            <Text style={styles.cardLabel}>Recent Earnings</Text>
            <Text style={styles.cardValue}>${recentEarnings}</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('Applications')}>
            <Icon name="file-text" size={20} color="#fff" />
            <Text style={styles.actionText}>View Applications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('MyJobs')}>
            <Icon name="briefcase" size={20} color="#fff" />
            <Text style={styles.actionText}>My Jobs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('Payments')}>
            <Icon name="dollar-sign" size={20} color="#fff" />
            <Text style={styles.actionText}>Payments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('Settings')}>
            <Icon name="settings" size={20} color="#fff" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
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
        <Text style={styles.companyName}>Company: {item.company}</Text>
      </View>
      <View style={[styles.statusContainer, getStatusStyle(item.status)]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  )}
/>

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
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  title: { fontSize: 20, fontWeight: 'bold' },
  profileSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  userName: { fontSize: 18, fontWeight: 'bold' },
  profileButton: { flexDirection: 'row', alignItems: 'center' },
  profileLink: { fontSize: 14, color: '#007BFF', textDecorationLine: 'underline', marginLeft: 5 },
  balanceCard: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#f5f5f5', borderRadius: 10, marginBottom: 20 },
  cardLabel: { fontSize: 14, color: '#666' },
  cardValue: { fontSize: 22, fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20 },
  actionsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 10 },
  actionItem: { width: '48%', flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#007BFF', borderRadius: 10, marginBottom: 10 },
  actionText: { color: '#fff', marginLeft: 10, fontSize: 16 },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', padding: 15, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ddd' },
  applicationCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  
  companyName: {
    fontSize: 14,
    color: '#666',
  },
  
  statusContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

const getStatusStyle = (status) => {
  switch (status) {
    case 'Pending':
      return { backgroundColor: '#FFA500' }; // Orange
    case 'Interview':
      return { backgroundColor: '#007BFF' }; // Blue
    case 'Accepted':
      return { backgroundColor: '#28A745' }; // Green
    case 'Rejected':
      return { backgroundColor: '#DC3545' }; // Red
    default:
      return { backgroundColor: '#6C757D' }; // Gray
  }
};

export default EmployeeHome;