import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View, Animated, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { vw, vh } from 'react-native-expo-viewport-units';
import {
    useFonts,
    BebasNeue_400Regular,
} from "@expo-google-fonts/dev";

import { getShows, getGenres } from '../services/axios';
import ShowItem from './ShowItem'



export default function Liste({ route, navigation }) {
    const [nameStorage, setNameStorage] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [shows, setShows] = useState([])
    const [genres, setGenres] = useState([])


    let [fontsLoaded] = useFonts({
        BebasNeue_400Regular
    });

    /* Filter shows by category */
    const getShowsByCategory = (shows, category) => {
        return shows.filter(show => Object.keys(show?.genres).includes(category))
    }

    /* Get the name in localStorage & get Shows */
    useEffect(() => {
        const fetchStorage = async () => {
            try {
                const data = await AsyncStorage.getItem('name');
                setNameStorage(data)
            } catch (e) {
                setError(e)
            }
        }
        fetchStorage()

        /* Get all category and shows */
        getGenres(setGenres)
        setLoading(true)
        getShows(setShows, setLoading)
    }, [])

    const scrollX = React.useRef(new Animated.Value(0)).current

    return (
        <SafeAreaView>

            <View style={styles.container}>
                <Text style={styles.title}>Bonjour {nameStorage && nameStorage} !</Text>

                {loading ?
                    <ActivityIndicator style={styles.loader} size="large" color="#ff0016" />
                    :
                    Object.keys(genres).map(key =>
                        <View>
                            {fontsLoaded ? <Text style={styles.titleCategory}>{genres[key]} :</Text> : <ActivityIndicator style={styles.loader} size="large" color="#fff" />}
                            <FlatList
                                horizontal={true}
                                data={getShowsByCategory(shows, key)}
                                style={styles.list}
                                ItemSeparatorComponent={Separator}
                                decelerationRate={"normal"}
                                // onEndReached={fetchMore}
                                ListEmptyComponent={listEmptyComponent}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                    { useNativeDriver: false }
                                )}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={item => item.id + item.thetvdb_id + item.themoviedb_id + genres[key]}
                                renderItem={({ item }) => (
                                    <View>
                                        <ShowItem data={item} navigation={navigation} />
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
                width: 5,
                backgroundColor: "black",
            }}
        />
    );
}

const listEmptyComponent = () => {
    let [fontsLoaded] = useFonts({
        BebasNeue_400Regular
    });
    return (
        <View
            style={styles.categoryEmpty}
        >
            <Text style={styles.textCategoryEmpty}>{fontsLoaded ? "Aucune série n'a été trouvée" : <ActivityIndicator style={styles.loader} size="large" color="#ff0016" />}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        minHeight: vh(93),
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "white",
        marginTop: 40,
        marginBottom: 20,
        textAlign: 'center',
    },
    titleCategory: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "white",
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        fontFamily: BebasNeue_400Regular,
    },
    categoryEmpty: {
        height: vw(33),
        width: vw(33),
        backgroundColor: "white",
    },
    textCategoryEmpty: {
        color: "#ff0016",
        marginTop: "auto",
        marginBottom: "auto",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 12,
        fontFamily: BebasNeue_400Regular,
    },
    error: {
        color: "#ff0016",
        marginBottom: 25,
        fontFamily: BebasNeue_400Regular,
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
        minHeight: vw(40)
    }
});