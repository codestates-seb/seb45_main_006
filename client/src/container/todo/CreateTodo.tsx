import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSetRecoilState } from "recoil";
import { addTodoResult } from "@feature/Todo";
import { usePostTodos } from "@api/todo/hook";

import Button from "@component/Button";
import Typography from "@component/Typography";

function CreateTodo() {
    const navigate = useNavigate();

    const [todoValue, setTodoValue] = useState<string>("");
    const setTodoResult = useSetRecoilState(addTodoResult);

    const { mutate: postTodo } = usePostTodos();

    const addTodoHandler = () => {
        if (!todoValue) {
            alert("할 일을 입력해주세요!");
            return;
        }

        postTodo(
            { todo: todoValue, completed: false, userId: 1 },
            {
                onSuccess: (res) => {
                    setTodoResult(res.data);
                    alert("등록에 성공하였습니다.");
                    navigate("/todos");
                },
                onError: (err) => {
                    console.log(err);
                },
            },
        );
    };

    return (
        <div className="flex h-500 flex-col items-center justify-center p-30">
            <div className="mb-20">
                <Typography type="Label" text="할 일을 추가해주세요!" />
            </div>
            <div className="mb-40">
                <input
                    type="text"
                    value={todoValue}
                    onChange={(e) => setTodoValue(e.currentTarget.value)}
                    className="border-slate-700 mr-16 border-1"
                />
                <Button type="PROJECT" isFullBtn={false} onClickHandler={addTodoHandler}>
                    <Typography text="등록" type="Body" />
                </Button>
            </div>
            <div>
                <Typography
                    type="Description"
                    text={`dummy json api는 Post, Put, Delete 요청이 적용된 것처럼 응답을 보내지만 실제 서버에는 업데이트 되지 않습니다.`}
                />
            </div>
        </div>
    );
}

export default CreateTodo;
