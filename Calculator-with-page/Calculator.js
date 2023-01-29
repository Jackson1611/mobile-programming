import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Calculator() {
    const [firstInput, setFirstInput] = useState('');
    const [secondInput, setSecondInput] = useState('');
    const [result, setResult] = useState(0);
    const [history, setHistory] = useState([]);
    const navigation = useNavigation();
  
    const addButton = () => {
      const sum = parseInt(firstInput) + parseInt(secondInput);
      setResult(sum);
      setHistory([...history, { key: sum, value: `${firstInput} + ${secondInput} = ${sum}` }]);
    };
  
    const subtractButton = () => {
      const subtraction = parseInt(firstInput) - parseInt(secondInput);
      setResult(subtraction);
      setHistory([...history, { key: subtraction, value: `${firstInput} - ${secondInput} = ${subtraction}` }]);
    };

  const navigateToHistory = () => {
    navigation.navigate('History', { history });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>  
        <Text style={styles.result}>Result: {result}</Text>

        <TextInput 
          style={styles.inputStyle}
          value={firstInput} 
          onChangeText={(text) => setFirstInput(text)}
          keyboardType="numeric"
        />

        <TextInput 
          style={styles.inputStyle}
          value={secondInput} 
          onChangeText={(text) => setSecondInput(text)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={addButton} title="+" />
        <Button onPress={subtractButton} title="-" />    
        <Button onPress={navigateToHistory} title="History" />
      </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column' 
    },
    inputContainer: {
      flex: 0.15, 
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column' 
    },
    buttonContainer: {
        flex: 0, 
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row' 
    },
    inputStyle:{
      width: 200,
      borderColor: "blue",
      borderWidth: 1,
      marginBottom: 5,
      padding: 5
    },
  });
  
