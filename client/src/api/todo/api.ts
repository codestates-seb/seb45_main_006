import { todoTestApi } from "@api/common/todoTestApi";
import { COMMON_API_PATH } from "@api/constant";

import {
    GetReqAllTodos,
    GetReqDetailTodo,
    PostReqTodo,
    GetReqTodoOwnerUser,
    PutReqTodo,
    DeleteReqTodo,
} from "@type/todo/todo.req.dto";

// 모든 투두 리스트 조회
export const getAllTodos = async ({ limit, skip }: GetReqAllTodos) => {
    const url = `${COMMON_API_PATH.TODO.PATH}?limit=${limit}&skip=${skip}`;
    const { data } = await todoTestApi.get(url);
    return data;
};

// 하나의 투두 상세 조회
export const getDetailTodo = async ({ todoId }: GetReqDetailTodo) => {
    const url = `${COMMON_API_PATH.TODO.PATH}/${todoId}`;
    const { data } = await todoTestApi.get(url);
    return data;
};

// 하나의 투두 상세 조회로 얻은 유저 아이디로 유저 상세 조회
export const getTodoOwnerUser = async ({ userId }: GetReqTodoOwnerUser) => {
    const url = `${COMMON_API_PATH.USER.PATH}/${userId}`;
    const { data } = await todoTestApi.get(url);
    return data;
};

// 유저 아이디로 해당 유저가 만든 모든 투두 조회하기
export const getAllTodosOfUser = async ({ userId }: GetReqTodoOwnerUser) => {
    const url = `${COMMON_API_PATH.USER.PATH}/${userId}${COMMON_API_PATH.TODO.PATH}`;
    const { data } = await todoTestApi.get(url);
    return data;
};

// 투두 추가하기
export const postTodo = async (requsetObj: PostReqTodo) => {
    const url = `${COMMON_API_PATH.TODO.ADD}`;
    const { data } = await todoTestApi.post(url, requsetObj);
    return data;
};

// 투두 수정하기
export const putTodo = async ({ todoId, ...requsetObj }: PutReqTodo) => {
    const url = `${COMMON_API_PATH.USER.PATH}/${todoId}`;
    const { data } = await todoTestApi.put(url, requsetObj);
    return data;
};

// 투두 삭제하기
export const deleteTodo = async ({ todoId }: DeleteReqTodo) => {
    const url = `${COMMON_API_PATH.TODO.PATH}/${todoId}`;
    const { data } = await todoTestApi.delete(url);
    return data;
};
