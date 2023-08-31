import axios from "axios";

let apiEndpoint = "";
if (import.meta.env.VITE_APP_API_ENDPOINT && typeof import.meta.env.VITE_APP_API_ENDPOINT === "string") {
    apiEndpoint = import.meta.env.VITE_APP_API_ENDPOINT;
}

export const commonApi = async ({
    method,
    path,
    headers,
    params,
    data,
    options,
}: {
    method: "GET" | "POST" | "OPTIONS" | "PUT" | "DELETE";
    path: string;
    headers?: object | null;
    params?: object | null;
    data?: object | null;
    options?: object | null;
}) => {
    const response = await axios({
        baseURL: apiEndpoint,
        method,
        url: path,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        params: params || {},
        data,
        ...options,
    });
    return response.data;
};
