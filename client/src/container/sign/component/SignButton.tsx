import { ReactNode } from "react";

type ISignButton = {
    type: "OUTLINED" | "FILLED";
    children: ReactNode;
    styles?: string;
    onClickHandler?: () => void;
};

function SignButton({ type, children, styles, onClickHandler }: ISignButton) {
    const defaultCss = "flex h-40 w-fit min-w-145 items-center justify-center rounded px-30";
    const outlinedCss = "border-1 border-buttonborder";
    const filledCss = "bg-buttonnext";
    return (
        <button
            onClick={() => {
                if (onClickHandler) onClickHandler();
            }}
            className={`${defaultCss} ${type === "OUTLINED" ? outlinedCss : filledCss} ${styles}`}
        >
            {children}
        </button>
    );
}

export default SignButton;
