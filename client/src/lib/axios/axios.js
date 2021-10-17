import axios from "axios";
import makeToast from "../../Toaster";
import * as localStorageService from "../../services/localStorageService"

const api = axios.create({
    baseURL: "http://localhost:8000/",
})
//Global Error Handler
api.interceptors.response.use((response) => response, (error) => {
    makeToast("error", error?.response?.data?.message);
    return Promise.reject(error);
});

api.interceptors.request.use((req) => {
    const token = localStorageService.getTokenFromLocalStorage();
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default api;
