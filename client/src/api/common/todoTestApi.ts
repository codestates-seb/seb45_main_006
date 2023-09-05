import axios from "axios";

const apiEndpoint = "https://dummyjson.com";

export const todoTestApi = axios.create({
    baseURL: apiEndpoint,
    headers: {
        "Content-Type": "application/json",
    },
});
