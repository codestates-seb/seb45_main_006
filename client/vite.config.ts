import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            { find: "@assets", replacement: "/src/assets" },
            { find: "@api", replacement: "/src/api" },
            { find: "@component", replacement: "/src/common-component" },
            { find: "@container", replacement: "/src/container" },
            { find: "@feature", replacement: "/src/feature" },
            { find: "@type", replacement: "/src/type" },
            { find: "@hook", replacement: "/src/hook" },
            { find: "@util", replacement: "/src/util" },
            { find: "@", replacement: "/src" },
        ],
    },
});
