import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "@feature/Global";

import { useGetAllQuestion } from "@api/question/hook";
import { useDeleteQuestion } from "@api/question/hook";
import { useToast } from "@hook/useToast";

import Typography from "@component/Typography";
import QuestionItem from "./component/QuestionItem";
import Pagination from "@component/Pagination";
import SkeletonUi from "@component/board/SkeletonUi";
import BoardHeader from "@component/board/BoardHeader";
import HotBoard from "@component/board/HotBoard";

function Board() {
    const navigate = useNavigate();
    const { reqLoginToUserToast } = useToast();

    const isLogginedIn = useRecoilValue(isLoggedInAtom);

    // 페이지 필터
    const [curPage, setCurPage] = useState<number>(1);
    // 검색 버튼 또는 엔터를 눌렀을 때 조회하기 위한 검색 파라미터
    const [search, setSearch] = useState<string>("");
    // 검색 인풋 value 저장하기 위한 변수
    const [searchValue, setSearchValue] = useState<string>("");

    const {
        data: questions,
        isLoading,
        refetch: refetchQuestions,
    } = useGetAllQuestion({
        search: search,
        page: curPage,
        size: 10,
    });

    useEffect(() => {
        refetchQuestions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    };

    const onClickSearchHandler = () => {
        setSearch(searchValue);
    };

    const onClickRegisterHandler = () => {
        if (isLogginedIn) {
            navigate("/questions/add");
        } else {
            reqLoginToUserToast();
        }
    };

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
            <BoardHeader
                label="질문"
                searchValue={searchValue}
                onChange={onChange}
                onClickSearchHandler={onClickSearchHandler}
                onClickRegisterHandler={onClickRegisterHandler}
            />
            <div className="mt-58 flex">
                <div className="flex flex-1 flex-col border-r-1 border-borderline">
                    <div className="p-12">
                        {isLoading && (
                            <>
                                <SkeletonUi />
                                <SkeletonUi />
                                <SkeletonUi />
                            </>
                        )}
                        {!isLoading &&
                            questions?.data &&
                            Array.isArray(questions?.data) &&
                            questions.data.length > 0 &&
                            questions.data.map((v) => (
                                <QuestionItem
                                    question={v}
                                    key={v.boardId}
                                    onClickDeleteHandler={onClickDeleteHandler}
                                />
                            ))}
                        {!isLoading &&
                            questions?.data &&
                            Array.isArray(questions?.data) &&
                            questions.data.length === 0 && (
                                <div className="flex h-500 flex-col items-center justify-center">
                                    <Typography text="게시된 질문이 없습니다🥹" type="SmallLabel" styles="font-bold" />
                                    <Typography text="첫 질문을 작성해주세요!" type="SmallLabel" styles="font-bold" />
                                </div>
                            )}
                    </div>
                    {/* 임시 */}
                    <Pagination
                        curPage={curPage}
                        setCurPage={setCurPage}
                        totalPages={questions?.pageInfo.totalPages || 1}
                    />
                </div>
                <div className="hidden h-full w-300 flex-col p-8 lg:flex">
                    <Typography type="Label" text="🔥 HOT 게시글" />
                    <HotBoard board="question" />
                </div>
            </div>
        </>
    );
}

export default Board;
