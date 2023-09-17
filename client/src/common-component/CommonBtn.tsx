import { ReactNode } from "react";

type ISize = "SM" | "MD" | "LG" | "FULL" | "AUTO";

type IButton = {
    children: ReactNode;
    size: ISize;
    styleType?: "OUTLINED" | "FILLED";
    color: "GRAY" | "MAIN";
    styles?: string;

    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

// interface ISizeCss {
//     [key: ISize]: string;
// };

const SIZE_CSS = {
    // TODO : 버튼 큰 것은 rounded-43px(padding 8px) / 작은 것은 20px(padding 12px)인데
    // 이미 다른 사이즈를 사용중인것 같아서 혹시몰라.. 따로 변경하지 않았어요

    SM: "w-fit px-12 py-8 rounded-3xl",
    MD: "",
    LG: "rounded px-30 py-6",
    FULL: "",
    AUTO: "",
} as const;

const STYLE_TYPE_CSS = {
    OUTLINED: (color: "GRAY" | "MAIN") =>
        color === "GRAY" ? "border-1 border-gray-500 hover:font-bold" : "border-1 border-tertiary hover:font-bold",
    FILLED: (color: "GRAY" | "MAIN") =>
        color === "GRAY" ? "bg-gray-600 hover:bg-gray-700" : "bg-tertiary hover:bg-light hover:font-bold",
} as const;

function CommonBtn({
    children,
    size,
    color,
    styleType = "OUTLINED",
    styles,
    type = "button",
    disabled = false,
    onClick = () => {},
}: IButton) {
    return (
        <button
            className={`mr-2 ${SIZE_CSS[size]} ${STYLE_TYPE_CSS[styleType](color)} ${styles}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

export default CommonBtn;
