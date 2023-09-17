import { useEffect, useState } from "react";

type ITag = {
    type: "PROJECT" | "STUDY";
    text: string;
    styles?: string;
};

const Tag = ({ type, text, styles }: ITag) => {
    const [background, setBackground] = useState("bg-project");
    useEffect(() => {
        if (type === "PROJECT") setBackground("bg-project");
        if (type === "STUDY") setBackground("bg-study");
    }, [type]);
    return (
        <div
            className={`mb-2 mr-4 flex rounded px-6 py-2 font-gangwon text-14 shadow-md ${background} ${
                styles ? styles : ""
            }`}
        >
            {text}
        </div>
    );
};

export default Tag;
