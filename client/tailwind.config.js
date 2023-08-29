/** @type {import('tailwindcss').Config} */

const range = (length) => Array.from({ length }, (_, i) => i);
const pixels = range(1000 + 1).map((x) => [x, `calc(${x}rem / 16)`]);
const px0_10 = Object.fromEntries(pixels.slice(0, 10 + 1));
const px0_100 = Object.fromEntries(pixels.slice(0, 100 + 1));
const px0_200 = Object.fromEntries(pixels.slice(0, 200 + 1));
const px0_1000 = Object.fromEntries(pixels);
const customColor = {
    primary: "#191A20",
    "butotn-next": "#888888",
    "button-border": "#847D7D",
    background: "#C2C2C2",
    main: "#44AE4E",
    project: "#BAE5FD",
    study: "#C0E5C8",
    board: "#CCA9DD",
    bookmark: "#F8BD00",
    deadline: "#FF9356",
    warn: "#F86D7D",
    toast: "#BAE5FD",
};

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            borderWidth: px0_10,
            fontSize: px0_100,
            minWidth: px0_1000,
            minHeight: px0_1000,
            maxWidth: px0_1000,
            maxHeight: px0_1000,
            spacing: px0_200,
            width: px0_1000,
            height: px0_1000,
            colors: customColor,
        },
    },
    plugins: [],
};
