import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home.jsx'
import SignUpScreen from './screens/SignUp'
import ListeScreen from './screens/Liste'
import DetailsScreen from './screens/Details'
import SearchScreen from './screens/Search'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Liste"} >
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
        <Stack.Screen name="SignUp" component={SignUpScreen}
          options={{
            title: 'Inscription',
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
        <Stack.Screen name="Details" component={DetailsScreen}
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
           <Stack.Screen name="Search" component={SearchScreen}
          options={{
            title: 'Rechercher vos séries',
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