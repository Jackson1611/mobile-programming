import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ route, navigation }) {
    const { address } = route.params;

    
    return (
<View>
<Text>{address}</Text>
</View>
    );
}
