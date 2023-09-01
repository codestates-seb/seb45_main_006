import { todoTestApi } from "@api/common/todoTestApi";

import {
    GetReqAllTodos,
    GetReqDetailTodo,
    PostReqTodo,
    GetReqTodoOwnerUser,
    PutReqTodo,
    DeleteReqTodo,
} from "@type/todo/todo.req.dto";

// 모든 투두 리스트 조회
export const getAllTodos = ({ limit, skip }: GetReqAllTodos) => {
    const method = "GET";
    const path = `/todos?limit=${limit}&skip=${skip}`;
    return todoTestApi({ method, path });
};

// 하나의 투두 상세 조회
export const getDetailTodo = ({ todoId }: GetReqDetailTodo) => {
    const method = "GET";
    const path = `/todos/${todoId}`;
    return todoTestApi({ method, path });
};

// 하나의 투두 상세 조회로 얻은 유저 아이디로 유저 상세 조회
export const getTodoOwnerUser = ({ userId }: GetReqTodoOwnerUser) => {
    const method = "GET";
    const path = `/users/${userId}`;
    return todoTestApi({ method, path });
};

// 유저 아이디로 해당 유저가 만든 모든 투두 조회하기
export const getAllTodosOfUser = ({ userId }: GetReqTodoOwnerUser) => {
    const method = "GET";
    const path = `/users/${userId}/todos`;
    return todoTestApi({ method, path });
};

// 투두 추가하기
export const postTodo = ({ todo, completed, userId }: PostReqTodo) => {
    const method = "POST";
    const path = "/todos/add";
    const data = { todo, completed, userId };
    return todoTestApi({ method, path, data });
};

// 투두 수정하기
export const putTodo = ({ todoId, todo, completed }: PutReqTodo) => {
    const method = "PUT";
    const path = `/todos/${todoId}`;
    const data = { todo, completed };
    return todoTestApi({ method, path, data });
};

// 투두 삭제하기
export const deleteTodo = ({ todoId }: DeleteReqTodo) => {
    const method = "DELETE";
    const path = `/todos/${todoId}`;
    return todoTestApi({ method, path });
};
