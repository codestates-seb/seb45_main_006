import { useState } from "react";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import MDEditor from "@uiw/react-md-editor";
import "@component/MarkdownEditor.css";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { useGetMemberDetail } from "@api/member/hook";
import { usePostViewCount, useDeleteInfo } from "@api/info/hook";

import { useCheckUser } from "@hook/useCheckUser";
import { useCheckEmptyInput } from "@hook/useCheckEmptyInput";
import { useToast } from "@hook/useToast";

import Typography from "@component/Typography";
import Button from "@component/Button";
import { EditComment, ShowComment } from "@component/board/Comment";

import { CATEGORY_TO_NAME } from "@api/info/constant";
import { CATEGORY_TYPE } from "@type/info/common";
import { InfoDefaultType } from "@type/info/info.res.dto";

import { BsSuitHeartFill, BsFillShareFill } from "react-icons/bs";
import bookmark_unfill from "@assets/bookmark_unfill.svg";
import bookmark_fill from "@assets/bookmark_fill.svg";

const CategoryTag = ({ category }: { category: CATEGORY_TYPE }) => {
    const tag = CATEGORY_TO_NAME[category];
    return (
        <div className="w-fit rounded-sm border-1 border-gray-400 px-12 py-4">
            <Typography text={`#${tag}`} type="Highlight" color="text-gray-600" />
        </div>
    );
};

const InfoTitle = ({ info }: { info: InfoDefaultType }) => {
    const navigate = useNavigate();
    const { category, title, viewCount, modifiedAt } = info;
    const { data: user } = useGetMemberDetail({ memberId: info.memberId });
    const { isLoggedIn, isMine } = useCheckUser({ memberId: info.memberId });

    const { fireToast, createToast } = useToast();

    const [isLiked, setIsLiked] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const { mutate: deleteInfo } = useDeleteInfo();

    const onClickDeleteHandler = () => {
        createToast({
            content: "해당 게시글을 삭제하시겠습니까?",
            isConfirm: true,
            callback: () => {
                deleteInfo(
                    { infoId: info.boardId },
                    {
                        onSuccess: () => {
                            fireToast({
                                content: "게시글이 삭제되었습니다!",
                                isConfirm: false,
                            });
                            navigate("/infos");
                        },
                        onError: () => {
                            fireToast({
                                content: "게시글이 삭제에 실패하였습니다. 새로고침 후 다시 삭제 시도부탁드려요!🥹",
                                isConfirm: false,
                                isWarning: true,
                            });
                        },
                    },
                );
            },
        });
    };

    return (
        <div className="flex border-b-1 border-borderline">
            <div className="flex-1 p-8">
                <div className="flex items-center justify-between">
                    <CategoryTag category={category} />
                    {isMine && (
                        <div className="flex">
                            <Button
                                type="PROJECT_POINT"
                                styles="px-4 py-2 rounded-sm"
                                onClickHandler={() => navigate(`/infos/${info.boardId}/edit`, { state: info })}
                            >
                                <Typography text="수정" type="Description" color="text-white" />
                            </Button>
                            <Button type="WARN" styles="px-4 py-2 rounded-sm" onClickHandler={onClickDeleteHandler}>
                                <Typography text="삭제" type="Description" color="text-white" />
                            </Button>
                        </div>
                    )}
                </div>
                <div className="my-8 flex items-center justify-between">
                    <Typography text={title} type="Label" />
                    {user && (
                        <div className="flex items-center">
                            <div className="mr-8 h-36 w-36 overflow-hidden rounded border-1 border-borderline">
                                <img src={user.profilePicture} alt="" />
                            </div>
                            <Typography text={user.nickname} type="Label" />
                        </div>
                    )}
                </div>
                <div className="flex">
                    <Typography
                        text={dayjs(modifiedAt).format("YYYY-MM-DD")}
                        type="SmallLabel"
                        color="text-gray-600"
                        styles="mr-8"
                    />
                    <Typography text="|" type="SmallLabel" color="text-gray-600" styles="mr-8" />
                    <Typography text={`조회수 ${viewCount}`} type="SmallLabel" color="text-gray-600" />
                </div>
            </div>
            <div className="mb-8 flex w-50 flex-col items-center justify-end border-l-1 border-borderline">
                {isLoggedIn && (
                    <>
                        <button onClick={() => setIsLiked(!isLiked)}>
                            <BsSuitHeartFill size="1.2rem" color={isLiked ? "#FF2222" : "#E2E2E2"} />
                        </button>
                        <button onClick={() => setIsBookmarked(!isBookmarked)}>
                            <img src={isBookmarked ? bookmark_fill : bookmark_unfill} className="m-10 h-28 w-28" />
                        </button>
                    </>
                )}
                <button>
                    <BsFillShareFill />
                </button>
            </div>
        </div>
    );
};

function InfoItem({ info }: { info: InfoDefaultType }) {
    const { commentList } = info;
    const [isOpened, setIsOpened] = useState(false);
    const [comment, setComment] = useState<string>("");
    // TODO: 내 아이디와 info member 아이디가 같은지 확인
    // const [isMine, setIsMine] = useState(true);

    const { mutate: postViewCount } = usePostViewCount();

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.currentTarget.value);
    };

    // TODO: 댓글 등록 api
    const onSubmitHanlder = () => {};

    const onAddViewCount = () => {
        if (!isOpened) {
            setIsOpened(false);
            // 열기 버튼 클릭 시 - 조회수 증가 api 요청 -> 요청 성공/실패 처리 X
            postViewCount({ infoId: info.boardId });
        }
        setIsOpened(!isOpened);
    };

    return (
        <div className="border-1 border-borderline p-8">
            <InfoTitle info={info} />
            <div
                data-color-mode="light"
                className={`relative overflow-hidden border-b-1 border-borderline py-8 ${isOpened ? "" : "max-h-300"}`}
            >
                <MDEditor.Markdown source={info.content} style={{ whiteSpace: "pre-wrap" }} />
                <button className="absolute bottom-8 right-8" onClick={onAddViewCount}>
                    <Typography
                        type="SmallLabel"
                        text={`${isOpened ? "닫기" : "열기"}`}
                        color="text-blue-500 hover:text-blue-700"
                    />
                </button>
            </div>
            {isOpened && (
                <div className="p-8">
                    <Typography type="Highlight" text={`댓글 ${commentList.length}개`} />
                    {/* TODO: 로그인한 유저에게만 보이도록 */}
                    <EditComment value={comment} onChange={onChange} onSubmitHanlder={onSubmitHanlder} />
                    <div className="my-16">
                        {commentList.map((v) => (
                            <ShowComment key={v.commentId} comment={v} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default InfoItem;
