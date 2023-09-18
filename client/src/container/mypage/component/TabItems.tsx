import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Typography from "@component/Typography";

export type ITab = "project" | "study" | "info" | "question";

type ITabItem = {
    label: string;
    tab: ITab;
    selected: boolean;
};
type ITabItems = Array<ITabItem>;

export const TabItem = ({ item, onClickTabItem }: { item: ITabItem; onClickTabItem: (item: ITabItem) => void }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const auth = searchParams.get("auth") || "";
    const nav = searchParams.get("nav") || "";

    return (
        <li
            onClick={() => {
                setSearchParams({ auth, nav: nav, tab: item.tab });
            }}
        >
            <button className={`mr-16 w-max text-18 font-medium hover:text-main`} onClick={() => onClickTabItem(item)}>
                <Typography
                    type="SmallLabel"
                    text={item.label}
                    color={`${item.selected ? "text-main font-bold" : ""}`}
                />
            </button>
        </li>
    );
};

const defaultTabItems: ITabItems = [
    { label: "프로젝트", tab: "project", selected: true },
    { label: "스터디", tab: "study", selected: false },
    { label: "자유 게시판", tab: "info", selected: false },
    { label: "질문 게시판", tab: "question", selected: false },
];

function TabItems() {
    const [tabItems, setTabItems] = useState<ITabItems>(defaultTabItems);

    const [searchParams] = useSearchParams();
    const curTab = searchParams.get("tab");
    const nav = searchParams.get("nav") || "";

    useEffect(() => {
        if (curTab) {
            if (nav === "likes") {
                setTabItems(
                    [...defaultTabItems]
                        .filter((v) => !(v.tab === "project" || v.tab === "study"))
                        .map((v) => {
                            return { label: v.label, tab: v.tab, selected: v.tab === "info" };
                        }),
                );
            } else {
                setTabItems(
                    [...defaultTabItems].map((v) => {
                        return { label: v.label, tab: v.tab, selected: curTab.includes(v.tab) };
                    }),
                );
            }
        } else {
            setTabItems(defaultTabItems);
        }
    }, [curTab, nav]);

    const onClickTabItem = (item: ITabItem) => {
        setTabItems(
            [...tabItems].map((v) => {
                return {
                    label: v.label,
                    tab: v.tab,
                    selected: v.label === item.label ? true : false,
                };
            }),
        );
    };

    return (
        <ol className="mb-20 flex rounded-md bg-white p-12">
            {tabItems.map((v) => (
                <TabItem key={v.label} item={v} onClickTabItem={onClickTabItem} />
            ))}
        </ol>
    );
}

export default TabItems;
