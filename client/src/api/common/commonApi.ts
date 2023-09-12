import axios from "axios";

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
