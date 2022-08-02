import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, View, TouchableHighlight, Image, StyleSheet, ImageBackground } from 'react-native';

// Packages
import { vw, vh } from 'react-native-expo-viewport-units';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { stringMd5 } from 'react-native-quick-md5';

// Images
import NetflixLogo from '../assets/images/netflixLogo.png'

// Services
import { login } from '../services/auth'


export default function Home({ route, navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [response, setResponse] = useState([])

    const data = {
        "login": email,
        "password": stringMd5(password),
    }


    const registerToList = () => {
        if (email != "" && email.length > 5 && password != "" && password.length > 2) {
            login(setResponse, data)
        } else if (email.length <= 2) {
            setError("Votre email dois comporter au minimum 5 charactères")
        } else if (email == "") {
            setError("Veuillez renseigner votre email")
        } else if (password.length <= 2) {
            setError("Votre mot de passe dois comporter au minimum 5 charactères")
        } else if (password == "") {
            setError("Veuillez renseigner votre mot de passe")
        }
    }


    useEffect(() => {
        if (typeof response.error !== "undefined") {
            setError(response.error)
        } else if (typeof response.user !== "undefined") {
            try {
                AsyncStorage.setItem('email', email)
                AsyncStorage.setItem('id', response.user.id)
                AsyncStorage.setItem('login', response.user.login)
                AsyncStorage.setItem('token', response.token)
                AsyncStorage.setItem('hash', response.hash)
                navigation.navigate('Liste', { login: "success" })
            } catch (e) {
                setError(e)
            }
        }
    }, [response])

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
                    onChangeText={(value) => setEmail(value)}
                    value={email}
                    placeholder="Adresse mail"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => setPassword(value)}
                    value={password}
                    placeholder="Mot de passe"
                    keyboardType="visible-password"
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

                <Text style={styles.signUpLink}
                    onPress={() => navigation.navigate('SignUp')}>
                    M'inscrire
                </Text>


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
        marginTop: 25,
        padding: 15,
        borderRadius: 20,
        textAlign: 'center'
    },
    error: {
        color: "#ff0016",
        marginBottom: 15,
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
        marginTop: 25,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 16,
    },
    signUpLink: {
        marginTop: 40,
        color: '#ff0016',
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 16,
    }
});
