/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

const range = (length) => Array.from({ length }, (_, i) => i);
const pixels = range(1000 + 1).map((x) => [x, `calc(${x}rem / 16)`]);
const px0_10 = Object.fromEntries(pixels.slice(0, 10 + 1));
const px0_100 = Object.fromEntries(pixels.slice(0, 100 + 1));
const px0_500 = Object.fromEntries(pixels.slice(0, 500 + 1));
const px0_1000 = Object.fromEntries(pixels);
const customColor = {
    primary: "#191A20",
    "button-next": "#888888",
    "button-border": "#847D7D",
    borderline: "#D9D9D9",
    background: "#F1F1F1",
    main: "#44AE4E",
    sub: "#26DC4D",
    project: "#BAE5FD",
    project_point: "#36B7FF",
    study: "#C0E5C8",
    study_point: "#26DC4D",
    board: "#CCA9DD",
    bookmark: "#F8BD00",
    deadline: "#FF9356",
    warn: "#F86D7D",
    toast: "#BAE5FD",
    modal: "rgba(0, 0, 0, 0.4)",
};

export default withMT({
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            spacing: { ...px0_500, 1120: "1120px" },
            borderRadius: { none: "0", DEFAULT: "43px", large: "62px" },
            padding: { "25px": "25px" },
            borderWidth: px0_10,
            fontSize: px0_100,
            minWidth: px0_1000,
            minHeight: px0_1000,
            maxWidth: px0_1000,
            maxHeight: { ...px0_1000, "4/5": "80%" },
            width: px0_1000,
            height: px0_1000,
            colors: customColor,
            fontFamily: {
                noto: ["Noto Sans KR, sans-serif"],
                spoqa: ["Spoqa Han Sans Neo, sans-serif"],
                ganpan: ["KCC-Ganpan"],
            },
        },
    },
    plugins: [],
});
