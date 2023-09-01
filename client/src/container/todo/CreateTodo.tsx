import { useState } from "react";

import { usePostTodos } from "@api/todo/hook";

import Button from "@component/common/Button";
import Text from "@component/common/Text";

function CreateTodo() {
    const [todoValue, setTodoValue] = useState<string>("");

    const { mutate: postTodo } = usePostTodos({ todo: todoValue, completed: false, userId: 1 });

    return (
        <div className="flex h-500 flex-col items-center justify-center p-30">
            <div className="mb-20">
                <Text type="Label" text="할 일을 추가해주세요!" />
            </div>
            <div className="mb-40">
                <input
                    type="text"
                    value={todoValue}
                    onChange={(e) => setTodoValue(e.currentTarget.value)}
                    className="mr-16 border-1 border-slate-700"
                />
                <Button type="PROJECT" label="등록" isFullBtn={false} onClickHandler={() => postTodo()} />
            </div>
            <div>
                <Text
                    type="Description"
                    text={`dummy json api는 Post, Put, Delete 요청이 적용된 것처럼 응답을 보내지만 실제 서버에는 업데이트 되지 않습니다.`}
                />
            </div>
        </div>
    );
}

export default CreateTodo;
