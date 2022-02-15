import axios from "axios";

const BASE_URL="http://localhost:5000/api/";
const TOKEN=JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmNhZDk2MDI0ZjI4YzgyNTg4NjI3MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NDY0ODQ3MiwiZXhwIjoxNjQ0OTA3NjcyfQ.6SPrylEC_ObOx5LfND4hV0Z2MiXH5A4Eqz6bAHfnF2M";



export const publicRequest=axios.create({
    baseURL:BASE_URL,
});



export const userRequest=axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TOKEN}`}
})