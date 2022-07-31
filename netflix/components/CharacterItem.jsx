import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';

// Packages
import { vw, vh } from 'react-native-expo-viewport-units';


// Images
import NetflixNLogo from '../assets/images/netflixNLogo.png'

export default function CharacterItem({ character, navigation }) {

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image
                    source={character.picture ? character.picture : NetflixNLogo}
                    style={styles.image}
                />
                <Text style={styles.actor}
                    onPress={() => navigation.navigate('Details', {
                        id: character.id,
                    })}
                >
                    {character.actor ? character.actor : character.name ? character.name : "n/a"}
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
    actor: {
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
        width: vw(33),
        height: vw(33),
        borderRadius: 5,
    },
});