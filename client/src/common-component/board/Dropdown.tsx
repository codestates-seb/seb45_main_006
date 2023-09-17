import { useRef, useEffect, RefObject } from "react";
import Typography from "@component/Typography";

import ArrowUp from "@assets/arrowUp.png";

import { CATEGORY_NAME } from "@type/info/common";

function Dropdown({
    label,
    required,
    type,
    isDropDownShow,
    setIsDropDownShow,
    dropdownList,
    selectedItem,
    setSelectedItem,
}: {
    label?: string;
    required?: boolean;
    type?: "OUTLINED" | "UNDERLINED";
    isDropDownShow: boolean;
    setIsDropDownShow: (v: boolean) => void;
    dropdownList: Array<CATEGORY_NAME>;
    selectedItem: CATEGORY_NAME | "";
    setSelectedItem: (v: CATEGORY_NAME | "") => void;
}) {
    const dropdownRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const outsideClick = (e: MouseEvent) => {
            if (isDropDownShow && !dropdownRef.current?.contains(e.target as Node)) {
                setIsDropDownShow(false);
            }
        };

        document.body.addEventListener("click", outsideClick);

        return () => {
            document.body.removeEventListener("click", outsideClick);
        };
    }, [isDropDownShow, setIsDropDownShow]);

    return (
        <div className="p-10">
            {label && (
                <div className="mb-10 flex">
                    <Typography text={`${label}`} type="Body" />
                    {required && <Typography text="*" type="Body" color="text-warn" />}
                </div>
            )}
            <div
                className={`w-full border-borderline bg-white ${
                    type === "OUTLINED" ? "rounded-md border-1" : "border-b-1"
                }`}
                ref={dropdownRef}
                onClick={() => setIsDropDownShow(!isDropDownShow)}
            >
                <div className="relative p-8">
                    <Typography type="Body" text={selectedItem || "선택"} />
                    <div className="absolute right-10 top-12">
                        <img
                            src={ArrowUp}
                            className={`mr-10 w-16 transition-transform duration-200 ease-in-out ${
                                isDropDownShow ? "rotate-180" : ""
                            }`}
                        />
                    </div>
                </div>

                <div className="relative flex-1">
                    {isDropDownShow ? (
                        <ol className="absolute top-8 z-10 flex max-h-180 w-full flex-col overflow-y-scroll rounded-md border-1 border-borderline bg-white p-8">
                            {dropdownList.map((v) => (
                                <li
                                    key={v}
                                    className="w-full cursor-pointer border-b-1 border-borderline p-8 hover:bg-background"
                                    onClick={() => {
                                        setSelectedItem(v);
                                        setIsDropDownShow(false);
                                    }}
                                >
                                    <Typography type="SmallLabel" text={v} styles="font-extrabold" />
                                </li>
                            ))}
                        </ol>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default Dropdown;
