import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home.jsx'
import ListeScreen from './screens/Liste'
import Details from './screens/Details'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Home"} >
        <Stack.Screen name="Home" component={HomeScreen}
          options={{
            title: 'Netflix',
            headerStyle: {
              backgroundColor: '#fff',
              marginBottom: 0
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: "#e50914"
            },
          }} />
        <Stack.Screen name="Liste" component={ListeScreen}
           options={{
            title: 'Vos Séries',
            headerStyle: {
              backgroundColor: '#fff',
              marginBottom: 0
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: "#e50914"
            },
          }} />
          <Stack.Screen name="Details" component={Details}
           options={{
            title: 'Détails de votre série',
            headerStyle: {
              backgroundColor: '#fff',
              marginBottom: 0
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: "#e50914"
            },
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}