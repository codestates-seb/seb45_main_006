/// <reference types="vite/client" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: "development" | "production" | "test";
        readonly PUBLIC_URL: string;
        VITE_APP_API_ENDPOINT: string;
    }
}
