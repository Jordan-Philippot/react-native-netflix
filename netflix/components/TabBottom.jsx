import React from 'react'
import { View, TouchableHighlight, StyleSheet } from 'react-native';

// Packages
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { vw } from 'react-native-expo-viewport-units';

export default function TabBottom({ route, navigation }) {

    const size = 30
    const color = "#fff"

    return (
        <View style={styles.tabBottomContainer}>
            <TouchableHighlight
                style={styles.iconContainer}
                onPress={() => navigation.navigate('Search')}
            >
                <MaterialCommunityIcons name="magnify" color={color} size={size} />
            </TouchableHighlight>

            <TouchableHighlight
                style={styles.iconContainer}
                onPress={() => navigation.navigate('Liste')}
            >
                <MaterialCommunityIcons name="home" color={color} size={size} />
            </TouchableHighlight>

            <TouchableHighlight
                style={styles.iconContainer}
                onPress={() => navigation.navigate('Home')}
            >
                <MaterialCommunityIcons name="logout" color={color} size={size} />
            </TouchableHighlight>
        </View>
    )
}


const styles = StyleSheet.create({
    tabBottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'fixed',
        bottom: 0,
        backgroundColor: "#0b0b0b",
        zIndex: 10,
        width: vw(100),
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 35,
        paddingRight: 35,
        shadowColor: '#fff',
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 50,
        shadowOpacity: 0.7,
        elevation: 1
    }
});