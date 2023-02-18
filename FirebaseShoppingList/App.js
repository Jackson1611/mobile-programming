import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import 'dotenv/config';



const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsRef = ref(db, 'items');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemList = Object.entries(data).map(([key, value]) => ({ key, ...value }));
        setItems(itemList);
      } else {
        setItems([]);
      }
    });
  }, []);

  const handleAddItem = () => {
    if (product && amount) {
      push(ref(db, 'items'), { product, amount });
      setProduct('');
      setAmount('');
    }
  };

  const handleRemoveItem = (item) => {
    const itemRef = ref(db, `items/${item.key}`);
    remove(itemRef);
  };

  const renderListItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.product}</Text>
      <Text style={styles.itemText}>{item.amount}</Text>
      <Button title="Remove" onPress={() => handleRemoveItem(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Product"
          value={product}
          onChangeText={setProduct}
        />
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
        />
        <Button title="Add" onPress={handleAddItem} />
      </View>
      <FlatList data={items} renderItem={renderListItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginRight: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 18,
  },
});
