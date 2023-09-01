import axios from "axios";

const apiEndpoint = "https://dummyjson.com";

export const todoTestApi = async ({
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
