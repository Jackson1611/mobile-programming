import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, ListItem, Icon, Input } from '@rneui/themed';

const db = SQLite.openDatabase('shoppinglistdb.db');

export default function App() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoppinglist (id integer primary key not null, product text, amount text);');
    }, null, updateList); 
  }, []);

  // Save item to shopping list
  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into shoppinglist (product, amount) values (?, ?);', [product, amount]);    
      }, null, updateList
    )
    setProduct('');
    setAmount('');
  }

  // Update shopping list
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoppinglist;', [], (_, { rows }) =>
        setShoppingList(rows._array)
      ); 
    });
  }

  // Delete item from shopping list
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shoppinglist where id = ?;`, [id]);
      }, null, updateList
    )    
  }


  return (
    <View style={styles.container}>
     <Header
        centerComponent={{
          text: 'Shopping List',
          style: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
        }}
        containerStyle={{ backgroundColor: '#2196F3', marginBottom: 10 }}
      />
      
      <View style={styles.inputContainer}>
        <TextInput placeholder='Product' style={styles.textInput}
          onChangeText={(product) => setProduct(product)}
          value={product}
        />  
        <TextInput placeholder='Amount' style={styles.textInput}
          onChangeText={(amount) => setAmount(amount)}
          value={amount}
        />      
        <TouchableOpacity onPress={saveItem}>
          <View style={styles.button}>
            <Icon
              name="add"
              color="#fff"
              containerStyle={styles.iconContainer}
            />
          </View>
        </TouchableOpacity>
      </View>
      
      <FlatList 
        style={styles.list}
        keyExtractor={item => item.id.toString()} 
        data={shoppingList} 
        renderItem={({item}) => (
          <TouchableOpacity style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.product}</Text>
            <Text style={styles.itemText}>{item.amount}</Text>
            <Icon
              name="delete"
              color="red"
              containerStyle={styles.iconContainer}
              onPress={() => deleteItem(item.id)}
              size="25px"
            />
          </TouchableOpacity>
        )} 
        
      />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginTop: 15
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    
  },
  textInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});