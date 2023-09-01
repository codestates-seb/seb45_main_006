import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGetAllTodos } from "@api/todo/hook";
import { TODO_LIMIT_NUM } from "@type/todo/todo.req.dto";

import Button from "@component/common/Button";
import Pagination from "@component/common/Pagination";
import { TodoListTitle, TodoItem } from "@component/todo/TodoComponents";

function TodoList() {
    const navigate = useNavigate();

    // curPage: 페이지네이션 숫자 / 초기값 1
    const [curPage, setCurPage] = useState<number>(1);
    // totalItems: 데이터 총 개수 / 초기값: 0
    const [totalItems, setTotalItems] = useState<number>(0);

    // useGetAllTodos: Todo 리스트를 가져오는 useQuery hook
    // - limit: 한 페이지에 몇개를 표출할지
    // - skip: 데이터 몇개를 skip한 후의 데이터들을 보여줄지
    // 예시) curPage: 10, limit: 10, skip: 100 일 경우 id가 101부터 110까지의 데이터 응답이 도착
    const { data: allData } = useGetAllTodos({ limit: TODO_LIMIT_NUM, skip: (curPage - 1) * TODO_LIMIT_NUM });
    // allData의 타입은 GetResAllTodos | undefined 이므로 optional chaining 사용
    const todos = allData?.todos;

    // todo 리스트 응답 도착 시 데이터 총 개수 계속 업데이트 하도록 하기 위한 useEffect
    useEffect(() => {
        if (allData?.total) {
            setTotalItems(allData?.total);
        }
    }, [allData?.total]);

    return (
        <div className="flex w-full flex-col items-center p-30">
            <div className="mb-24 flex w-full justify-end rounded">
                <Button
                    type="PROJECT"
                    label="할일 추가하기"
                    isFullBtn={false}
                    onClickHandler={() => navigate("/todos/add")}
                />
            </div>
            <ul className="mb-48 w-fit">
                <TodoListTitle />
                {Array.isArray(todos) &&
                    todos.map((v) => (
                        <TodoItem key={v.id} id={v.id} userId={v.userId} todo={v.todo} completed={v.completed} />
                    ))}
            </ul>
            <Pagination curPage={curPage} setCurPage={setCurPage} totalItems={totalItems || 0} />
        </div>
    );
}

export default TodoList;
