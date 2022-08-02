import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View, Animated, ActivityIndicator, TouchableHighlight } from 'react-native';

// Package
import AsyncStorage from '@react-native-async-storage/async-storage';
import { vw, vh } from 'react-native-expo-viewport-units';
import Icon from 'react-native-vector-icons/FontAwesome';

// Services
import { getShows, getGenres } from '../services/shows';

// Component
import ShowItem from '../components/ShowItem'
import TabBottom from '../components/TabBottom'


export default function Liste({ route, navigation }) {
    const [nameStorage, setNameStorage] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [shows, setShows] = useState([])
    const [genres, setGenres] = useState([])

    const { signup } = route.params ? route.params : "undefined";

    /* ----- Filter shows by category ----- */
    const getShowsByCategory = (shows, category) => {
        return shows.filter(show => Object.keys(show?.genres).includes(category))
    }

    /* ----- Get the name in localStorage & get Shows ----- */
    useEffect(() => {
        const fetchStorage = async () => {
            try {
                const data = await AsyncStorage.getItem('login');
                setNameStorage(data)

                /* ----- Get all category and shows ----- */
                getGenres(setGenres)
                setLoading(true)
                getShows(setShows, setLoading)
            } catch (e) {
                setError(e)
            }
        }
        fetchStorage()

    }, [])

    const scrollY = React.useRef(new Animated.Value(0)).current

    console.log(shows)
   

    return (
        <SafeAreaView>

            <View style={styles.container}>


               {/* ----- Tab Bar bottom -----*/}
               <TabBottom route={route} navigation={navigation}/>

                <Text style={styles.title}>Bonjour {nameStorage && nameStorage} !</Text>

                {/* ----- Register success ----- */}
                {signup === "succes" &&
                    <Text style={styles.signupSuccess}>
                        Votre inscription à bien été pris en compte, merci de vérifier votre adresse mail
                    </Text>
                }

                {/* ----- Search By Title ----- */}
                <View>
                    <TouchableHighlight
                        style={styles.buttonContainer}
                        onPress={() => navigation.navigate('Search')}
                    >
                        <View style={styles.button}>
                            <Icon
                                name='search'
                                color='#fff'
                                size={26}
                            />
                            <Text style={styles.buttonText}>Rechercher</Text>
                        </View>
                    </TouchableHighlight>
                </View>

                {/* ----- If Loaded display show by category ----- */}
                {loading ?
                    <ActivityIndicator style={styles.loader} size="large" color="#ff0016" />
                    :
                    Object.keys(genres).map(key =>
                        <View>
                            <Text style={styles.titleCategory}>{genres[key]} </Text>
                            <FlatList
                                horizontal={true}
                                data={getShowsByCategory(shows, key)}
                                style={styles.list}
                                ItemSeparatorComponent={Separator}
                                decelerationRate={"normal"}
                                ListEmptyComponent={listEmptyComponent}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                    { useNativeDriver: false }
                                )}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={item => item.thetvdb_id}
                                renderItem={({ item }) => (
                                    <View>
                                        <ShowItem show={item} navigation={navigation} />
                                    </View>
                                )}
                            />
                        </View>
                    )
                }

                {
                    !!error &&
                    <Text style={styles.error}>
                        {error}
                    </Text>
                }

            </View >
        </SafeAreaView>


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
            style={styles.categoryEmpty}
        >
            <Text style={styles.textCategoryEmpty}>Aucun résultat</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        minHeight: vh(93),
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#ff0016",
        marginTop: 40,
        marginBottom: 20,
        textAlign: 'center',
        backgroundColor: "white",
        borderRadius: 30,
        padding: 10,
        width: vw(60),
        marginLeft: vw(20)
    },
    buttonContainer: {
        padding: 10,
        backgroundColor: '#ff0016',
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 25,
        marginBottom: 25,
        width: 180,
        marginLeft: vw(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
        marginTop: 3,
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10,
    },
    titleCategory: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "white",
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
    },
    categoryEmpty: {
        height: vw(50),
        width: vw(33),
        backgroundColor: "white",
        borderRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 30,
    },
    textCategoryEmpty: {
        color: "#ff0016",
        marginTop: "auto",
        marginBottom: "auto",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 18,
        lineHeight: 25,
    },
    error: {
        color: "#ff0016",
        marginBottom: 25,
        fontSize: 12,
    },
    item: {
        flex: 1,
        color: "#fff",
    },
    loader: {
        position: "absolute",
        top: vh(40),
        left: vw(47)
    },
    list: {
        minHeight: vw(40),
    },
    signupSuccess: {
        color: "green",
        marginBottom: 15,
        fontSize: 10,
        fontWeight: "bold",
    },
});