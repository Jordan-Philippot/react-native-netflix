import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ActivityIndicator, FlatList, Animated } from 'react-native';

// Packages
import { vw, vh } from 'react-native-expo-viewport-units';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Services
import {
    getShowById,
    getCharactersByShow,
    getEpisodesByShow,
    getSeasonsByShow,
} from '../services/shows';
import {
    getFavorites,
    addNote,
    deleteNote,
} from '../services/member';

// Component
import CharacterItem from '../components/CharacterItem'
import EpisodeItem from '../components/EpisodeItem'
import TabBottom from '../components/TabBottom'


// Images
import NetflixNLogo from '../assets/images/netflixNLogo.png'
import NetflixNLogoTransparent from '../assets/images/netflixNLogoTransparent.png'


export default function Details({ route, navigation }) {
    const [error, setError] = useState("")
    const [show, setShow] = useState([])
    const [characters, setCharacters] = useState([])
    const [myFavorites, setMyFavorites] = useState([])
    const [episodesByShow, setEpisodesByShow] = useState([])
    const [seasonsByShow, setSeasonsByShow] = useState([])

    const { id } = route.params;

    /* ----- Filter shows by season ----- */
    const getEpisodesBySeason = (episodes, season) => {
        return episodes.filter(episode => episode.season == season)
    }

    useEffect(() => {
        const fetchStorage = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const memberId = await AsyncStorage.getItem('id');

                getShowById(setShow, id)
                getCharactersByShow(setCharacters, id)
                getFavorites(setMyFavorites, memberId, token)
                getEpisodesByShow(setEpisodesByShow, id)
                getSeasonsByShow(setSeasonsByShow, id)
            } catch (e) {
                setError(e)
            }
        }

        fetchStorage()


    }, [])


    const scrollX = React.useRef(new Animated.Value(0)).current

    // -------------  Actions function ----------------
    // const addToFavoriteAction = () => {
    //     addToFavorite(setFavoriteResponse, id, tokenStorage)
    //     getFavorites(setMyFavorites, idMember, tokenStorage)
    // }

    // jordan.philippot.pro@gmail.com


    // console.log(myFavorites, episodesByShow, show)

    return (
        <SafeAreaView>
            <View style={styles.container}>

                {/* ----- Tab Bar bottom -----*/}
                <TabBottom route={route} navigation={navigation}/>

                {typeof show.id !== "undefined" ?
                    <View style={styles.containerCondition}>

                        <Text style={styles.presentation}>Votre Série :</Text>

                        {/* ----- Preview image ----- */}
                        <Image
                            source={show.images.poster ? show.images.poster : show.images.show ? show.images.show : NetflixNLogo}
                            style={styles.image}
                        />
                        {/* ----- Network type with logo 'N' ----- */}
                        <View style={styles.network}>
                            <Image
                                source={NetflixNLogoTransparent}
                                style={styles.networkTinyLogo}
                            />
                            <Text style={styles.networkText}>{show.network ? show.network : "Netflix"}</Text>
                        </View>

                        {/* Title */}
                        <View>
                            <Text style={styles.title}>{show.title ? show.title : show.original_title ? show.original_title : show.slug ? show.slug : "Sans Titre"}</Text>
                        </View>

                        {/* ----- Actions on this show ----- */}
                        <View style={styles.actions}>
                            {/* ----- Mean for this show ----- */}
                            <View style={styles.actionsIcon}>
                                <Icon
                                    name='heart'
                                    color='#ff0016'
                                    size={26}
                                // onPress={addToFavoriteAction}
                                />
                            </View>
                            <View style={styles.actionsIcon}>
                                <Icon
                                    name='archive'
                                    color='#ff0016'
                                    size={26}
                                // onPress={addToArchiveAction}
                                />
                            </View>
                            <View style={styles.actionsIcon}>
                                <Icon
                                    name='star-half-empty'
                                    color='#ff0016'
                                    size={26}
                                // onPress={addToArchiveAction}
                                />
                            </View>


                        </View>

                        {/* ----- Release year and number of seasons ----- */}
                        <View style={styles.detailsRelease}>
                            {/* ----- Mean for this show ----- */}
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



                        {/* ----- Description ----- */}
                        <View>
                            <Text style={styles.description}>{show.description ? show.description : "Aucune description"}</Text>
                        </View>

                        {/* ----- Genres ----- */}
                        <View style={styles.allGenres}>
                            {Object.keys(show.genres).map(key =>
                                <Text style={styles.genres}>{show.genres[key]}</Text>
                            )}
                        </View>


                        {/* ----- Actors ----- */}
                        <View style={{ flex: 1 }}>
                            <FlatList
                                horizontal={true}
                                data={characters}
                                style={styles.list}
                                ItemSeparatorComponent={Separator}
                                decelerationRate={"normal"}
                                ListEmptyComponent={listEmptyComponent}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                    { useNativeDriver: false }
                                )}
                                contentContainerStyle={{
                                    flexGrow: 1,
                                }}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={item => item.person_id}
                                renderItem={({ item }) => (
                                    <View>
                                        <CharacterItem character={item} navigation={navigation} />
                                    </View>
                                )}
                            />
                        </View>


                        {/* ----- Episodes by Seasons ----- */}
                        {seasonsByShow.map(season =>
                            <View>
                                <Text style={styles.seasonNumber}>Saison {season.number} </Text>
                                <FlatList
                                    horizontal={true}
                                    data={getEpisodesBySeason(episodesByShow, season.number)}
                                    style={styles.list}
                                    ItemSeparatorComponent={Separator}
                                    decelerationRate={"normal"}
                                    ListEmptyComponent={episodesEmptyComponent}
                                    onScroll={Animated.event(
                                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                        { useNativeDriver: false }
                                    )}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => (
                                        <View>
                                            <EpisodeItem episode={item} navigation={navigation} />
                                        </View>
                                    )}
                                />
                            </View>
                        )}



                        {/* ----- Back to the list ----- */}
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
        </SafeAreaView >
    );
}


const Separator = () => {
    return (
        <View
            style={{
                height: vw(33),
                width: 10,
                backgroundColor: "black",
            }}
        />
    );
}

const listEmptyComponent = () => {
    return (
        <View
            style={styles.charactersEmpty}
        >
            <Text style={styles.textCharactersEmpty}>Aucune acteur n'a été trouvée</Text>
        </View>
    );
}
const episodesEmptyComponent = () => {
    return (
        <View
            style={styles.charactersEmpty}
        >
            <Text style={styles.textCharactersEmpty}>Aucun épisode n'a été trouvée</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        minHeight: vh(93),
    },
    containerCondition: {
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
        marginTop: 40,
        color: "white",
        fontSize: 16,
        marginBottom: 25,
        fontWeight: 'bold',
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
        flexWrap: 'break-word',
        textAlign: 'center',
    },
    image: {
        width: vw(70),
        height: vw(100),
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
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: 10,
    },
    detailsRelease: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    actions: {
        flexDirection: 'row',
        marginBottom: 15
    },
    actionsIcon: {
        marginRight: 25,
        marrginLeft: 25,
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
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: 12,
    },
    charactersEmpty: {
        height: vw(50),
        width: vw(33),
        backgroundColor: "white",
        borderRadius: 5,
    },
    textCharactersEmpty: {
        color: "#ff0016",
        marginTop: "auto",
        marginBottom: "auto",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 12,
    },
    list: {
        maxWidth: vw(100),
        marginTop: 40,
    },
    seasonNumber: {
        color: "#fff",
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 40,
        marginLeft: 15,
    }
});