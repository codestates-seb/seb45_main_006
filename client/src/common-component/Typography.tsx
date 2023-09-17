import { memo } from "react";
import { getRandomIDNotTracing } from "@util/random-helper";

export type ITextType =
    | "Logo"
    | "Heading"
    | "SubHeading"
    | "Label"
    | "Highlight"
    | "Body"
    | "DetailBody"
    | "Recruit"
    | "SmallLabel"
    | "Description";

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
    const renderText = (textValue: string) => {
        const colorAndStyle = `${color ? color : ""} ${styles ? styles : ""}`;
        const key = getRandomIDNotTracing();

        if (type === "Logo") {
            return (
                <p key={key} className={`font-ganpan text-40 font-bold ${colorAndStyle}`}>
                    {textValue}
                </p>
            );
        }

        if (type === "Heading") {
            return (
                <p key={key} className={`text-32 font-bold ${colorAndStyle}`}>
                    {textValue}
                </p>
            );
        }

        if (type === "SubHeading") {
            return (
                <p key={key} className={`text-24 font-bold ${colorAndStyle}`}>
                    {textValue}
                </p>
            );
        }

        if (type === "Label") {
            return (
                <p key={key} className={`text-18 font-medium ${colorAndStyle}`}>
                    {textValue}
                </p>
            );
        }

        if (type === "Highlight") {
            return (
                <p key={key} className={`text-base font-semibold ${colorAndStyle}`}>
                    {textValue}
                </p>
            );
        }

        if (type === "Body") {
            return (
                <p key={key} className={`text-base ${colorAndStyle}`}>
                    {textValue}
                </p>
            );
        }

        if (type === "Recruit") {
            return (
                // eslint-disable-next-line tailwindcss/no-custom-classname
                <p key={key} className={`text-md font-gangwon ${colorAndStyle}`}>
                    {textValue}
                </p>
            );
        }

        if (type === "SmallLabel") {
            return (
                // eslint-disable-next-line tailwindcss/no-custom-classname
                <p key={key} className={`text-md font-gangwon ${colorAndStyle}`}>
                    {textValue}
                </p>
            );
        }

        if (type === "Description") {
            return (
                <p key={key} className={`font-gangwon text-sm ${colorAndStyle}`}>
                    {textValue}
                </p>
            );
        }
    };

    return (
        <>
            {text && text.includes("\n")
                ? text.split("\n").map((v) => {
                      return renderText(v);
                  })
                : renderText(text)}
        </>
    );
}

export const Typography = memo(Text); // 불필요한 렌더링을 방지해주는 기능: memo
export default Typography;
