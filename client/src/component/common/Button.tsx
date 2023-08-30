type IButton = {
    type: "PROJECT" | "STUDY" | "BOARD" | "MAIN";
    label: string;
    isFullBtn: boolean;
    onClickHandler?: () => void;
};

function Button({ type, label, isFullBtn = false, onClickHandler }: IButton) {
    const background = `bg-${type.toLocaleLowerCase()}`;
    const width = isFullBtn ? "w-full" : "w-fit";

    return (
        <button
            onClick={() => {
                if (onClickHandler) onClickHandler();
            }}
            className={`mr-4 h-40 rounded px-10 py-8 text-14 ${width} ${background}`}
        >
            <p className={`${type === "MAIN" ? "text-white" : ""}`}>{label}</p>
        </button>
    );
}

export default Button;
