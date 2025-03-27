import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const EmployerHome = () => {
  const navigation = useNavigation();
  const [balance, setBalance] = useState(0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Dev Bytes Hustlers</Text>
        <TouchableOpacity>
          <Icon name="bell" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total job views</Text>
          <Text style={styles.cardNumber}>12</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total applications</Text>
          <Text style={styles.cardNumber}>6</Text>
        </View>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <View>
          <Text style={styles.cardTitle}>Balance</Text>
          <Text style={styles.cardNumber}>${balance}</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => navigation.navigate('AddMoney', { setBalance })}
        >
          <Text style={styles.addButtonText}>Add Balance</Text>
        </TouchableOpacity>
      </View>

      {/* New Applications */}
      <View style={styles.singleCard}>
        <Text style={styles.cardTitle}>New applications</Text>
        <Text style={styles.cardNumber}>2</Text>
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick actions</Text>
      <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('PostJobScreen')}>
        <Icon name="plus-square" size={20} color="#000" />
        <Text style={styles.actionText}>Post a new job</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem}>
        <Icon name="arrow-right" size={20} color="#000" />
        <Text style={styles.actionText}>View applications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem}>
        <Icon name="briefcase" size={20} color="#000" />
        <Text style={styles.actionText}>My Jobs</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles (same as before)
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  card: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', borderRadius: 10, marginRight: 10 },
  cardTitle: { fontSize: 14, color: '#666' },
  cardNumber: { fontSize: 22, fontWeight: 'bold' },
  singleCard: { padding: 20, backgroundColor: '#f5f5f5', borderRadius: 10, marginTop: 10 },

  // Balance Card
  balanceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginTop: 10,
  },
  addButton: { 
    backgroundColor: '#007BFF', 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    borderRadius: 5 
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },

  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20 },
  actionItem: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  actionText: { marginLeft: 10, fontSize: 16 },
});

export default EmployerHome;
