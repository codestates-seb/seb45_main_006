import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";
import MDEditor from "@uiw/react-md-editor";
import "@component/MarkdownEditor.css";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { usePostViewCount } from "@api/info/hook";
import { usePostComment, useGetComment } from "@api/comment/hook";

import { useCheckUser } from "@hook/useCheckUser";
import { useCheckValidValue } from "@hook/useCheckValidValue";
import { useToast } from "@hook/useToast";

import Typography from "@component/Typography";
import CommonBtn from "@component/CommonBtn";
import { EditComment, ShowComment } from "@component/board/Comment";
import UserProfile from "@component/user/UserProfile";
import Bookmark from "@component/board/Bookmark";

import { CATEGORY_TO_NAME } from "@api/info/constant";
import { CATEGORY_TYPE } from "@type/info/common";
import { InfoDefaultType } from "@type/info/info.res.dto";

// import { BsFillShareFill } from "react-icons/bs";
import Pagination from "@component/Pagination";
import LikeBtn from "@component/board/LikeBtn";

export const CategoryTag = ({ category }: { category: CATEGORY_TYPE }) => {
    const tag = CATEGORY_TO_NAME[category];
    return (
        <div className="w-fit rounded-sm border-1 border-gray-400 px-12 py-4">
            <Typography text={`#${tag}`} type="Highlight" color="text-gray-600" />
        </div>
    );
};

const InfoTitle = ({
    info,
    onClickDeleteHandler,
}: {
    info: InfoDefaultType;
    onClickDeleteHandler: ({ boardId }: { boardId: number }) => void;
}) => {
    const navigate = useNavigate();
    const { category, title, viewCount, modifiedAt } = info;
    const { isLoggedIn, isMine } = useCheckUser({ memberId: info.memberId });

    const [isLiked, setIsLiked] = useState(info.liked);
    const [isBookmarked, setIsBookmarked] = useState(info.bookmarked);

    const onClickEditHandelr = () => navigate(`/infos/${info.boardId}/edit`, { state: info });

    return (
        <div className="flex border-b-1 border-borderline">
            <div className="flex-1 p-8">
                <div className="flex items-center justify-between">
                    <CategoryTag category={category} />
                    {isMine && (
                        <div className="flex">
                            <CommonBtn size="SM" color="MAIN" onClick={onClickEditHandelr}>
                                <Typography text="수정" type="Description" />
                            </CommonBtn>
                            <CommonBtn
                                size="SM"
                                color="MAIN"
                                styleType="FILLED"
                                onClick={() => onClickDeleteHandler({ boardId: info.boardId })}
                            >
                                <Typography text="삭제" type="Description" />
                            </CommonBtn>
                        </div>
                    )}
                </div>
                <div className="my-8 flex items-center justify-between">
                    <Typography text={title} type="Label" />

                    <div className="flex items-center">
                        <UserProfile size="sm" profilePicture={info.profilePicture} />
                        <Typography text={info.nickname} type="Label" />
                    </div>
                </div>
                <div className="flex">
                    <Typography text={dayjs(modifiedAt).format("YYYY-MM-DD")} type="SmallLabel" color="text-gray-600" />
                    <Typography text="|" type="SmallLabel" color="text-gray-600" styles="mx-8" />
                    <Typography text={`조회수 ${viewCount}`} type="SmallLabel" color="text-gray-600" />
                    <Typography text="|" type="SmallLabel" color="text-gray-600" styles="mx-8" />
                    {/* TODO: 댓글 수  */}
                    {/* <Typography text={`댓글 수 ${0}`} type="SmallLabel" color="text-gray-600" /> */}
                </div>
            </div>
            <div className="mb-8 flex w-50 flex-col items-center justify-center border-l-1 border-borderline">
                {isLoggedIn && (
                    <>
                        <LikeBtn board="information" boardId={info.boardId} isLiked={isLiked} setIsLiked={setIsLiked} />
                        <Bookmark
                            board="information"
                            boardId={info.boardId}
                            isBookmarked={isBookmarked}
                            setIsBookmarked={setIsBookmarked}
                            refetch={() => {}}
                        />
                    </>
                )}
                {/* <button>
                    <BsFillShareFill />
                </button> */}
            </div>
        </div>
    );
};

function InfoItem({
    info,
    onClickDeleteHandler,
    isDetail = false,
}: {
    info: InfoDefaultType;
    onClickDeleteHandler: ({ boardId }: { boardId: number }) => void;
    isDetail?: boolean;
}) {
    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);

    const { data: commentList, refetch: refetchComment } = useGetComment({
        board: "information",
        boardId: info.boardId,
        page: curPage,
        size: 4,
    });

    useEffect(() => {
        if (commentList && commentList?.pageInfo.totalElements) {
            setTotalItems(commentList?.pageInfo.totalElements);
        }
    }, [commentList]);

    const { isLoggedIn } = useCheckUser({ memberId: info.memberId });
    const { fireToast, errorToast } = useToast();

    const [isOpened, setIsOpened] = useState(isDetail);
    const [comment, setComment] = useState<string>("");

    const { mutate: postViewCount } = usePostViewCount();
    const { mutate: postComment } = usePostComment();

    const { alertWhenEmptyFn } = useCheckValidValue();

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.currentTarget.value);
    };

    const onSubmitHanlder = () => {
        const inputs = [{ name: "댓글", content: comment }];
        const emptyNames = alertWhenEmptyFn(inputs);

        if (emptyNames.length === 0) {
            postComment(
                { board: "information", boardId: info.boardId, content: comment },
                {
                    onSuccess: () => {
                        fireToast({
                            content: "댓글이 등록되었습니다!",
                            isConfirm: false,
                        });
                        setComment("");
                        refetchComment();
                    },

                    onError: (err) => errorToast(err),
                },
            );
        }
    };

    const onAddViewCount = () => {
        if (!isOpened) {
            // 열기 버튼 클릭 시 - 조회수 증가 api 요청 -> 요청 성공/실패 처리 X
            postViewCount({ infoId: info.boardId });
        }
        setIsOpened(!isOpened);
    };

    return (
        <div className="mb-32 border-1 border-borderline p-8">
            <InfoTitle info={info} onClickDeleteHandler={onClickDeleteHandler} />
            <div
                data-color-mode="light"
                className={`relative overflow-hidden border-b-1 border-borderline p-8 pb-32 ${
                    isOpened ? "" : "max-h-300"
                }`}
            >
                <MDEditor.Markdown source={info.content} style={{ whiteSpace: "pre-wrap" }} />
                <button className="absolute bottom-8 right-8" onClick={onAddViewCount}>
                    <Typography
                        type="SmallLabel"
                        text={`${isOpened ? "닫기" : "내용 열기"}`}
                        color="text-blue-500 hover:text-blue-800"
                    />
                </button>
            </div>
            {isOpened && (
                <div className="p-8">
                    <Typography type="Highlight" text={`댓글 ${commentList?.data?.length || 0}개`} />
                    {isLoggedIn && (
                        <EditComment value={comment} onChange={onChange} onSubmitHanlder={onSubmitHanlder} />
                    )}
                    <div className="my-16">
                        {commentList?.data &&
                            Array.isArray(commentList.data) &&
                            commentList.data.map((v) => (
                                <ShowComment
                                    key={v.commentId}
                                    comment={v}
                                    writerId={info.memberId}
                                    refetchComment={refetchComment}
                                />
                            ))}
                        <Pagination curPage={curPage} setCurPage={setCurPage} totalItems={totalItems || 0} size={4} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default InfoItem;
