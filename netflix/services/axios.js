import axios from 'axios';

const API_KEY = "8266d0cfdfa6";
const BASE_URI = "http://api.betaseries.com/"

// __________________ Get Shows by 100 ___________________
export async function getShows(setResponse, setLoading) {
    await axios({
        url: BASE_URI + "shows/list?limit=500&key=" + API_KEY,
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
