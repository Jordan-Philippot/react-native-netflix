import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';

import {
    useFonts,
    BebasNeue_400Regular,
} from "@expo-google-fonts/dev";

import NetflixNLogo from '../assets/images/netflixNLogo.png'

export default function ShowItem({ data, navigation }) {

    let [fontsLoaded] = useFonts({
        BebasNeue_400Regular
    });
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Image
                    source={data.images.show ? data.images.show : NetflixNLogo}
                    style={styles.image}
                />
                <Text style={styles.title}
                    onPress={() => navigation.navigate('Details', {
                        id: data.id,
                    })}
                >
                    {data.title ? data.title : data.original_title ? data.original_title : "Sans Titre"}
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
        fontFamily: BebasNeue_400Regular,
        flexWrap: 'break-word',
    },
    image: {
        width: vw(33),
        height: vw(33),
        borderRadius: 5,
    },
});