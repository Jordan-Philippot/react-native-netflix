import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, View, TouchableHighlight, Image, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { vw, vh } from 'react-native-expo-viewport-units';
import NetflixLogo from '../assets/images/netflixLogo.png'
// import NetflixBackground from '../assets/images/Netflix-Background.jpg'

import {
    useFonts,
    BebasNeue_400Regular,
} from "@expo-google-fonts/dev";

export default function Home({ navigation }) {
    const [name, setName] = useState("")
    const [error, setError] = useState("")

    let [fontsLoaded] = useFonts({
        BebasNeue_400Regular
    });
    const registerToList = () => {
        if (name != "" && name.length > 2) {
            try {
                AsyncStorage.setItem('name', name)
                navigation.navigate('Liste')
            } catch (e) {
                setError(e)
            }

        } else if (name.length <= 2) {
            setError("Votre nom dois comporter au minimum 3 lettres")
        } else {
            setError("Veuillez renseigner votre nom")
        }
    }


    return (
        <SafeAreaView>
            <View style={styles.container}>

                {/* <ImageBackground source={NetflixBackground} resizeMode="cover" style={styles.backgroundImage} > */}
                <Image
                    style={styles.tinyLogo}
                    source={NetflixLogo}
                />
                {/* </ImageBackground> */}

                <Text style={styles.title}>Bievenue sur Netflix!</Text>

                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setName(value)}
                    value={name}
                    placeholder="Veuillez entrer votre nom"
                    keyboardType="default"
                />
                {!!error &&
                    <Text style={styles.error}>
                        {error}
                    </Text>
                }

                <TouchableHighlight
                    style={styles.button}
                    onPress={registerToList}
                >
                    <Text style={styles.buttonText}>M'identifier</Text>
                </TouchableHighlight>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#141414',
        minHeight: vh(93),
    },
    // backgroundImage: {
    //     flex: 1,
    //     marginBottom: 40,
    //     justifyContent: "center",
    //     width: "100%",
    //     height: vw(100),
    // },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white"
    },
    tinyLogo: {
        width: vw(75),
        height: vw(45),
        margin: vw(2),
        justifyContent: "center",

    },
    input: {
        backgroundColor: 'white',
        color: '#121212',
        margin: 25,
        padding: 15,
        borderRadius: 20,
        textAlign: 'center'
    },
    error: {
        color: "#ff0016",
        marginBottom: 15,
        fontFamily: BebasNeue_400Regular,
        fontSize: 10,
        fontWeight: "bold",
    },
    button: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 70,
        paddingLeft: 70,
        backgroundColor: '#ff0016',

        borderRadius: 25,
        borderWidth: 1,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: BebasNeue_400Regular,
        fontWeight: "bold",
        fontSize: 16,
    }
});
