import axios from "axios";

const BASE_URL = "https://fashonx-backend.onrender.com/api";
const TOKEN = localStorage.getItem("persist:root") && JSON.parse(localStorage.getItem("persist:root")).user && JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser && JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` }
})