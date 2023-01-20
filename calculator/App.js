import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {

const [firstInput, setFirstInput] = React.useState('');
const [secondInput, setSecondInput] = React.useState('');
const [result, setResult] = React.useState(0);

const addButton = () => {
  setResult(parseInt(firstInput) + parseInt(secondInput))
};

const subtractButton = () => {
  setResult(parseInt(firstInput) - parseInt(secondInput))
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
    
  },

  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 500,
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    
  },

  inputStyle:{
  width: 200,
  borderColor: "blue",
  borderWidth: 1,
  marginBottom: 5,
  padding: 5
}

});
