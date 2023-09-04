import { memo } from "react";

export type ITextType = "Logo" | "Heading" | "Label" | "Highlight" | "Body" | "SmallLabel" | "Description";

function Text({
    type,
    text,
    color = "text-primary",
    styles,
}: {
    type: ITextType;
    text: string;
    color?: string;
    styles?: string;
}) {
    const renderText = () => {
        if (type === "Logo") {
            return <p className={`font-ganpan text-40 font-bold ${color ? color : ""} ${styles}`}>{text}</p>;
        }

        if (type === "Heading") {
            return <p className={`text-32 font-bold ${color ? color : ""} ${styles}`}>{text}</p>;
        }

        if (type === "Label") {
            return <p className={`font-spoqa text-20 font-medium ${color ? color : ""} ${styles}`}>{text}</p>;
        }

        if (type === "Highlight") {
            return <p className={`text-base font-semibold ${color ? color : ""} ${styles}`}>{text}</p>;
        }

        if (type === "Body") {
            return <p className={`text-base ${color ? color : ""} ${styles}`}>{text}</p>;
        }

        if (type === "SmallLabel") {
            return <p className={`text-sm ${color ? color : ""} ${styles}`}>{text}</p>;
        }

        if (type === "Description") {
            return <p className={`text-xs ${color ? color : ""} ${styles}`}>{text}</p>;
        }
    };
    return <>{renderText()}</>;
}

export const Typography = memo(Text); // 불필요한 렌더링을 방지해주는 기능: memo
export default Typography;
