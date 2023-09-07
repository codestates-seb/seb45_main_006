import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { usePostInfo } from "@api/info/hook";
import { useToast } from "@hook/useToast";
import { useCheckEmptyInput } from "@hook/useCheckEmptyInput";

import RegisterForm from "@container/info/component/RegisterForm";
import { CATEGORY } from "@api/info/constant";
import { CATEGORY_NAME } from "@type/info/common";

function Register() {
    const navigate = useNavigate();
    const { mutate: postInfo } = usePostInfo();
    const { alertWhenEmptyFn } = useCheckEmptyInput();
    const { fireToast } = useToast();

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
                { title, content, category: CATEGORY[selectedItem] },
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
        <div>
            <RegisterForm
                label="자유 게시글"
                needCategory={true}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                title={title}
                setTitle={titleChangHandler}
                content={content}
                setContent={setContent}
                onClickHandler={onClickHandler}
            />
        </div>
    );
}

export default Register;
