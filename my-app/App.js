import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';


export default function App() {

const [message, setMessage] = React.useState('');

const buttonPressed = () => {
Alert.alert('you typed ' + message)

};


  return (
    <View style={styles.container}>
      <TextInput 
        style = {styles.inputStyle}
        value = {message} 
        onChangeText = {(text) => setMessage(text)}/>
      <Text>Hello World</Text>
      <Button onPress={buttonPressed} title ="Click the button" />
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
