import axios from "axios";

let baseApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

const apiRequest = function () {
    let token = localStorage.getItem('user-token');
    console.log(token);
    if (token) {
        baseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return baseApi;
}

export default apiRequest;