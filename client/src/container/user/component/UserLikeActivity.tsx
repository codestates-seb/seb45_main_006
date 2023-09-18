import { useState, useEffect } from "react";
import { useGetInfoLiked, useGetQuestionLiked } from "@api/member-activity/hook";
import { useDeleteInfo } from "@api/info/hook";
import { useDeleteQuestion } from "@api/question/hook";
import { useToast } from "@hook/useToast";

import InfoItem from "@container/info/component/InfoItem";
import QuestionItem from "@container/question/component/QuestionItem";
import Pagination from "@component/Pagination";
import Typography from "@component/Typography";

const InfoOfMember = ({ memberId, type }: { memberId: number; type: "likes" | "bookmark" }) => {
    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);

    const { data: info, refetch: refetchInfo } = useGetInfoLiked({ page: curPage, likedType: type });

    useEffect(() => {
        if (info?.pageInfo.totalElements) {
            setTotalItems(info?.pageInfo.totalElements);
        }
    }, [info?.pageInfo.totalElements]);

    const { fireToast, createToast, errorToast } = useToast();
    const { mutate: deleteInfo } = useDeleteInfo();

    const onClickDeleteHandler = ({ boardId }: { boardId: number }) => {
        createToast({
            content: "해당 게시글을 삭제하시겠습니까?",
            isConfirm: true,
            callback: () => {
                deleteInfo(
                    { infoId: boardId },
                    {
                        onSuccess: () => {
                            fireToast({
                                content: "게시글이 삭제되었습니다!",
                                isConfirm: false,
                            });
                            refetchInfo();
                        },
                        onError: (err) => errorToast(err),
                    },
                );
            },
        });
    };

    return (
        <>
            <div className="w-full">
                {info?.data && Array.isArray(info?.data) && info.data.length > 0 ? (
                    info.data.map((v, i) => (
                        <>
                            <InfoItem
                                key={`member-${memberId}-info-${i}`}
                                info={v}
                                onClickDeleteHandler={onClickDeleteHandler}
                            />
                            <Pagination
                                curPage={curPage}
                                setCurPage={setCurPage}
                                totalItems={totalItems || 0}
                                size={4}
                            />
                        </>
                    ))
                ) : (
                    <div className="flex h-full flex-col items-center justify-center">
                        <Typography
                            text={`${type === "likes" ? "좋아요" : "북마크"}한 자유게시글이 없습니다.`}
                            type="Description"
                            styles="mb-8"
                        />
                    </div>
                )}
            </div>
        </>
    );
};

const QuestionOfMember = ({ memberId, type }: { memberId: number; type: "likes" | "bookmark" }) => {
    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);

    const { data: question, refetch: refetchQuestions } = useGetQuestionLiked({ page: curPage, likedType: type });

    useEffect(() => {
        if (question?.pageInfo.totalElements) {
            setTotalItems(question?.pageInfo.totalElements);
        }
    }, [question?.pageInfo.totalElements]);

    const { fireToast, createToast, errorToast } = useToast();
    const { mutate: deleteQuestion } = useDeleteQuestion();

    const onClickDeleteHandler = ({ boardId }: { boardId: number }) => {
        createToast({
            content: "해당 게시글을 삭제하시겠습니까?",
            isConfirm: true,
            callback: () => {
                deleteQuestion(
                    { questionId: boardId },
                    {
                        onSuccess: () => {
                            fireToast({
                                content: "질문이 삭제되었습니다!",
                                isConfirm: false,
                            });
                            refetchQuestions();
                        },
                        onError: (err) => errorToast(err),
                    },
                );
            },
        });
    };

    return (
        <>
            <div className="w-full">
                {question?.data && Array.isArray(question?.data) && question.data.length > 0 ? (
                    question.data.map((v, i) => (
                        <>
                            <QuestionItem
                                key={`member-${memberId}-info-${i}`}
                                question={v}
                                onClickDeleteHandler={onClickDeleteHandler}
                            />
                            <Pagination
                                curPage={curPage}
                                setCurPage={setCurPage}
                                totalItems={totalItems || 0}
                                size={4}
                            />
                        </>
                    ))
                ) : (
                    <div className="flex h-full flex-col items-center justify-center">
                        <Typography
                            text={`${type === "likes" ? "좋아요" : "북마크"}한 질문게시글이 없습니다.`}
                            type="Description"
                            styles="mb-8"
                        />
                    </div>
                )}
            </div>
        </>
    );
};

function UserLikeActivity({
    memberId,
    tab,
    type,
}: {
    memberId: number;
    tab: "project" | "study" | "info" | "question";
    type: "likes" | "bookmark";
}) {
    return (
        <div className="flex flex-1 flex-col items-center rounded-md bg-white p-12 shadow-md">
            {tab === "project" && (
                <div className="flex h-full flex-col items-center justify-center">
                    <Typography
                        text={`${type === "likes" ? "좋아요" : "북마크"}한 프로젝트가 없습니다.`}
                        type="Description"
                        styles="mb-8"
                    />
                </div>
            )}
            {tab === "study" && (
                <div className="flex h-full flex-col items-center justify-center">
                    <Typography
                        text={`${type === "likes" ? "좋아요" : "북마크"}한 스터디가 없습니다.`}
                        type="Description"
                        styles="mb-8"
                    />
                </div>
            )}
            {tab === "info" && <InfoOfMember memberId={memberId} type={type} />}
            {tab === "question" && <QuestionOfMember memberId={memberId} type={type} />}
        </div>
    );
}

export default UserLikeActivity;
