import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/Home.jsx'
import SignUpScreen from './screens/SignUp'
import ListeScreen from './screens/Liste'
import DetailsScreen from './screens/Details'
import SearchScreen from './screens/Search'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={"Liste"} >
        <Tab.Screen name="Home" component={HomeScreen}
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
            tabBarButton: () => null,
            tabBarStyle: { display: "none" },
          }} />
        <Tab.Screen name="Details" component={DetailsScreen}
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
            tabBarButton: () => null,
          }} />
        <Tab.Screen name="SignUp" component={SignUpScreen}
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
            tabBarButton: () => null,
            tabBarStyle: { display: "none" },
          }} />

        <Tab.Screen name="Liste" component={ListeScreen}
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
            tabBarLabel: 'Séries',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }} />
        <Tab.Screen name="Search" component={SearchScreen}
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
            tabBarLabel: 'Rechercher',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={size} />
            ),
          }} />




      </Tab.Navigator>

    </NavigationContainer>
  );
}