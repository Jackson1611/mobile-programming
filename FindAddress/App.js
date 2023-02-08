import React, { useState } from 'react';
import { View, Text,  Button, TextInput, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App()  {

  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 0.0, lng: 0.0 });

  const handleSearch = async () => {
    const response = await fetch(
      `https://www.mapquestapi.com/geocoding/v1/address?key=pXDHtKw2P0JManp2BLqVf9Z8mCsFNumK&location=${location}`
    );
    const data = await response.json();
    setCoordinates(data.results[0].locations[0].latLng);
  };

  return (
    <View style={styles.container}>
      <MapView  
      style={{ flex: 1 }}  
      initialRegion={{
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,  }}>
          <Marker
          coordinate={{
            latitude:coordinates.lat,
            longitude:coordinates.lng}}
            title={location} />
      </MapView>
    
      <View style={styles.inputContainer}>
        <TextInput
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Show" onPress={handleSearch} />
      </View>

      <View style={styles.resultContainer}>
      <Text>{coordinates.lat}, {coordinates.lng}</Text>
      </View>
    </View>
  );
};

;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  resultContainer: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F1F1',
    marginTop: 30,
    display: 'none'
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    padding: 30,
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
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
   
    
    
  },
});