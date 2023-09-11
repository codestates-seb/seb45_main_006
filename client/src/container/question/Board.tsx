import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "@feature/Global";

import { useGetAllQuestion } from "@api/question/hook";
import { useToast } from "@hook/useToast";

import Button from "@component/Button";
import Typography from "@component/Typography";
import SearchInput from "@component/board/SearchInput";
import QuestionItem from "./component/QuestionItem";

function Board() {
    const navigate = useNavigate();
    const { reqLoginToUserToast } = useToast();

    const isLogginedIn = useRecoilValue(isLoggedInAtom);

    // 검색 버튼 또는 엔터를 눌렀을 때 조회하기 위한 검색 파라미터
    const [search, setSearch] = useState<string>("");
    // 검색 인풋 value 저장하기 위한 변수
    const [searchValue, setSearchValue] = useState<string>("");

    const { data: questions } = useGetAllQuestion({
        search: search,
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    };

    const onClickSearchHandler = () => {
        if (searchValue !== "") {
            setSearch(searchValue);
        }
    };

    const onClickRegisterHandler = () => {
        if (isLogginedIn) {
            navigate("/questions/add");
        } else {
            reqLoginToUserToast();
        }
    };

    return (
        <>
            <div className="fixed z-10 flex w-full max-w-screen-xl justify-end bg-white p-8">
                <div className="mr-12 w-200">
                    <SearchInput
                        value={searchValue}
                        onChange={onChange}
                        placeholder="질문게시판 검색"
                        onClickSearchHandler={onClickSearchHandler}
                    />
                </div>
                <Button type="QUESTION_POINT" onClickHandler={onClickRegisterHandler}>
                    <Typography type="Highlight" text="자유게시글 등록" />
                </Button>
            </div>
            <div className="mt-58 flex">
                <div className="flex flex-1 flex-col border-r-1 border-borderline">
                    <div className="p-12">
                        {Array.isArray(questions) &&
                            questions.map((v) => <QuestionItem question={v} key={v.boardId} />)}
                    </div>
                </div>
                <div className="hidden h-full w-300 flex-col p-8 lg:flex">
                    <Typography type="Label" text="🔥 HOT 게시글" />
                </div>
            </div>
        </>
    );
}

export default Board;
