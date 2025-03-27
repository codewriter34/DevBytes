import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const AdminHome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Admin Home</Text>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('KYCVerifications')}>
        <Icon name="user-check" size={20} color="#000" />
        <Text style={styles.actionText}>Manage KYC</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('ManageUsers')}>
        <Icon name="users" size={20} color="#000" />
        <Text style={styles.actionText}>Manage Users</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('ManageJobs')}>
        <Icon name="briefcase" size={20} color="#000" />
        <Text style={styles.actionText}>Manage Jobs</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('ViewReports')}>
        <Icon name="file-text" size={20} color="#000" />
        <Text style={styles.actionText}>View Reports</Text>
      </TouchableOpacity>

      {/* Bottom Navbar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('AdminHome')}>
          <Icon name="home" size={24} color="#197fe6" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('KYCVerifications')}>
          <Icon name="user-check" size={24} color="#000" />
          <Text style={styles.navText}>Manage KYC</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ManageUsers')}>
          <Icon name="users" size={24} color="#000" />
          <Text style={styles.navText}>Manage Users</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="user" size={24} color="#000" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  actionItem: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  actionText: { marginLeft: 10, fontSize: 16 },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navText: { fontSize: 12, marginTop: 4, textAlign: 'center' },
});

export default AdminHome;