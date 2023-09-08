import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePostInfo } from "@api/info/hook";
import { useToast } from "@hook/useToast";
import { useCheckEmptyInput } from "@hook/useCheckEmptyInput";

import Typography from "@component/Typography";
import Button from "@component/Button";
import BoardInput from "@component/board/Input";
import BoardContent from "@component/board/BoardContent";
import Dropdown from "@component/board/Dropdown";

import { infoCategory } from "@component/mockData";
import { CATEGORY_TO_ENUM } from "@api/info/constant";
import { CATEGORY_NAME } from "@type/info/common";

function Register() {
    const navigate = useNavigate();
    const { mutate: postInfo } = usePostInfo();
    const { alertWhenEmptyFn } = useCheckEmptyInput();
    const { fireToast } = useToast();

    const [isDropDownShow, setIsDropDownShow] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<CATEGORY_NAME | "">("");

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const titleChangHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onClickHandler = () => {
        const inputs = [
            { name: "카테고리", content: selectedItem },
            { name: "제목", content: title },
            { name: "상세내용", content },
        ];
        const emptyNames = alertWhenEmptyFn(inputs);
        if (emptyNames.length > 0) {
            return;
        }

        if (selectedItem !== "") {
            postInfo(
                { title, content, category: CATEGORY_TO_ENUM[selectedItem] },
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

    return (
        <div className="m-0 flex justify-center lg:m-80">
            <div className="flex w-full flex-col rounded-lg bg-info p-8 sm:px-30 sm:py-60 lg:w-11/12">
                <Typography type="Heading" text="자유게시판 등록" styles="pl-10 self-baseline" />

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
                    <Button type="INFO_POINT" styles="mt-20" isFullBtn={false} onClickHandler={onClickHandler}>
                        <Typography text="등록하기" type="Label" color="text-white" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Register;
