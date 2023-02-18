import React, { useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync();
      setContacts(data);
    }
  };

  const renderContact = ({ item }) => (
    <View style={styles.contactContainer}>
      <Text style={styles.contactName}>{item.name}</Text>
      {item.phoneNumbers && item.phoneNumbers.map(phone => (
        <Text key={phone.id} style={styles.contactNumber}>{phone.number}</Text>
      ))}
    </View>
  );
  

  return (
    <View style={styles.container}>
      <Button title="Get Contacts" onPress={getContacts} style={styles.button} />
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  button: {
    marginVertical: 20,
    backgroundColor: '#2196F3',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  contactContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 16,
  },
});
