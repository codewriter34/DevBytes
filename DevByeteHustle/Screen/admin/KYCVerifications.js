import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { db } from '../../firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const KYCVerifications = () => {
  const [kycData, setKycData] = useState([]);
  const [approvedKYC, setApprovedKYC] = useState([]);
  const [declinedKYC, setDeclinedKYC] = useState([]);

  useEffect(() => {
    const fetchKYCData = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const data = querySnapshot.docs
        .filter(doc => doc.data().kycName) // Filter users with KYC data
        .map(doc => ({ id: doc.id, ...doc.data() }));
      setKycData(data.filter(item => item.isVerified === undefined));
      setApprovedKYC(data.filter(item => item.isVerified === true).slice(0, 10));
      setDeclinedKYC(data.filter(item => item.isVerified === false).slice(0, 10));
    };

    fetchKYCData();
  }, []);

  const handleApprove = async (id) => {
    await updateDoc(doc(db, 'users', id), { isVerified: true });
    Alert.alert('Success', 'KYC approved successfully.');
    const approvedItem = kycData.find(item => item.id === id);
    setApprovedKYC([approvedItem, ...approvedKYC].slice(0, 10));
    setKycData(prevData => prevData.filter(item => item.id !== id));
  };

  const handleDecline = async (id) => {
    await updateDoc(doc(db, 'users', id), { isVerified: false });
    Alert.alert('Declined', 'KYC declined.');
    const declinedItem = kycData.find(item => item.id === id);
    setDeclinedKYC([declinedItem, ...declinedKYC].slice(0, 10));
    setKycData(prevData => prevData.filter(item => item.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.kycItem}>
      <Text style={styles.kycText}>Name: {item.kycName}</Text>
      <Text style={styles.kycText}>Phone: {item.kycPhone}</Text>
      <Text style={styles.kycText}>Address: {item.kycAddress}</Text>
      <Text style={styles.kycText}>Email: {item.email}</Text>
      <Image source={{ uri: item.frontIDImage }} style={styles.kycImage} />
      <Image source={{ uri: item.backIDImage }} style={styles.kycImage} />
      <Image source={{ uri: item.holdingIDImage }} style={styles.kycImage} />
      {item.isVerified === undefined && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.approveButton} onPress={() => handleApprove(item.id)}>
            <Text style={styles.buttonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.declineButton} onPress={() => handleDecline(item.id)}>
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KYC Verifications</Text>

      <Text style={styles.sectionTitle}>Pending KYC</Text>
      <FlatList
        data={kycData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <Text style={styles.sectionTitle}>Approved KYC</Text>
      <FlatList
        data={approvedKYC}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No approved KYC requests yet.</Text>}
      />

      <Text style={styles.sectionTitle}>Declined KYC</Text>
      <FlatList
        data={declinedKYC}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text>No declined KYC requests yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  kycItem: { marginBottom: 20, padding: 15, backgroundColor: '#f5f5f5', borderRadius: 10 },
  kycText: { fontSize: 16, marginBottom: 5 },
  kycImage: { width: 100, height: 100, marginBottom: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  approveButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5 },
  declineButton: { backgroundColor: '#F44336', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default KYCVerifications;