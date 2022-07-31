import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';

// Packages
import { vw, vh } from 'react-native-expo-viewport-units';
import Icon from 'react-native-vector-icons/FontAwesome';

// Images
import NetflixNLogo from '../assets/images/netflixNLogo.png'

export default function EpisodeItem({ episode, navigation }) {
    const [showMore, setShowMore] = useState(false)
    const [description, setDescription] = useState(episode.description ? episode.description : "n/a")
    
    useEffect(() => {
        if (!episode.description) {
            setDescription("n/a")
        } else if (showMore) {
            setDescription(episode.description)
        } else if (!showMore) {
            setDescription(episode.description.substring(0, 150))
        }
    }, [showMore])

    return (
        <SafeAreaView>
            <View style={styles.container}>

                {/* ----- Header ------*/}
                <View style={styles.header}>
                    <Text style={styles.episodeNumber}>
                        {episode.code ? episode.code.slice(-3) : "n/a"}
                    </Text>
                    {/* ------ Mean for this show ------ */}
                    <View style={styles.notes}>
                        <Icon
                            name='star'
                            color='#ff0016' />
                        <Text style={styles.notesMean}>{episode.note.mean ? Math.round(episode.note.mean * 10) / 10 + "/ 5" : ""} </Text>
                    </View>
                </View>

                {/* ----- Netflix Logo -----*/}
                <Image
                    source={NetflixNLogo}
                    style={styles.image}
                />

                {/* ----- Title with link betaseries -----*/}
                <Text style={styles.title}
                    onPress={() => window.open(episode.resource_url, '_blank', 'noopener,noreferrer')}
                >
                    {episode.title ? episode.title : "n/a"}
                </Text>


                {/* ----- Description with Show more text -----*/}
                <Text style={styles.description} >
                    {description}
                </Text>

                {description !== 'n/a' && 
                    <Text style={styles.showMore}
                        onPress={() => showMore ? setShowMore(false) : setShowMore(true)}>
                        {showMore ?
                            <Icon
                                name='minus'
                                color='#ff0016'
                                size={18} />
                            :
                            <Icon
                                name='plus'
                                color='#ff0016'
                                size={18} />
                        }
                    </Text>
                }

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    episodeNumber: {
        color: "white",
        fontSize: 12,
        marginBottom: 10,
        marginLeft: 5,
        fontWeight: 'bold',
    },
    notes: {
        flexDirection: "row",
    },
    notesMean: {
        color: "white",
        marginLeft: 5,
    },
    title: {
        color: "#ff0016",
        fontSize: 14,
        padding: 15,
        height: 'auto',
        width: '100%',
        maxWidth: vw(45),
        minHeight: 80,
        textAlign: 'center',
        fontWeight: 'bold',
        flexWrap: 'break-word',
    },
    description: {
        color: "white",
        fontSize: 10,
        height: 'auto',
        minHeight: 80,
        width: '100%',
        maxWidth: vw(45),
        textAlign: 'center',
        flexWrap: 'break-word',
        marginBottom: 25,
        position: 'relative',
    },
    image: {
        width: vw(45),
        minHeight: 40,
        borderRadius: 5,
    },
    showMore: {
        color: "#5a8aff",
        fontSize: 8,
        textAlign: 'left',
        fontWeight: 'bold',
        flexWrap: 'break-word',
        position: 'absolute',
        marginLeft: 15,
        bottom: 5,
    }
});