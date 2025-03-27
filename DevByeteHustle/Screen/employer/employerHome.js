import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, Modal, TextInput, Button, Alert, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import CryptoJS from 'crypto-js';

// Define a key for encryption (should be stored securely)
const encryptionKey = 'your-encryption-key';

const EmployerHome = () => {
  const navigation = useNavigation();
  const [balance, setBalance] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [balanceModalVisible, setBalanceModalVisible] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [amount, setAmount] = useState('');
  const [kycName, setKycName] = useState('');
  const [kycPhone, setKycPhone] = useState('');
  const [kycAddress, setKycAddress] = useState('');
  const [frontIDImage, setFrontIDImage] = useState(null);
  const [backIDImage, setBackIDImage] = useState(null);
  const [holdingIDImage, setHoldingIDImage] = useState(null);

  useEffect(() => {
    const backAction = () => false; // Disable back navigation
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    const fetchVerificationStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setIsVerified(userDoc.data().isVerified);
        }
      }
    };

    fetchVerificationStatus();

    return () => backHandler.remove();
  }, []);

  const pickImage = async (setImage) => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access the media library is required.');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'An error occurred while picking the image.');
    }
  };

  const handleVerifyAccount = async () => {
    const user = auth.currentUser;
    if (user) {
      // Encrypt KYC data
      const encryptedKycName = CryptoJS.AES.encrypt(kycName, encryptionKey).toString();
      const encryptedKycPhone = CryptoJS.AES.encrypt(kycPhone, encryptionKey).toString();
      const encryptedKycAddress = CryptoJS.AES.encrypt(kycAddress, encryptionKey).toString();
      const encryptedFrontIDImage = frontIDImage ? CryptoJS.AES.encrypt(frontIDImage, encryptionKey).toString() : null;
      const encryptedBackIDImage = backIDImage ? CryptoJS.AES.encrypt(backIDImage, encryptionKey).toString() : null;
      const encryptedHoldingIDImage = holdingIDImage ? CryptoJS.AES.encrypt(holdingIDImage, encryptionKey).toString() : null;

      await updateDoc(doc(db, 'users', user.uid), {
        kycName: encryptedKycName,
        kycPhone: encryptedKycPhone,
        kycAddress: encryptedKycAddress,
        frontIDImage: encryptedFrontIDImage,
        backIDImage: encryptedBackIDImage,
        holdingIDImage: encryptedHoldingIDImage,
        email: user.email,
        isVerified: false,
      });
      Alert.alert('KYC Submitted', 'Your KYC information has been submitted for verification.');
      setModalVisible(false);
    }
  };

  const handleAddBalance = async () => {
    const user = auth.currentUser;
    if (user && senderName && transactionDate && amount) {
      // Encrypt balance data
      const encryptedSenderName = CryptoJS.AES.encrypt(senderName, encryptionKey).toString();
      const encryptedTransactionDate = CryptoJS.AES.encrypt(transactionDate, encryptionKey).toString();
      const encryptedAmount = CryptoJS.AES.encrypt(amount, encryptionKey).toString();

      await addDoc(collection(db, 'balance'), {
        userId: user.uid,
        senderName: encryptedSenderName,
        transactionDate: encryptedTransactionDate,
        amount: encryptedAmount,
      });
      Alert.alert('Balance Submitted', 'Your balance information has been submitted.');
      setBalanceModalVisible(false);
      setSenderName('');
      setTransactionDate('');
      setAmount('');
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Dev Bytes Hustlers</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total job views</Text>
          <Text style={styles.cardNumber}>2</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total applications</Text>
          <Text style={styles.cardNumber}>3</Text>
        </View>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <View>
          <Text style={styles.cardTitle}>Balance</Text>
          <Text style={styles.cardNumber}>XAF{balance}</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => setBalanceModalVisible(true)}>
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
      <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('ViewApplicationsScreen')}>
        <Icon name="arrow-right" size={20} color="#000" />
        <Text style={styles.actionText}>View applications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionItem} onPress={() => navigation.navigate('MyJobsScreen')}>
        <Icon name="briefcase" size={20} color="#000" />
        <Text style={styles.actionText}>My Jobs</Text>
      </TouchableOpacity>

      {isVerified ? (
        <View style={styles.actionItem}>
          <Icon name="check-circle" size={20} color="green" />
          <Text style={[styles.actionText, { color: "green" }]}>Account Verified</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.actionItem} onPress={() => setModalVisible(true)}>
          <Icon name="check-circle" size={20} color="red" />
          <Text style={[styles.actionText, { color: "red" }]}>Verify your account</Text>
        </TouchableOpacity>
      )}

      {/* Bottom Navbar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('EmployerHome')}>
          <Icon name="home" size={24} color="#197fe6" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ViewApplicationsScreen')}>
          <Icon name="users" size={24} color="#000" />
          <Text style={styles.navText}>View Applicants</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PostJobScreen')}>
          <Icon name="plus-square" size={24} color="#000" />
          <Text style={styles.navText}>Post Jobs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="user" size={24} color="#000" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Add Balance Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={balanceModalVisible}
        onRequestClose={() => setBalanceModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add Balance</Text>
            <TextInput
              style={styles.input}
              placeholder="Sender Name"
              value={senderName}
              onChangeText={setSenderName}
            />
            <TextInput
              style={styles.input}
              placeholder="Transaction Date"
              value={transactionDate}
              onChangeText={setTransactionDate}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              value={amount}
              onChangeText={setAmount}
            />
            <Text style={styles.infoText}>
              Add money to balance{" "}
              <Text style={styles.linkText} onPress={() => Linking.openURL('https://checkout.fapshi.com/link/00475489')}>
                here
              </Text>
            </Text>
            <Button title="Submit" onPress={handleAddBalance} />
            <Button title="Cancel" color="red" onPress={() => setBalanceModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* KYC Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Verify Your Account</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={kycName}
              onChangeText={setKycName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={kycPhone}
              onChangeText={setKycPhone}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={kycAddress}
              onChangeText={setKycAddress}
            />
            <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage(setFrontIDImage)}>
              <Text style={styles.imagePickerText}>Pick Front ID Image</Text>
            </TouchableOpacity>
            {frontIDImage && <Image source={{ uri: frontIDImage }} style={styles.image} />}
            <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage(setBackIDImage)}>
              <Text style={styles.imagePickerText}>Pick Back ID Image</Text>
            </TouchableOpacity>
            {backIDImage && <Image source={{ uri: backIDImage }} style={styles.image} />}
            <TouchableOpacity style={styles.imagePicker} onPress={() => pickImage(setHoldingIDImage)}>
              <Text style={styles.imagePickerText}>Pick Image Holding ID</Text>
            </TouchableOpacity>
            {holdingIDImage && <Image source={{ uri: holdingIDImage }} style={styles.image} />}
            <Button title="Submit" onPress={handleVerifyAccount} />
            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  card: { flex: 1, padding: 20, backgroundColor: '#f5f5f5', borderRadius: 10, marginRight: 10 },
  cardTitle: { fontSize: 14, color: '#666' },
  cardNumber: { fontSize: 22, fontWeight: 'bold' },
  singleCard: { padding: 20, backgroundColor: '#f5f5f5', borderRadius: 10, marginTop: 10 },
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
    marginBottom: 17,
  },
  navText: { fontSize: 12, marginTop: 4, textAlign: 'center' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  imagePicker: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  imagePickerText: { color: '#fff', fontWeight: 'bold' },
  image: { width: 100, height: 100, marginBottom: 10 },
  infoText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  linkText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default EmployerHome;