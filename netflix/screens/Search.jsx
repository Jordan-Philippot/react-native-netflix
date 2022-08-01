import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View, Animated, ActivityIndicator, TextInput, TouchableHighlight } from 'react-native';

// Package
import AsyncStorage from '@react-native-async-storage/async-storage';
import { vw, vh } from 'react-native-expo-viewport-units';


// Services
import { searchShowsByTitle, getDiscoverShow } from '../services/shows';

// Images
import ShowItem from '../components/ShowItem'


export default function Liste({ route, navigation }) {
    const [tokenStorage, setTokenStorage] = useState("")
    const [error, setError] = useState("")
    const [loadingDiscover, setLoadingDiscover] = useState(false)
    const [discoverShows, setDiscoverShows] = useState([])
    const [searchByTitle, setSearchByTitle] = useState("")
    const [responseBySearch, setResponseBySearch] = useState([])
    const [isLoadingForSearch, setIsLoadingForSearch] = useState(false)
    const [haveSearch, setHaveSearch] = useState(false)

    /* Get the name in localStorage & get Shows */
    useEffect(() => {
        const fetchStorage = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                setTokenStorage(token)
                setLoadingDiscover(true)
                getDiscoverShow(setDiscoverShows, setLoadingDiscover, token)
            } catch (e) {
                setError(e)
            }
        }
        fetchStorage()

    }, [])

    const searchShowByTitle = () => {
        setHaveSearch(true)
        setIsLoadingForSearch(true)
        searchShowsByTitle(setResponseBySearch, setIsLoadingForSearch, searchByTitle)
    }



    const scrollX = React.useRef(new Animated.Value(0)).current
    console.log(discoverShows, responseBySearch)



    const whatImLoaded = () => {

        if (loadingDiscover || isLoadingForSearch) {
            return <ActivityIndicator style={styles.loader} size="large" color="#ff0016" />
        } else if (responseBySearch.length > 0) {
            return <View style={styles.containerList}>
                <Text style={styles.title}>Les résultats de votre recherche </Text>
                <FlatList
                    horizontal={false}
                    data={responseBySearch}
                    style={styles.list}
                    ItemSeparatorComponent={Separator}
                    decelerationRate={"normal"}
                    ListEmptyComponent={listEmptyComponent}
                    numColumns={2}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <ShowItem style={styles.itemList} show={item} navigation={navigation} />
                        </View>
                    )}
                />
            </View>
        } else if (searchByTitle !== "" && responseBySearch.length < 1 && haveSearch) {
            return <View
                style={styles.categoryEmpty}
            >
                <Text style={styles.textCategoryEmpty}>Désolé, Aucun résultat n'a été trouvé</Text>
            </View>
        } else if(discoverShows.length > 0) {
            return <View style={styles.containerList}>
                <Text style={styles.title}>Vous aimerez peut être</Text>
                <FlatList
                    horizontal={false}
                    data={discoverShows}
                    style={styles.list}
                    ItemSeparatorComponent={Separator}
                    decelerationRate={"normal"}
                    ListEmptyComponent={listEmptyComponent}
                    numColumns={2}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View>
                            <ShowItem style={styles.itemList} show={item} navigation={navigation} />
                        </View>
                    )}
                />
            </View>
        }else{
            <View
                style={styles.categoryEmpty}
            >
                <Text style={styles.textCategoryEmpty}>Désolé, un problème est survenu</Text>
            </View>
        }

    }


    return (
        <SafeAreaView>

            <View style={styles.container}>

                {/* ----- Search By Title ----- */}
                <View style={styles.searchComponent}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(value) => setSearchByTitle(value)}
                        value={searchByTitle}
                        placeholder="Rechercher par titre"
                        keyboardType="default"
                    />
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => searchShowByTitle(searchByTitle)}
                    >
                        <Text style={styles.buttonText}>Rechercher</Text>
                    </TouchableHighlight>
                </View>

                {/* ----- If Loaded display show by category ----- */}
                {whatImLoaded()}



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
                height: 10,
                width: 10,
                marginRight: 10,
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
            <Text style={styles.textCategoryEmpty}>Désolé, Aucun résultat n'a été trouvé</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        minHeight: vh(93),
    },
    containerList: {
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "white",
        marginTop: 60,
        marginBottom: 20,
        textAlign: 'center',
    },
    searchComponent: {
        position: 'relative',
        top: 40,
    },
    input: {
        backgroundColor: 'white',
        color: '#121212',
        marginTop: 25,
        padding: 15,
        borderRadius: 20,
        textAlign: 'center',
        width: vw(80),
        marginLeft: vw(10),
    },
    button: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 70,
        paddingLeft: 70,
        backgroundColor: '#ff0016',
        borderRadius: 25,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 25,
        width: vw(80),
        marginLeft: vw(10),
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: "bold",
        fontSize: 16,
    },
    categoryEmpty: {
        justifyContent: 'center',
        marginTop: 80,
    },
    textCategoryEmpty: {
        color: "#ff0016",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
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
    itemList: {
        justifyContent: "center",
        marginRight: 10
    },
    signupSuccess: {
        color: "green",
        marginBottom: 15,
        fontSize: 10,
        fontWeight: "bold",
    },
});