/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

const range = (length) => Array.from({ length }, (_, i) => i);
const pixels = range(1000 + 1).map((x) => [x, `calc(${x}rem / 16)`]);
const px0_10 = Object.fromEntries(pixels.slice(0, 10 + 1));
const px0_100 = Object.fromEntries(pixels.slice(0, 100 + 1));
const px0_500 = Object.fromEntries(pixels.slice(0, 500 + 1));
const px0_1000 = Object.fromEntries(pixels);
const customColor = {
    tertiary: "#C0E5C8",
    light: "#cae9d1",
    // 메인 컬러 통일하기 - 수정 예정
    primary: "#191A20",
    buttonnext: "#888888",
    buttonborder: "#847D7D",
    borderline: "#D9D9D9",
    background: "#F1F1F1",
    main: "#44AE4E",
    sub: "#26DC4D",
    project: "#BAE5FD",
    project_point: "#36B7FF",
    study: "#C0E5C8",
    study_point: "#26DC4D",
    info: "#ECD5E3",
    info_point: "#CCA9DD",
    question: "#FEE1E8",
    question_point: "#FFC5BF",
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
            borderRadius: { none: "0", small: "20px", DEFAULT: "43px", large: "62px" },
            // TODO borderRadius 큰 것은 43px 작은것은 20px인데 이미 DEFAULT에 43px 사용중이라 이름을 따로 수정하지 않았습니다
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
    // eslint-disable-next-line no-undef
    plugins: [require("tailwind-scrollbar-hide")],
});
