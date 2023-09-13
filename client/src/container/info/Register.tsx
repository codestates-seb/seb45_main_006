import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { usePostInfo, usePatchInfo } from "@api/info/hook";
import { useToast } from "@hook/useToast";
import { useCheckValidValue } from "@hook/useCheckValidValue";
import { useCheckCurActivity } from "@hook/useCheckCurActivity";

import Typography from "@component/Typography";
import CommonBtn from "@component/CommonBtn";
import BoardInput from "@component/board/Input";
import BoardContent from "@component/board/BoardContent";
import Dropdown from "@component/board/Dropdown";

import { infoCategory } from "@component/mockData";
import { CATEGORY_TO_NAME } from "@api/info/constant";
import { CATEGORY_NAME } from "@type/info/common";
import { InfoDefaultType } from "@type/info/info.res.dto";

function Register() {
    const navigate = useNavigate();
    const location = useLocation();
    const { curActivity } = useCheckCurActivity({ location });

    const { mutate: postInfo } = usePostInfo();
    const { mutate: patchInfo } = usePatchInfo();
    const { alertWhenEmptyFn } = useCheckValidValue();
    const { fireToast } = useToast();

    const [isDropDownShow, setIsDropDownShow] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<CATEGORY_NAME | "">("");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (curActivity === "EDIT") {
            const { title: prevTitle, content: prevContent, category }: InfoDefaultType = location.state;

            setTitle(prevTitle);
            setContent(prevContent);
            setSelectedItem(CATEGORY_TO_NAME[category]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curActivity]);

    const titleChangHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const isEmpty = () => {
        const inputs = [
            { name: "카테고리", content: selectedItem },
            { name: "제목", content: title },
            { name: "상세내용", content },
        ];
        const emptyNames = alertWhenEmptyFn(inputs);
        return emptyNames.length > 0;
    };

    const onPostClickHandler = () => {
        if (isEmpty()) return;

        if (selectedItem !== "") {
            postInfo(
                { title, content, category: selectedItem || "뉴스 레터" },
                {
                    onSuccess: () => {
                        navigate("/infos");

                        fireToast({
                            content: "게시글이 등록되었습니다!",
                            isConfirm: false,
                        });
                    },
                    // TODO: 에러 분기
                    onError: (err) => {
                        console.log(err);
                        fireToast({
                            content: "게시글 등록 중 에러가 발생하였습니다🥹",
                            isConfirm: false,
                            isWarning: true,
                        });
                    },
                },
            );
        }
    };

    const onPatchClickHandler = () => {
        if (isEmpty()) return;

        patchInfo(
            { infoId: location.state.boardId, title, content, category: selectedItem || "뉴스 레터" },
            {
                onSuccess: () => {
                    navigate("/infos");

                    fireToast({
                        content: "게시글이 수정되었습니다!",
                        isConfirm: false,
                    });
                },
                // TODO: 에러 분기
                onError: (err) => {
                    console.log(err);
                    fireToast({
                        content: "게시글 수정 중 에러가 발생하였습니다🥹",
                        isConfirm: false,
                        isWarning: true,
                    });
                },
            },
        );
    };

    return (
        <div className="m-0 flex justify-center lg:m-80">
            <div className="flex w-full flex-col rounded-lg border-1 border-main  p-8 sm:px-30 sm:py-60 lg:w-11/12">
                <Typography
                    type="Heading"
                    text={`자유게시판 ${curActivity === "REGISTER" ? "등록" : "수정"}`}
                    styles="pl-10 self-baseline"
                />

                <Dropdown
                    label="카테고리"
                    required={true}
                    type="OUTLINED"
                    isDropDownShow={isDropDownShow}
                    setIsDropDownShow={setIsDropDownShow}
                    dropdownList={infoCategory}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                />
                <BoardInput
                    name="title"
                    label="게시글 제목"
                    required={true}
                    placeholder="게시글 제목을 적어주세요."
                    value={title}
                    onChange={titleChangHandler}
                    maxlength={20}
                />
                <BoardContent label="게시글 상세내용" required={true} content={content} setContent={setContent} />
                <div className="flex w-full justify-center">
                    {curActivity === "REGISTER" ? (
                        <CommonBtn size="LG" color="MAIN" styleType="FILLED" onClick={onPostClickHandler}>
                            <Typography text="등록하기" type="Label" />
                        </CommonBtn>
                    ) : (
                        <CommonBtn size="LG" color="MAIN" styleType="FILLED" onClick={onPatchClickHandler}>
                            <Typography text="수정하기" type="Label" />
                        </CommonBtn>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Register;
