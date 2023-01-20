import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {

const [num , setNum] = React.useState(Math.floor(Math.random() * 100) + 1);
const [guess, setGuess] = React.useState('');
const [guessCount, setGuessCount] = React.useState(0);
const [result, setResult] = React.useState('Guess a number between 1-100 ');



const handleGuess = () =>{
  if (guess == num) {
    Alert.alert('You guessed the number in ' + guessCount + ' guesses ');
  } else {
    setGuessCount(guessCount + 1);
    if (guess < num) {
      setResult('Your guess ' + guess + ' is too low');
    } else {
      setResult('Your guess ' + guess + ' is too high');
    }
  }
};



  return (
    <View style={styles.container}>
      <Text>{result}</Text>
      <TextInput 
        style = {styles.inputStyle}
        value = {guess} 
        onChangeText = {(text) => setGuess(text)}
        keyboardType="numeric"
        />
      <Button onPress={handleGuess} title ="MAKE GUESS" />
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

  inputStyle:{
    width: 200,
    borderColor: "blue",
    borderWidth: 1,
    marginBottom: 5,
    padding: 5
  }
});
