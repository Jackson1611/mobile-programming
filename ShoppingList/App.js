import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [shoppingList, setShoppingList] = React.useState([]);
  const [newItem, setNewItem] = React.useState('');

  const addItem = () => {
    setShoppingList([...shoppingList, newItem]);
    setNewItem('');
  };

  const clearList = () => {
    setShoppingList([]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={newItem}
        onChangeText={text => setNewItem(text)}
        placeholder="Type item here"
      />
      <Button style={styles.button} title="Add" onPress={addItem} />
      <Button style={styles.button} title="Clear" onPress={clearList} />
      <View style={styles.listContainer}>
        <FlatList
          data={shoppingList}
          renderItem={({ item }) => <Text style={styles.listItem}>{item}</Text>}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  textInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10
  },
  button: {
    width: '40%',
    height: 40,
    backgroundColor: '#4f6d7a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  listContainer: {
    width: '100%',
    height: '60%',
    padding: 10,
  
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5
  }
});
