import axios from 'axios';

const API_KEY = "8266d0cfdfa6";
const BASE_URI = "https://api.betaseries.com/"


// --------------- Get Shows by 500 ----------------------------
export async function getShows(setResponse, setLoading) {
    await axios({
        url: BASE_URI + "shows/list?limit=100&key=" + API_KEY,
    })
        .then((response) => {
            if (response) {
                setResponse(response.data.shows)
                setLoading(false)
            }
        }, (err) => {
            setResponse(err)
        });
}

// --------------- Get Show by ID show -------------------------
export const getShowById = async (setResponse, id) => {
    await axios({
        url: BASE_URI + "shows/display?key=" + API_KEY + "&id=" + id,
    })
        .then((response) => {
            if (response) {
                setResponse(response.data.show)
            }
        }, (err) => {
            setResponse(err)
        });
};

// --------------- Get genres list -----------------------------
export const getGenres = async (setResponse) => {
    await axios({
        url: BASE_URI + "shows/genres?key=" + API_KEY,
    })
        .then((response) => {
            if (response) {
                setResponse(response.data.genres)
            }
        }, (err) => {
            setResponse(err)
        });
};

// --------------- Get Characters by ID show -------------------
export const getCharactersByShow = async (setResponse, id) => {
    await axios({
        url: BASE_URI + "shows/characters?key=" + API_KEY + "&id=" + id,
    })
        .then((response) => {
            if (response) {
                setResponse(response.data.characters)
            }
        }, (err) => {
            setResponse(err)
        });
};



// ---------------- Get shows on my list ---------------------
// export async function getList(setResponse) {
//     await axios({
//         url: BASE_URI + 'shows/discover?key=' + API_KEY,
//     })
//         .then(function (response) {
//             if (response) {
//                 setResponse(response.data)
//             }
//         }, (err) => {
//             setResponse(err)
//         });
// }


// // ---------------- Add show to my list by ID -------------------
// export async function addToList(setResponse, id) {
//     await axios({
//         method: "post",
//         url: BASE_URI + 'shows/discover?key=' + API_KEY,
//         data: {
//             "id": id
//         }
//     })
//         .then(function (response) {
//             if (response) {
//                 setResponse(response)
//             }
//         }, (err) => {
//             setResponse(err)
//         });
// }


// ---------------- Get shows by title -------------------
export const searchShowsByTitle = async (setResponse, setIsLoading, title) => {
    await axios({
        url: BASE_URI + "shows/search?key=" + API_KEY + "&title=" + title,
    })
        .then((response) => {
            if (response) {
                setResponse(response.data.shows)
                setIsLoading(false)
            }
        }, (err) => {
            setResponse(err)
            setIsLoading(false)
        });
};

// ---------------- Get seasons by show ID -------------------
export const getSeasonsByShow = async (setResponse, id) => {
    await axios({
        url: BASE_URI + "shows/seasons?key=" + API_KEY + "&id=" + id,
    })
        .then((response) => {
            if (response.data) {
                setResponse(response.data.seasons)
            }
        }, (err) => {
            setResponse(err)
        });
};

// ---------------- Get episodes by show ID -------------------
export const getEpisodesByShow = async (setResponse, id) => {
    await axios({
        url: BASE_URI + "shows/episodes?key=" + API_KEY + "&id=" + id,
    })
        .then((response) => {
            if (response) {
                setResponse(response.data.episodes)
                // setLoadingByEpisodes(false)
            }
        }, (err) => {
            setResponse(err)
            // setLoadingByEpisodes(false)
        });
};

// ---------------- Get shows to discover -------------------
export const getDiscoverShow = async (setResponse, setIsLoading, token) => {
    await axios({
        url: BASE_URI + "shows/discover?key=" + API_KEY,
        headers: {
            'Authorization': `Bearer ` + token,
            'Access-Control-Allow-Origin': '*',
        }
    })
        .then((response) => {
            if (response) {
                setResponse(response.data.shows)
                setIsLoading(false)
            }
        }, (err) => {
            setResponse(err)
            setIsLoading(false)
        });
};

// ---------------- Get videos by shows -------------------
export const getVideosByShow = async (setResponse, id) => {
    await axios({
        url: BASE_URI + "shows/videos?key=" + API_KEY + "&id=" + id,
    })
        .then((response) => {
            if (response) {
                setResponse(response.data)
            }
        }, (err) => {
            setResponse(err)
        });
};

// Vous aimerez peut être AUSSI...
//shows/similars
