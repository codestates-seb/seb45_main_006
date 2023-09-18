import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetMemberDetail } from "@api/member/hook";

import { useToast } from "@hook/useToast";
import { useCheckChat } from "@hook/useCheckChat";

import dayjs from "dayjs";

import { UserNickname } from "@component/board/UserCard";
import UserProfile from "@component/user/UserProfile";
import UserBlockModal from "./UserBlockModal";

import Typography from "@component/Typography";
import Button from "@component/Button";
import Modal from "@component/Modal";
import ProjectList from "@container/project/component/BoardList";
import StudyList from "@container/study/component/BoardList";
import { CategoryTag } from "@container/info/component/InfoItem";

import { GetResMemberDetail } from "@type/member/member.res.dto";
import { InfoDefaultType } from "@type/info/info.res.dto";
import { QuestionDefaultType } from "@type/question/question.res.dto";

import { TbDeviceDesktopCode } from "react-icons/tb";
import { PiUserFocus, PiBookOpenTextDuotone, PiChatTextDuotone, PiQuestionDuotone } from "react-icons/pi";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { GoProjectRoadmap } from "react-icons/go";

// import { BsFillShareFill } from "react-icons/bs";
import Bookmark from "@component/board/Bookmark";
import LikeBtn from "@component/board/LikeBtn";

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
        <li className="my-6 flex min-h-36 w-full items-center">
            {type === "stack" ? <TbDeviceDesktopCode size={"1.2rem"} /> : <PiUserFocus size={"1.2rem"} />}
            <div className="ml-4 mr-10 min-w-50">
                <Typography type="SmallLabel" text={type === "stack" ? "스택" : "포지션"} styles="font-bold" />
            </div>
            <div className="flex min-h-36 flex-wrap items-center">
                {arr.map((v) => (
                    <div key={v} className={`m-4 h-fit rounded-md p-4 ${background}`}>
                        <Typography type="SmallLabel" text={v} styles="font-bold" />
                    </div>
                ))}
            </div>
        </li>
    );
};

export const InfoItemHor = ({
    info,
    refetchMemberDetail,
}: {
    info: InfoDefaultType;
    refetchMemberDetail: () => void;
}) => {
    const [isLiked, setIsLiked] = useState(!!info.liked);
    const [isBookmarked, setIsBookmarked] = useState(!!info.bookmarked);

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
                    {/* <Typography text={`댓글 수 ${0}`} type="SmallLabel" color="text-gray-600" /> */}
                </div>
            </div>
            <div className="flex w-40 flex-col items-center justify-start">
                <LikeBtn board="information" boardId={info.boardId} isLiked={isLiked} setIsLiked={setIsLiked} />
                <Bookmark
                    board="information"
                    boardId={info.boardId}
                    isBookmarked={isBookmarked}
                    setIsBookmarked={setIsBookmarked}
                    refetch={refetchMemberDetail}
                />
                {/* <button>
                    <BsFillShareFill />
                </button> */}
            </div>
        </div>
    );
};

export const QuestionItemHor = ({
    question,
    refetchMemberDetail,
}: {
    question: QuestionDefaultType;
    refetchMemberDetail: () => void;
}) => {
    const [isLiked, setIsLiked] = useState(!!question.liked);
    const [isBookmarked, setIsBookmarked] = useState(!!question.bookmarked);

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
                    {/* <Typography text={`답변 수 ${0}`} type="SmallLabel" color="text-gray-600" /> */}
                </div>
            </div>
            <div className="flex w-40 flex-col items-center justify-start">
                <LikeBtn board="question" boardId={question.boardId} isLiked={isLiked} setIsLiked={setIsLiked} />
                <Bookmark
                    board="question"
                    boardId={question.boardId}
                    isBookmarked={isBookmarked}
                    setIsBookmarked={setIsBookmarked}
                    refetch={refetchMemberDetail}
                />
                {/* <button>
                    <BsFillShareFill />
                </button> */}
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
    refetchAllMembers,
}: {
    memberId: number;
    closeModal: () => void;
    isUpperOpen: boolean;
    setIsUpperOpen: (v: boolean) => void;
    setBlockedMemberId: (v: number) => void;
    refetchAllMembers: () => void;
}) {
    const navigate = useNavigate();

    const { data: user, isError, refetch: refetchMemberDetail } = useGetMemberDetail({ memberId });

    const { fireToast } = useToast();

    const { checkIsChatRoomExist, createChatRoom, enrollChatRoomHandler } = useCheckChat();

    const onClickChatBtn = () => {
        if (checkIsChatRoomExist({ memberId })) {
            createChatRoom({ memberId, nickname: user?.nickname || "" });
        }

        enrollChatRoomHandler({ nickname: user?.nickname || "" });
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
                <div className="flex min-h-350 flex-col p-30 md:flex-row">
                    <div className="flex max-w-600 flex-1 flex-col justify-between">
                        <div>
                            <UserNickname nickname={user.nickname} githubId={user.githubId} />
                            <UserInfo type="stack" user={user} />
                            <UserInfo type="position" user={user} />
                            <div className="mb-12 flex">
                                <div>
                                    <BsFileEarmarkPerson size={"1.2rem"} />
                                </div>
                                <div className="ml-4 mr-10 min-w-55">
                                    <Typography type="SmallLabel" text="자기소개" styles="font-bold" />
                                </div>
                                <Typography type="SmallLabel" text={user.introduction} />
                            </div>
                        </div>
                        <UserBtns setIsOpen={setIsUpperOpen} onClickChatBtn={onClickChatBtn} />
                    </div>
                    <div className="flex flex-1 items-center justify-center p-20">
                        <div className="max-w-300 flex-1 overflow-hidden rounded-xl">
                            <UserProfile profilePicture={user.profilePicture} size="lg" />
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
                    <div className="min-h-100 w-700">
                        {user.projectList.slice(0, 4).map((v, i) => (
                            <ProjectList key={`project-${i}`} project={v} refetch={refetchMemberDetail} />
                        ))}
                    </div>
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
                    <div className="min-h-100 w-700">
                        {user.studyList.slice(0, 4).map((v, i) => (
                            <StudyList key={`study-${i}`} study={v} refetch={refetchMemberDetail} />
                        ))}
                    </div>
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
                    <div className="min-h-100 w-700">
                        {user.infoBoardList.slice(0, 4).map((v, i) => (
                            <InfoItemHor key={`study-${i}`} info={v} refetchMemberDetail={refetchMemberDetail} />
                        ))}
                    </div>
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
                    <div className="min-h-100 w-700">
                        {user?.questionBoardList &&
                            user.questionBoardList
                                .slice(0, 4)
                                .map((v, i) => (
                                    <QuestionItemHor
                                        key={`study-${i}`}
                                        question={v}
                                        refetchMemberDetail={refetchMemberDetail}
                                    />
                                ))}
                    </div>
                </div>

                {user && isUpperOpen ? (
                    <Modal upperModal={isUpperOpen} closeModal={() => setIsUpperOpen(false)}>
                        <UserBlockModal
                            user={user}
                            closeModal={closeModal}
                            setBlockedMemberId={setBlockedMemberId}
                            refetchAllMembers={refetchAllMembers}
                        />
                    </Modal>
                ) : null}
            </>
        );
    }
}

export default UserCardModal;
