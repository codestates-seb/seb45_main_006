import axios from "axios";
import { getItemFromStorage } from "@util/localstorage-helper";

let apiEndpoint = "";
if (import.meta.env.VITE_APP_API_ENDPOINT && typeof import.meta.env.VITE_APP_API_ENDPOINT === "string") {
    apiEndpoint = import.meta.env.VITE_APP_API_ENDPOINT;
}

export const commonApi = axios.create({
    baseURL: apiEndpoint,
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
    },
});

commonApi.interceptors.request.use(async (config) => {
    const accessToken = getItemFromStorage("accessToken") || "";
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    }

    return config;
});
