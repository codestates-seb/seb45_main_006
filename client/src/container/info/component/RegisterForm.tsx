import { useState } from "react";

import Typography from "@component/Typography";
import Dropdown from "@component/board/Dropdown";
import Button from "@component/Button";
import BoardInput from "@component/board/Input";
import BoardContent from "@component/board/BoardContent";

import { infoCategory } from "@component/mockData";
import { CATEGORY_NAME } from "@type/info/common";

function RegisterForm({
    label,
    needCategory = false,
    selectedItem,
    setSelectedItem,
    title,
    setTitle,
    content,
    setContent,
    onClickHandler,
}: {
    label: string;
    needCategory?: boolean;
    selectedItem: string;
    setSelectedItem: (v: CATEGORY_NAME | "") => void;
    title: string;
    setTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    content: string;
    setContent: (v: string) => void;
    onClickHandler: () => void;
}) {
    const [isDropDownShow, setIsDropDownShow] = useState<boolean>(false);

    return (
        <div className="m-80 flex justify-center">
            <div className="flex w-11/12 justify-center rounded-lg bg-board py-60">
                <div className="flex w-11/12 flex-col">
                    <Typography type="Heading" text={`${label} 등록`} styles="pl-10 self-baseline" />
                    {needCategory && (
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
                    )}
                    <BoardInput
                        name="title"
                        label="게시글 제목"
                        required={true}
                        placeholder="게시글 제목을 적어주세요."
                        value={title}
                        onChange={setTitle}
                        maxlength={20}
                    />
                    <BoardContent label="게시글 상세내용" required={true} content={content} setContent={setContent} />
                    <div className="flex w-full justify-center">
                        <Button type="PROJECT_POINT" styles="mt-20" isFullBtn={false} onClickHandler={onClickHandler}>
                            <Typography text="등록하기" type="Label" color="text-white" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
