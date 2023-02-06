import React, { useState, useEffect } from 'react';
import { View, Text,  Button, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {

  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(0);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const response = await fetch(
        'https://api.apilayer.com/exchangerates_data/latest?symbols=VND%2CUSD%2CAUD%2CCAD&base=EUR&apikey=vjA7GwX4xzkV3zRSrN3StJKr35bsOXet'
      );
      const data = await response.json();
      setExchangeRates(data.rates);
    };
    fetchExchangeRates();
  }, []);

  const handleConversion = () => {
    const result = inputValue * exchangeRates[selectedCurrency];
    setResult(result);
  };

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          {result.toFixed(2)} {selectedCurrency}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          keyboardType="number-pad"
          value={inputValue}
          onChangeText={setInputValue}
          style={styles.input}
        />
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCurrency}
          onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
        >
          {Object.keys(exchangeRates).map((key) => (
            <Picker.Item label={key} value={key} key={key} />
          ))}
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Convert" onPress={handleConversion} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
  },
  resultContainer: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F1F1',
    marginTop: 50,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    
  },
  pickerContainer: {
    height: 60,
    marginTop: -20,
  },
  buttonContainer: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
    
  },
});
