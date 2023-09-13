import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetMemberDetail } from "@api/member/hook";

import { useToast } from "@hook/useToast";
import { useCheckChat } from "@hook/useCheckChat";

import dayjs from "dayjs";

import { UserNickname, UserImage } from "@component/board/UserCard";
import UserBlockModal from "./UserBlockModal";

import Typography from "@component/Typography";
import Button from "@component/Button";
import Modal from "@component/Modal";
import { CategoryTag } from "@container/info/component/InfoItem";

import { GetResMemberDetail } from "@type/member/member.res.dto";
import { CommonResProjects } from "@type/project/project.res.dto";
import { CommonResStudies } from "@type/study/study.res.dto";
import { InfoDefaultType } from "@type/info/info.res.dto";
import { QuestionDefaultType } from "@type/question/question.res.dto";

import { TbDeviceDesktopCode } from "react-icons/tb";
import { PiUserFocus, PiBookOpenTextDuotone, PiChatTextDuotone, PiQuestionDuotone } from "react-icons/pi";
import { GoProjectRoadmap } from "react-icons/go";
import { BiBookmark } from "react-icons/bi";

import { BsSuitHeartFill, BsFillShareFill } from "react-icons/bs";
import bookmark_unfill from "@assets/bookmark_unfill.svg";
import bookmark_fill from "@assets/bookmark_fill.svg";

const UserBtns = ({ setIsOpen, onClickChatBtn }: { setIsOpen: (v: boolean) => void; onClickChatBtn: () => void }) => {
    return (
        <div className="mb-20 flex w-full justify-end">
            <Button type="PROJECT_POINT" onClickHandler={onClickChatBtn}>
                <Typography type="Highlight" text="채팅하기" color="text-white" />
            </Button>
            <Button type="WARN" onClickHandler={() => setIsOpen(true)}>
                <Typography type="Highlight" text="차단하기" color="text-white" />
            </Button>
        </div>
    );
};

export const UserInfo = ({ user, type }: { user: GetResMemberDetail; type: "stack" | "position" }) => {
    const arr = Array.isArray(user[type]) ? user[type] : [];
    const background = type === "stack" ? "bg-project" : "bg-study";

    return (
        <li className="my-6 flex w-full items-center">
            {type === "stack" ? <TbDeviceDesktopCode size={"1.2rem"} /> : <PiUserFocus size={"1.2rem"} />}
            <div className="ml-4 mr-10 min-w-50">
                <Typography type="SmallLabel" text={type === "stack" ? "스택" : "포지션"} styles="font-bold" />
            </div>
            <div className="flex flex-wrap items-center">
                {arr.map((v) => (
                    <div key={v} className={`m-4 h-fit rounded-md p-4 ${background}`}>
                        <Typography type="SmallLabel" text={v} styles="font-bold" />
                    </div>
                ))}
            </div>
        </li>
    );
};

const parseDateRange = (startMonth: string, endMonth: string) => {
    const year = dayjs().format("YYYY");
    return `시작 예정일: ${year}-${dayjs(startMonth).format("MM-DD")} ~ 마감 예정일: ${year}-${dayjs(endMonth).format(
        "MM-DD",
    )}`;
};

export const TempProject = ({ project }: { project: CommonResProjects }) => {
    return (
        <div className="my-10 flex max-w-700 flex-1 rounded-md border-1 border-borderline p-10">
            <div className="flex-1">
                <div className="flex justify-between">
                    <Typography type="Label" text={project.title} />
                    <Typography
                        type="Description"
                        text={`${dayjs(project.createdAt).format("YYYY-MM-DD")}`}
                        color="text-gray-600"
                    />
                </div>
                <div className="my-10 flex">
                    <div className="mr-4 h-fit w-fit rounded-2xl bg-project px-8 py-4">
                        <Typography type="Highlight" text="Java" styles="font-bold" />
                    </div>
                    <div className="h-fit w-fit rounded-2xl bg-project px-8 py-4">
                        <Typography type="Highlight" text="Javascript" styles="font-bold" />
                    </div>
                </div>
                <Typography
                    type="Description"
                    text={parseDateRange(project.startDate, project.deadline)}
                    color="text-gray-600"
                />
            </div>
            <div className="flex w-40 items-start justify-center">
                <button className="">
                    <BiBookmark size={"1.5rem"} />
                </button>
            </div>
        </div>
    );
};

export const TempStudy = ({ study }: { study: CommonResStudies }) => (
    <div className="my-10 w-full max-w-700 rounded-md border-1 border-borderline p-10">
        <div className="flex justify-between">
            <Typography type="Label" text={study.title} />
            <BiBookmark size={"1.5rem"} />
        </div>
        <div className="my-10 flex">
            <div className="h-fit w-fit rounded-2xl bg-study px-8 py-4">
                <Typography type="Highlight" text="모집인원: 6명" styles="font-bold" />
            </div>
        </div>
        <Typography type="Description" text={`${dayjs(study.createdAt).format("YYYY-MM-DD")}`} color="text-gray-600" />
    </div>
);

export const InfoItemHor = ({ info }: { info: InfoDefaultType }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <div className="my-10 flex max-w-700 flex-1 rounded-md border-1 border-borderline p-10">
            <div className="flex-1">
                <CategoryTag category={info.category} />
                <Typography type="Label" text={info.title} styles="my-12" />
                <div className="flex">
                    <Typography
                        text={dayjs(info.modifiedAt).format("YYYY-MM-DD")}
                        type="SmallLabel"
                        color="text-gray-600"
                    />
                    <Typography text="|" type="SmallLabel" color="text-gray-600" styles="mx-8" />
                    <Typography text={`조회 수 ${info.viewCount}`} type="SmallLabel" color="text-gray-600" />
                    <Typography text="|" type="SmallLabel" color="text-gray-600" styles="mx-8" />
                    {/* TODO: 댓글 수 */}
                    <Typography text={`댓글 수 ${0}`} type="SmallLabel" color="text-gray-600" />
                </div>
            </div>
            <div className="flex w-40 flex-col items-center justify-start">
                <button onClick={() => setIsLiked(!isLiked)}>
                    <BsSuitHeartFill size="1.2rem" color={isLiked ? "#FF2222" : "#E2E2E2"} />
                </button>
                <button onClick={() => setIsBookmarked(!isBookmarked)}>
                    <img src={isBookmarked ? bookmark_fill : bookmark_unfill} className="my-10 h-28 w-28" />
                </button>
                <button>
                    <BsFillShareFill />
                </button>
            </div>
        </div>
    );
};

export const QuestionItemHor = ({ question }: { question: QuestionDefaultType }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <div className="my-10 flex max-w-700 flex-1 rounded-md border-1 border-borderline p-10">
            <div className="flex-1">
                <Typography type="Label" text={question.title} styles="my-12" />
                <div className="flex">
                    <Typography
                        text={dayjs(question.modifiedAt).format("YYYY-MM-DD")}
                        type="SmallLabel"
                        color="text-gray-600"
                    />
                    <Typography text="|" type="SmallLabel" color="text-gray-600" styles="mx-8" />
                    <Typography text={`조회 수 ${question.viewCount}`} type="SmallLabel" color="text-gray-600" />
                    <Typography text="|" type="SmallLabel" color="text-gray-600" styles="mx-8" />
                    {/* TODO: 답변수 */}
                    <Typography text={`답변 수 ${0}`} type="SmallLabel" color="text-gray-600" />
                </div>
            </div>
            <div className="flex w-40 flex-col items-center justify-start">
                <button onClick={() => setIsLiked(!isLiked)}>
                    <BsSuitHeartFill size="1.2rem" color={isLiked ? "#FF2222" : "#E2E2E2"} />
                </button>
                <button onClick={() => setIsBookmarked(!isBookmarked)}>
                    <img src={isBookmarked ? bookmark_fill : bookmark_unfill} className="my-10 h-28 w-28" />
                </button>
                <button>
                    <BsFillShareFill />
                </button>
            </div>
        </div>
    );
};

function UserCardModal({
    memberId,
    closeModal,
    isUpperOpen,
    setIsUpperOpen,
    setBlockedMemberId,
}: {
    memberId: number;
    closeModal: () => void;
    isUpperOpen: boolean;
    setIsUpperOpen: (v: boolean) => void;
    setBlockedMemberId: (v: number) => void;
}) {
    const navigate = useNavigate();

    const { data: user, isError } = useGetMemberDetail({ memberId });

    const { fireToast } = useToast();
    const { createOrEnrollChatRoom } = useCheckChat({ memberId });

    const onClickChatBtn = () => {
        createOrEnrollChatRoom({ nickname: user?.nickname || "", closeModal });
    };

    if (isError) {
        closeModal();
        fireToast({
            content: <Typography type="Highlight" text={"삭제/차단 등의 이유로 조회할 수 없는 사용자입니다!"} />,
            isConfirm: false,
        });
        return;
    }

    if (user) {
        return (
            <>
                <div className="flex flex-col p-30 md:flex-row">
                    <div className="flex max-w-600 flex-1 flex-col justify-between">
                        <div>
                            <UserNickname nickname={user.nickname} githubId={user.githubId} />
                            <UserInfo type="stack" user={user} />
                            <UserInfo type="position" user={user} />
                        </div>
                        <UserBtns setIsOpen={setIsUpperOpen} onClickChatBtn={onClickChatBtn} />
                    </div>
                    <div className="flex flex-1 items-center justify-center p-20">
                        <div className="max-w-300 flex-1 overflow-hidden rounded-xl border-1 border-borderline">
                            <UserImage nickname={user.nickname} profilePicture={user.profilePicture} />
                        </div>
                    </div>
                </div>
                <div className="p-20">
                    <div className="flex w-full max-w-700 items-center justify-between">
                        <div className="flex">
                            <GoProjectRoadmap size={"1.5rem"} />
                            <Typography
                                type="Highlight"
                                text={`${user.nickname}님이 만든 프로젝트`}
                                styles="font-bold ml-8"
                            />
                        </div>
                        <button
                            onClick={() => {
                                navigate(`/members/${memberId}?tab=project`);
                                closeModal();
                            }}
                        >
                            <Typography
                                type="Highlight"
                                text="+ 더보기"
                                styles="font-bold ml-8 pointer-cursor"
                                color="text-blue-400 hover:text-blue-700"
                            />
                        </button>
                    </div>
                    {user.projectList.slice(0, 4).map((v, i) => (
                        <TempProject key={`project-${i}`} project={v} />
                    ))}
                    <div className="mt-20 flex w-full max-w-700 items-center justify-between">
                        <div className="flex">
                            <PiBookOpenTextDuotone size={"1.5rem"} />
                            <Typography
                                type="Highlight"
                                text={`${user.nickname}님이 만든 스터디`}
                                styles="font-bold ml-8"
                            />
                        </div>
                        <button
                            onClick={() => {
                                navigate(`/members/${memberId}?tab=study`);
                                closeModal();
                            }}
                        >
                            <Typography
                                type="Highlight"
                                text="+ 더보기"
                                styles="font-bold ml-8 pointer-cursor"
                                color="text-blue-400 hover:text-blue-700"
                            />
                        </button>
                    </div>
                    {user.studyList.slice(0, 4).map((v, i) => (
                        <TempStudy key={`study-${i}`} study={v} />
                    ))}
                    <div className="mt-20 flex w-full max-w-700 items-center justify-between">
                        <div className="flex">
                            <PiChatTextDuotone size={"1.5rem"} />
                            <Typography
                                type="Highlight"
                                text={`${user.nickname}님이 작성한 자유게시글`}
                                styles="font-bold ml-8"
                            />
                        </div>
                        <button
                            onClick={() => {
                                navigate(`/members/${memberId}?tab=info`);
                                closeModal();
                            }}
                        >
                            <Typography
                                type="Highlight"
                                text="+ 더보기"
                                styles="font-bold ml-8 pointer-cursor"
                                color="text-blue-400 hover:text-blue-700"
                            />
                        </button>
                    </div>
                    {user.infoBoardList.slice(0, 4).map((v, i) => (
                        <InfoItemHor key={`study-${i}`} info={v} />
                    ))}
                    <div className="mt-20 flex w-full max-w-700 items-center justify-between">
                        <div className="flex">
                            <PiQuestionDuotone size={"1.5rem"} />
                            <Typography
                                type="Highlight"
                                text={`${user.nickname}님이 작성한 질문게시글`}
                                styles="font-bold ml-8"
                            />
                        </div>
                        <button
                            onClick={() => {
                                navigate(`/members/${memberId}?tab=question`);
                                closeModal();
                            }}
                        >
                            <Typography
                                type="Highlight"
                                text="+ 더보기"
                                styles="font-bold ml-8 pointer-cursor"
                                color="text-blue-400 hover:text-blue-700"
                            />
                        </button>
                    </div>
                    {user.questionList.slice(0, 4).map((v, i) => (
                        <QuestionItemHor key={`study-${i}`} question={v} />
                    ))}
                </div>

                {user && isUpperOpen ? (
                    <Modal upperModal={isUpperOpen} closeModal={() => setIsUpperOpen(false)}>
                        <UserBlockModal user={user} closeModal={closeModal} setBlockedMemberId={setBlockedMemberId} />
                    </Modal>
                ) : null}
            </>
        );
    }
}

export default UserCardModal;
