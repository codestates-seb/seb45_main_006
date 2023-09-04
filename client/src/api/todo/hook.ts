import { AxiosError, AxiosResponse } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";

import {
    getAllTodos,
    getDetailTodo,
    postTodo,
    getTodoOwnerUser,
    getAllTodosOfUser,
    putTodo,
    deleteTodo,
} from "@api/todo/api";
import { todoKeyFactory } from "@api/todo/todoKeyFactory";

import {
    GetReqAllTodos,
    GetReqDetailTodo,
    PostReqTodo,
    GetReqTodoOwnerUser,
    PutReqTodo,
    DeleteReqTodo,
} from "@type/todo/todo.req.dto";
import {
    GetResDetailTodo,
    GetResAllTodos,
    GetResTodoOwnerUser,
    PostResTodo,
    PutResTodo,
    DeleteResTodo,
} from "@type/todo/todo.res.dto";

// useQuery 타입 참고 링크: https://gusrb3164.github.io/web/2022/01/23/react-query-typescript/

// 모든 투두 리스트 조회
export const useGetAllTodos = ({ limit, skip }: GetReqAllTodos) => {
    return useQuery<AxiosResponse<GetResAllTodos>, AxiosError, GetResAllTodos>({
        queryKey: todoKeyFactory.all({ limit, skip }),
        queryFn: () => getAllTodos({ limit, skip }),
    });
};

// 하나의 투두 상세 조회
export const useGetDetailTodo = ({ todoId }: GetReqDetailTodo) => {
    return useQuery<AxiosResponse<GetResDetailTodo>, AxiosError, GetResDetailTodo, [string, GetReqDetailTodo]>({
        queryKey: todoKeyFactory.detail({ todoId }),
        queryFn: () => getDetailTodo({ todoId }),
    });
};

// 하나의 투두 상세 조회로 얻은 유저 아이디로 유저 상세 조회
export const useGetTodoOwnerUser = ({ userId }: GetReqTodoOwnerUser) => {
    return useQuery<AxiosResponse<GetResTodoOwnerUser>, AxiosError, GetResTodoOwnerUser, [string, GetReqTodoOwnerUser]>(
        {
            queryKey: todoKeyFactory.ownerUser({ userId }),
            queryFn: () => getTodoOwnerUser({ userId }),
            // useQuery의 동기처리: userId가 존재해야 해당 api 요청
            enabled: !!userId,
        },
    );
};

// 유저 아이디로 해당 유저가 만든 모든 투두 조회하기
export const useGetAllTodosOfUser = ({ userId }: GetReqTodoOwnerUser) => {
    return useQuery<AxiosResponse<GetResAllTodos>, AxiosError, GetResAllTodos, [string, GetReqTodoOwnerUser]>({
        queryKey: todoKeyFactory.allOfUser({ userId }),
        queryFn: () => getAllTodosOfUser({ userId }),
        // useQuery의 동기처리: userId가 존재해야 해당 api 요청
        enabled: !!userId,
    });
};

// 투두 추가하기
export const usePostTodos = () => {
    return useMutation<AxiosResponse<PostResTodo>, AxiosError, PostReqTodo>(postTodo);
};

// 투두 수정하기
export const usePutTodos = () => {
    return useMutation<AxiosResponse<PutResTodo>, AxiosError, PutReqTodo>(putTodo);
};

// 투두 삭제하기
export const useDeleteTodos = () => {
    return useMutation<AxiosResponse<DeleteResTodo>, AxiosError, DeleteReqTodo>(deleteTodo);
};
