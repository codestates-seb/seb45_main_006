import { ReactNode } from "react";

type ISignButton = {
    type: "OUTLINED" | "FILLED";
    children: ReactNode;
    styles?: string;
    onClickHandler?: () => void;
};

function SignButton({ type, children, styles, onClickHandler }: ISignButton) {
    return (
        <button
            onClick={() => {
                if (onClickHandler) onClickHandler();
            }}
            className={`flex h-40 w-145 items-center justify-center rounded px-30 ${
                type === "OUTLINED" ? "border-1 border-button-border" : ""
            } ${type === "FILLED" ? "bg-button-next" : ""} ${styles}`}
        >
            {children}
        </button>
    );
}

export default SignButton;
