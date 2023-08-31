import { useNavigate } from "react-router-dom";

import { GetResDetailTodo } from "@type/todo/todo.res.dto";
import Text from "@component/common/Text";

export const TodoListTitle = () => (
    <li className="mb-20 flex">
        <div className="w-50 text-center">
            <Text type="Highlight" text="아이디" />
        </div>
        <div className="w-100 text-center">
            <Text type="Highlight" text="유저 아이디" />
        </div>
        <div className="w-600 text-center">
            <Text type="Highlight" text="할일" />
        </div>
        <div className="w-80 text-center">
            <Text type="Highlight" text="완료 여부" />
        </div>
    </li>
);

export const TodoItem = ({ id, userId, todo, completed }: GetResDetailTodo) => {
    const navigate = useNavigate();

    return (
        <li
            className="flex cursor-pointer border-b-1 border-borderline py-8 hover:bg-background"
            key={id}
            onClick={() => navigate(`/todos/${id}`)}
        >
            <div className="w-50 text-center">
                <Text type="Body" text={id.toString()} />
            </div>
            <div className="w-100 text-center">
                <Text type="Body" text={userId.toString()} />
            </div>
            <div className="w-600">
                <Text type="Body" text={todo} />
            </div>
            <div className="w-80 text-center">
                <Text type="Body" text={completed ? "✅" : ""} />
            </div>
        </li>
    );
};
