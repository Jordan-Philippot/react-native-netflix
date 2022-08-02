import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';

// Packages
import { vw, vh } from 'react-native-expo-viewport-units';

// Images
import NetflixNLogo from '../assets/images/netflixNLogo.png'


export default function ShowItem({ show, navigation }) {

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image
                    source={show.images.poster ? show.images.poster : show.images.show ? show.images.show : NetflixNLogo}
                    style={styles.image}
                />
                <Text style={styles.title}
                    onPress={() => navigation.navigate('Details', {
                        id: show.id,
                    })}
                >
                    {show.title ? show.title : show.original_title ? show.original_title : show.slug ? show.slug  : "Sans Titre"}
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
        backgroundColor: '#000',
    },
    title: {
        color: "white",
        fontSize: 10,
        padding: 15,
        height: 70,
        width: '100%',
        maxWidth: vw(33),
        textAlign: 'center',
        fontWeight: 'bold',
        flexWrap: 'break-word',
    },
    image: {
        width: vw(35),
        height: vw(50),
        borderRadius: 5,
    },
});