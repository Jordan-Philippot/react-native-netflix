import axios from 'axios';

const API_KEY = "8266d0cfdfa6";
const BASE_URI = "https://api.betaseries.com/"

// ---------------- Get shows in my favorite -------------------
export const getFavorites = async (setResponse, idMember, token) => {
    await axios({
        url: BASE_URI + "shows/favorites?key=" + API_KEY + "&id=" + idMember,
        headers: {
            'Authorization': `Bearer ` + token
        }
    })
        .then((response) => {
            if (response) {
                setResponse(response.data)
            }
        }, (err) => {
            setResponse(err)
        });
};

// ---------------- Add show in my favorite by ID --------------
export async function addToFavorite(setResponse, idShow, token) {
    await axios({
        method: "post",
        headers: {
            'Authorization': `Bearer ` + token
        },
        url: BASE_URI + "shows/favorite?key=" + API_KEY,
        data: {
            "id": idShow,
        }
    })
        .then(function (response) {
            if (response) {
                setResponse(response)
            }
        }, (err) => {
            setResponse(err)
        });
}

// ---------------- Delete show in my favorite by ID -------------
export async function deleteToFavorite(setResponse, idMember, token) {
    await axios({
        method: "delete",
        headers: {
            'Authorization': `Bearer ` + token
        },
        url: BASE_URI + "shows/favorite?key=" + API_KEY + "&Token=" + token + "&id=" + idMember,
        data: {
            "id": id
        }
    })
        .then(function (response) {
            if (response) {
                setResponse(response)
            }
        }, (err) => {
            setResponse(err)
        });
}


// ---------------- Add note for show by ID ----------------------
export async function addNote(setResponse, id) {
    await axios({
        method: "post",
        url: BASE_URI + "shows/note?key=" + API_KEY,
        data: {
            "id": id
        }
    })
        .then(function (response) {
            if (response) {
                setResponse(response)
            }
        }, (err) => {
            setResponse(err)
        });
}

// ---------------- Delete note for show by ID ------------------
export async function deleteNote(setResponse, id) {
    await axios({
        method: "post",
        url: BASE_URI + "shows/note?key=" + API_KEY,
        data: {
            "id": id
        }
    })
        .then(function (response) {
            if (response) {
                setResponse(response)
            }
        }, (err) => {
            setResponse(err)
        });
}
