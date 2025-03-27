import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet 
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const Chat = () => {
  const route = useRoute();
  const { employer } = route.params;  // Employer passed from the EmployeeMessages page
  const [messages, setMessages] = useState([
    { id: '1', sender: 'Employer', message: 'Hi Alex, hope you’re doing well!' },
    { id: '2', sender: 'Employee', message: 'Hello, I am doing great! Thank you for reaching out.' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: String(messages.length + 1), sender: 'Employee', message: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat with {employer}</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.sender === 'Employer' ? styles.employerBubble : styles.employeeBubble]}>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
        />
        <TouchableOpacity onPress={sendMessage}>
          <Icon name="send" size={24} color="#007BFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  employerBubble: {
    backgroundColor: '#f5f5f5',
    alignSelf: 'flex-start',
  },
  employeeBubble: {
    backgroundColor: '#007BFF',
    alignSelf: 'flex-end',
  },
  messageText: { fontSize: 14, color: '#fff' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, marginRight: 10 },
});

export default Chat;
