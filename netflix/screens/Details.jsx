import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ActivityIndicator, TouchableHighlight, FlatList } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import {
    useFonts,
    BebasNeue_400Regular,
} from "@expo-google-fonts/dev";

// import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';

const myIcon = <Icon name="rocket" size={30} color="#900" />;
import { getShowById } from '../services/axios';

import NetflixNLogo from '../assets/images/netflixNLogo.png'
import NetflixNLogoTransparent from '../assets/images/netflixNLogoTransparent.png'

export default function Details({ route, navigation }) {
    const [show, setShow] = useState([])

    let [fontsLoaded] = useFonts({
        BebasNeue_400Regular
    });

    const { id } = route.params;

    useEffect(() => {
        if (typeof id !== "undefined") {
            getShowById(setShow, id)
        }
    }, [id])

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    console.log(show)
    return (
        <SafeAreaView>
            <View style={styles.container}>

                {typeof show.id !== "undefined" ?
                    <View style={styles.containerCondition}>

                        <Text style={styles.presentation}>Votre Série :</Text>

                        {/* Preview image  */}
                        <Image
                            source={show.images.show ? show.images.show : NetflixNLogo}
                            style={styles.image}
                        />
                        {/* Network type with logo 'N' */}
                        <View style={styles.network}>
                            <Image
                                source={NetflixNLogoTransparent}
                                style={styles.networkTinyLogo}
                            />
                            <Text style={styles.networkText}>{show.network ? show.network : "Netflix"}</Text>
                        </View>

                        {/* Title */}
                        <View>
                            <Text style={styles.title}>{show.title ? show.title : show.original_title ? show.original_title : "Sans Titre"}</Text>
                        </View>
                        {/* Release year and number of seasons  */}
                        <View style={styles.detailsRelease}>
                            {/* Mean for this show  */}
                            <View style={styles.notes}>
                                <Icon
                                    name='star'
                                    color='#ff0016' />
                                <Text style={styles.notesMean}>{show.notes.mean ? Math.round(show.notes.mean * 10) / 10 + "/ 5" : "n/a / 5"} </Text>
                            </View>
                            <Text style={styles.creation}>{show?.creation}</Text>
                            <Text style={styles.seasons}>{show.seasons ? show.seasons + " saison(s)" : "1 saison"}</Text>
                            <Text style={styles.episodes}>{show.episodes ? show.episodes + " épisode(s)" : "1 épisode"}</Text>
                            <Text style={styles.language}>{show?.language}</Text>
                        </View>



                        {/* Description */}
                        <View>
                            <Text style={styles.description}>{show.description ? show.description : "Aucune description"}</Text>
                        </View>

                        {/* Genres */}
                        <View style={styles.allGenres}>
                            {Object.keys(show.genres).map(key =>
                                <Text style={styles.genres}>{show.genres[key]}</Text>
                            )}
                        </View>


                        {/* https://www.betaseries.com/link/23963/1/fr */}

                        {/* Back to the list */}
                        <View
                            style={styles.button}
                        >
                            <Icon
                                name="arrow-circle-o-left"
                                color='#ff0016'
                                size={18} />
                            <Text
                                style={styles.buttonText}
                                onPress={() => navigation.navigate('Liste')}
                            >
                                Retour
                            </Text>
                        </View>
                    </View>
                    :
                    <ActivityIndicator style={styles.loader} size="large" color="#ff0016" />
                }
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        minHeight: vh(93),
    },
    containerCondition: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loader: {
        position: "absolute",
        top: vh(40),
        left: vw(47)
    },
    presentation: {
        textAlign: 'left',
        marginLeft: vw(15),
        marginRight: 'auto',
        color: "white",
        fontSize: 16,
        marginBottom: 25,
        fontWeight: 'bold',
        fontFamily: BebasNeue_400Regular,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        padding: 15,
        height: "auto",
        minHeight: 70,
        width: '100%',
        maxWidth: vw(70),
        fontWeight: 'bold',
        fontFamily: BebasNeue_400Regular,
        flexWrap: 'break-word',
        textAlign: 'center',
    },
    image: {
        width: vw(70),
        height: vw(70),
        borderRadius: 5,
    },
    network: {
        flexDirection: 'row',
        marginTop: 10,
    },
    networkTinyLogo: {
        width: 25,
        height: 25,
    },
    networkText: {
        textAlign: "left",
        marginLeft: 10,
        textTransform: 'uppercase',
        color: "#bababa",
        fontFamily: BebasNeue_400Regular,
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: 10,
    },
    detailsRelease: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    creation: {
        color: "white",
        fontSize: 12,

    },
    seasons: {
        color: "white",
        fontSize: 12,
        marginLeft: 15,
    },
    episodes: {
        color: "white",
        fontSize: 12,
        marginLeft: 15,
    },
    language: {
        marginLeft: 15,
        color: "white",
        fontSize: 12,
    },
    notes: {
        flexDirection: 'row',
        marginRight: 10,

    },
    notesMean: {
        textAlign: "left",
        color: "#fff",
        fontSize: 12,
        marginLeft: 5,
        fontFamily: BebasNeue_400Regular,
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    description: {
        color: "white",
        fontSize: 12,
        marginTop: 15,
        maxWidth: vw(70),
    },
    backgroundVideo: {
        width: vw(70),
        height: vw(35),
    },
    allGenres: {
        flexDirection: 'row',
        marginTop: 25,
        flexWrap: 'break-word',
    },
    genres: {
        color: "#ff0016",
        fontSize: 10,
        marginLeft: 15,
        textAlign: "left",
        fontWeight: 'bold',
        fontFamily: BebasNeue_400Regular,
    },
    button: {
        flexDirection: 'row',
        marginTop: 50,
        marginRight: 'auto',
        marginLeft: vw(15),
        cursor: 'pointer'
    },
    buttonText: {
        color: "#ff0016",
        marginLeft: 10,
        fontWeight: 'bold',
        fontFamily: BebasNeue_400Regular,
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: 12,
    },
    firstEpisod: {
    }
});