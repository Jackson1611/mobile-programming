import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TextInput, Switch } from 'react-native';

export default function App() {
  const [message, setMessage] = React.useState('');
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const buttonPressed = () => {
    Alert.alert('you typed ' + message)
  };

  return (
    <View style={[styles.container, {backgroundColor: isDarkMode ? 'black' : 'white'}]}>
      <TextInput 
        style={[styles.inputStyle, {backgroundColor: isDarkMode ? 'gray' : 'white'}]}
        value={message} 
        onChangeText={(text) => setMessage(text)}
      />
      <Text style={[styles.textStyle, {color: isDarkMode ? 'white' : 'black'}]}>
        Hello World
      </Text>
      <View style={styles.buttonContainer}>
        <Button 
          onPress={buttonPressed}
          title="Click the button"
          color={isDarkMode ? 'white' : 'black'}
        />
      </View>
      <View style={styles.switchContainer}>
        <Text style={[styles.textStyle, {color: isDarkMode ? 'white' : 'black'}]}>
          Dark Mode
        </Text>
        <Switch 
          value={isDarkMode} 
          onValueChange={() => setIsDarkMode(!isDarkMode)} 
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle:{
    width: 200,
    borderColor: "blue",
    borderWidth: 1,
    marginBottom: 5,
    padding: 5,
    borderRadius: 5,
  },
  textStyle: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
