import { useState, useEffect } from "react";
import { useSearchParams, useMatches } from "react-router-dom";

import { useGetMemberDetail } from "@api/member/hook";

import { useToast } from "@hook/useToast";

import UserCardHor from "./component/UserCardHor";
import UserActivity from "./component/UserActivity";
import Typography from "@component/Typography";

type ITabItem = {
    label: string;
    tab: "project" | "study" | "info" | "question";
    selected: boolean;
};
type ITabItems = Array<ITabItem>;

export const TabItem = ({ item, onClickTabItem }: { item: ITabItem; onClickTabItem: (item: ITabItem) => void }) => {
    const setSearchParams = useSearchParams()[1];

    return (
        <li
            onClick={() => {
                setSearchParams({ tab: item.tab });
            }}
        >
            <button className="mr-16 w-max font-spoqa text-18 font-medium" onClick={() => onClickTabItem(item)}>
                <Typography type="SmallLabel" text={item.label} color={`${item.selected ? "text-main" : ""}`} />
            </button>
        </li>
    );
};

function UserDetail() {
    const match = useMatches();
    const memberId = Number.parseInt(match[0].params.memberId || "0");

    const [searchParams] = useSearchParams();
    const curTab = searchParams.get("tab");

    const { data: user, isError } = useGetMemberDetail({ memberId });

    const { fireToast } = useToast();

    const defaultNavItems: ITabItems = [
        { label: "프로젝트", tab: "project", selected: true },
        { label: "스터디", tab: "study", selected: false },
        { label: "자유 게시판", tab: "info", selected: false },
        { label: "질문 게시판", tab: "question", selected: false },
    ];

    const [tabItems, setTabItems] = useState<ITabItems>(defaultNavItems);

    useEffect(() => {
        if (curTab) {
            setTabItems(
                [...defaultNavItems].map((v) => {
                    return { label: v.label, tab: v.tab, selected: curTab.includes(v.tab) };
                }),
            );
        } else {
            setTabItems(defaultNavItems);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match[1].pathname]);

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

    if (isError) {
        fireToast({
            content: <Typography type="Highlight" text={"삭제/차단 등의 이유로 조회할 수 없는 사용자입니다!"} />,
            isConfirm: false,
        });
        return;
    }

    return (
        <div className="flex justify-center bg-background">
            <div className="flex w-11/12 flex-col p-20">
                {user && <UserCardHor user={user} />}
                <ol className="mb-20 flex">
                    {tabItems.map((v) => (
                        <TabItem key={v.label} item={v} onClickTabItem={onClickTabItem} />
                    ))}
                </ol>
                {user && <UserActivity memberId={user.memberId} tab={tabItems.filter((v) => v.selected)[0].tab} />}
            </div>
        </div>
    );
}

export default UserDetail;
