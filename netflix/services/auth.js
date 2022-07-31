import axios from 'axios';

const API_KEY = "8266d0cfdfa6";
const BASE_URI = "https://api.betaseries.com/"


export const login = async (setResponse, data) => {
    await axios({
        method: "post",
        url: BASE_URI + "members/auth?key=" + API_KEY,
        data: data
    })
        .then((response) => {
            if (response) {
                setResponse(response.data)
            }
        }, (err) => {
            setResponse(err)
        });
};


export const signUp = async (setResponse, data) => {
    await axios({
        method: "post",
        url: BASE_URI + "members/signup?key=" + API_KEY,
        data: data
    })
        .then((response) => {
            if (response) {
                setResponse(response.data)
            }
        }, (err) => {
            setResponse(err)
        });
};