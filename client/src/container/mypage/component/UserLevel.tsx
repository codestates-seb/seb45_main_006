import { useGetMyLevel } from "@api/member-activity/hook";
import Typography from "@component/Typography";

import FrogEgg from "@assets/attendance/frog-egg.png";
import TadPole from "@assets/attendance/tadpole.png";
import FrogLegBack from "@assets/attendance/frog-leg-back.png";
import FrogLegFront from "@assets/attendance/frog-leg-front.png";
import BabyFrog from "@assets/attendance/baby-frog.png";
import Frog from "@assets/attendance/frog.png";
import { useEffect, useState } from "react";

function UserLevel() {
    const { data: userLevel } = useGetMyLevel();

    const levelDefaultInfo = [
        {
            grade: "개구리알",
            stage: 0,
            imgSrc: FrogEgg,
            description: "회원가입 완료 시 개구리 알 회원이 될 수 있어요!",
            myLevel: false,
        },
        {
            grade: "올챙이",
            stage: 1,
            imgSrc: TadPole,
            description: "좋아요 3개를 누르고 댓글 1개를 달면 올챙이 회원이 될 수 있어요!",
            myLevel: false,
        },
        {
            grade: "뒷다리",
            stage: 2,
            imgSrc: FrogLegBack,
            description: "게시글 1개 작성하고 경험치 15를 달성하면 뒷다리 회원이 될 수 있어요!",
            myLevel: false,
        },
        {
            grade: "앞다리",
            stage: 3,
            imgSrc: FrogLegFront,
            description: "질문 채택 받고 경험치 30 이상일 경우 앞다리 회원이 될 수 있어요!",
            myLevel: false,
        },
        {
            grade: "새끼 개구리",
            stage: 4,
            imgSrc: BabyFrog,
            description: "내가 쓴 게시글에 좋아요 10개 받고 경험치 50 이상일 경우 새끼 개구리 회원이 될 수 있어요!",
            myLevel: false,
        },
        {
            grade: "어른 개구리",
            stage: 5,
            imgSrc: Frog,
            description: "경험치 500 이상 쌓으면 최고 등급인 어른 개구리가 될 수 있어요!",
            myLevel: false,
        },
    ];

    const [myLevel, setMyLevel] = useState(levelDefaultInfo);

    useEffect(() => {
        if (userLevel) {
            const temp = levelDefaultInfo.map((v) => {
                if (v.grade === userLevel?.grade) {
                    return { ...v, myLevel: true };
                }
                return { ...v };
            });
            setMyLevel(temp);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userLevel]);

    return (
        <div className="flex flex-1 flex-col">
            <div className="mb-20 flex flex-col items-center rounded-md bg-white p-40 shadow-md">
                <div className="flex w-full justify-start">
                    <Typography type="SmallLabel" text="지금 나는" styles="mr-8" />
                    <Typography
                        type="SmallLabel"
                        text={userLevel?.grade || ""}
                        styles="mr-8 font-bold"
                        color="text-main"
                    />
                    <Typography type="SmallLabel" text="회원이에요!" />
                </div>
                <div className="mb-20 flex w-full justify-start">
                    <Typography type="SmallLabel" text="경험치: " styles="mr-8" />
                    <Typography
                        type="SmallLabel"
                        text={userLevel?.maxExp.toString() || ""}
                        styles="mr-8"
                        color="text-main"
                    />
                </div>
                <div className="flex w-450 flex-wrap justify-between">
                    {myLevel.map((v) => {
                        return (
                            <div className="flex h-74 w-74 flex-col items-center justify-center">
                                <div
                                    className={`h-50 w-50 overflow-hidden rounded p-8 ${
                                        v.myLevel ? "border-2 border-main shadow-sm shadow-main" : ""
                                    }`}
                                    key={v.grade}
                                >
                                    <img src={v.imgSrc} />
                                </div>
                                <Typography
                                    type="SmallLabel"
                                    text={v.grade}
                                    color={v.myLevel ? "text-main font-bold" : ""}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="flex flex-col rounded-md bg-white p-40 shadow-md">
                <Typography text="각 등급은 이렇게 결정돼요!" type="SmallLabel" />
                {levelDefaultInfo.map((v) => {
                    return (
                        <div className="flex">
                            <div className="mr-10 flex h-74 w-100 flex-col items-center justify-center">
                                <div
                                    className={`h-50 w-50 overflow-hidden rounded p-8 ${
                                        v.myLevel ? "border-2 border-main shadow-sm shadow-main" : ""
                                    }`}
                                    key={v.grade}
                                >
                                    <img src={v.imgSrc} />
                                </div>
                                <Typography
                                    type="SmallLabel"
                                    text={v.grade}
                                    color={v.myLevel ? "text-main font-bold" : ""}
                                />
                            </div>
                            <div className="m-4 flex flex-1 items-center rounded-md bg-background p-8">
                                <Typography type="SmallLabel" text={v.description} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default UserLevel;
