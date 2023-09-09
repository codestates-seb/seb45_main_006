import { ReactNode, useEffect, useState } from "react";

type IButton = {
    type:
        | "BLACK"
        | "PROJECT"
        | "PROJECT_POINT"
        | "STUDY"
        | "STUDY_POINT"
        | "INFO"
        | "INFO_POINT"
        | "QUESTION"
        | "QUESTION_POINT"
        | "MAIN"
        | "SUB"
        | "WARN";
    children: ReactNode;
    isFullBtn?: boolean;
    styles?: string;
    onClickHandler?: () => void;
};

function Button({ children, type, styles, isFullBtn = false, onClickHandler }: IButton) {
    const [background, setBackground] = useState("bg-project");

    useEffect(() => {
        if (type === "BLACK") setBackground("bg-black");
        if (type === "PROJECT") setBackground("bg-project");
        if (type === "PROJECT_POINT") setBackground("bg-project_point");
        if (type === "STUDY") setBackground("bg-study");
        if (type === "STUDY_POINT") setBackground("bg-study_point");
        if (type === "INFO") setBackground("bg-info");
        if (type === "INFO_POINT") setBackground("bg-info_point");
        if (type === "QUESTION") setBackground("bg-question");
        if (type === "QUESTION_POINT") setBackground("bg-question_point");
        if (type === "MAIN") setBackground("bg-main");
        if (type === "SUB") setBackground("bg-sub");
        if (type === "WARN") setBackground("bg-warn");
    }, [type]);

    return (
        <button
            onClick={() => {
                if (onClickHandler) onClickHandler();
            }}
            className={`mb-2 mr-4 flex h-fit justify-center rounded px-30 py-6 ${
                isFullBtn ? "w-full" : "w-fit"
            } ${background} ${styles ? styles : ""}`}
        >
            {children}
        </button>
    );
}

export default Button;
