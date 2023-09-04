import { useEffect, useState } from "react";
import Text from "@component/common/Text";

type IButton = {
    type: "PROJECT" | "STUDY" | "BOARD" | "MAIN" | "SUB" | "WARN";
    label: string;
    isFullBtn: boolean;
    styles?: string;
    onClickHandler?: () => void;
};

function Button({ type, label, styles, isFullBtn = false, onClickHandler }: IButton) {
    const [background, setBackground] = useState("bg-project");

    useEffect(() => {
        if (type === "PROJECT") setBackground("bg-project");
        if (type === "STUDY") setBackground("bg-study");
        if (type === "BOARD") setBackground("bg-board");
        if (type === "MAIN") setBackground("bg-main");
        if (type === "SUB") setBackground("bg-sub");
        if (type === "WARN") setBackground("bg-warn");
    }, [type]);

    return (
        <button
            onClick={() => {
                if (onClickHandler) onClickHandler();
            }}
            className={`mb-2 mr-4 h-32 rounded px-8 py-6 text-14 ${
                isFullBtn ? "w-full" : "w-fit"
            } ${background} ${styles}`}
        >
            <Text
                type="SmallLabel"
                color={type === "MAIN" || type === "SUB" || type === "WARN" ? "text-white" : ""}
                text={label}
            />
        </button>
    );
}

export default Button;
