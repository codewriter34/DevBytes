import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  FlatList 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const EmployeeMessages = () => {
  const navigation = useNavigation();
  
  // Simulating received messages
  const messages = [
    { id: '1', employer: 'Tech Corp', message: 'Hello Alex, we are interested in your profile.' },
    { id: '2', employer: 'DesignHub', message: 'We would like to schedule an interview for the UI/UX Designer role.' },
    { id: '3', employer: 'CodeWorks', message: 'Thanks for applying! Let’s chat about your experience as a React Native Developer.' },
  ];

  const navigateToChat = (employer) => {
    navigation.navigate('Chat', { employer });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.messageCard}
            onPress={() => navigateToChat(item.employer)}
          >
            <View>
              <Text style={styles.employerName}>{item.employer}</Text>
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#007BFF" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  messageCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  employerName: { fontSize: 16, fontWeight: 'bold' },
  messageText: { fontSize: 14, color: '#666' },
});

export default EmployeeMessages;
