import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {

const [firstInput, setFirstInput] = React.useState('');
const [secondInput, setSecondInput] = React.useState('');
const [result, setResult] = React.useState(0);
const [history, setHistory] = React.useState([]);

const addButton = () => {
  const sum = parseInt(firstInput) + parseInt(secondInput);
  setResult(sum);
  setHistory([...history,{key:sum , value: `${firstInput} + ${secondInput} = ${sum}` }])
};

const subtractButton = () => {
  const subtraction = parseInt(firstInput) - parseInt(secondInput);
  setResult(subtraction);
  setHistory([...history,{key:subtraction , value: `${firstInput} - ${secondInput} = ${subtraction}` }])
};

  return (
  <View style={styles.container}>

    <View style={styles.inputContainer}>  
        <Text style={styles.result}>Result: {result}</Text>

        <TextInput 
          style = {styles.inputStyle}
          value = {firstInput} 
          onChangeText = {(text) => setFirstInput(text)}
          keyboardType="numeric"
          />


        <TextInput 
          style = {styles.inputStyle}
          value = {secondInput} 
          onChangeText = {(text) => setSecondInput(text)}
          keyboardType="numeric"/>
    </View>

        <View style={styles.buttonContainer}>
        <Button onPress={addButton} title ="+" />
        <Button onPress={subtractButton} title ="-" />    
    </View>

      <View style={styles.historyContainer}>
          <FlatList 
              data={history}
              renderItem={({ item }) => 
              <Text>{item.value}</Text>}
            />
      </View>
        <StatusBar style="auto" />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column' // Add this line
  },

  inputContainer: {
    flex: 1, // Add this line
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column' // Add this line
  },

  buttonContainer: {
     // Add this line
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row' // Add this line
  },

  historyContainer: {
    flex: 2, // Add this line
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  inputStyle:{
    width: 200,
    borderColor: "blue",
    borderWidth: 1,
    marginBottom: 5,
    padding: 5
  },
});
 