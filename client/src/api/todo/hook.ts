import { AxiosError } from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { addTodoResult, isReadStatus } from "@feature/Todo";

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
    return useQuery<GetResAllTodos, AxiosError, GetResAllTodos>({
        queryKey: todoKeyFactory.all({ limit, skip }),
        queryFn: () => getAllTodos({ limit, skip }),
    });
};

// 하나의 투두 상세 조회
export const useGetDetailTodo = ({ todoId }: GetReqDetailTodo) => {
    return useQuery<GetResDetailTodo, AxiosError, GetResDetailTodo, [string, GetReqDetailTodo]>({
        queryKey: todoKeyFactory.detail({ todoId }),
        queryFn: () => getDetailTodo({ todoId }),
    });
};

// 하나의 투두 상세 조회로 얻은 유저 아이디로 유저 상세 조회
export const useGetTodoOwnerUser = ({ userId }: GetReqTodoOwnerUser) => {
    return useQuery<GetResTodoOwnerUser, AxiosError, GetResTodoOwnerUser, [string, GetReqTodoOwnerUser]>({
        queryKey: todoKeyFactory.ownerUser({ userId }),
        queryFn: () => getTodoOwnerUser({ userId }),
        // useQuery의 동기처리: userId가 존재해야 해당 api 요청
        enabled: !!userId,
    });
};

// 유저 아이디로 해당 유저가 만든 모든 투두 조회하기
export const useGetAllTodosOfUser = ({ userId }: GetReqTodoOwnerUser) => {
    return useQuery<GetResAllTodos, AxiosError, GetResAllTodos, [string, GetReqTodoOwnerUser]>({
        queryKey: todoKeyFactory.allOfUser({ userId }),
        queryFn: () => getAllTodosOfUser({ userId }),
        // useQuery의 동기처리: userId가 존재해야 해당 api 요청
        enabled: !!userId,
    });
};

// 투두 추가하기
export const usePostTodos = ({ todo, completed, userId }: PostReqTodo) => {
    const navigate = useNavigate();
    const setTodoResult = useSetRecoilState(addTodoResult);
    return useMutation<PostResTodo, AxiosError>({
        mutationFn: () => postTodo({ todo, completed, userId }),
        onSuccess: (res) => {
            setTodoResult(res);
            alert("등록에 성공하였습니다");
            navigate("/todos");
        },
    });
};

// 투두 수정하기
export const usePutTodos = ({ todo, completed, todoId }: PutReqTodo) => {
    const setIsReadStatus = useSetRecoilState(isReadStatus);
    return useMutation<PutResTodo, AxiosError>({
        mutationFn: () => putTodo({ todo, completed, todoId }),
        onSuccess: () => setIsReadStatus(true),
    });
};

// 투두 삭제하기
export const useDeleteTodos = ({ todoId }: DeleteReqTodo) => {
    const navigate = useNavigate();
    return useMutation<DeleteResTodo, AxiosError>({
        mutationFn: () => deleteTodo({ todoId }),
        onSuccess: () => {
            alert("삭제되었습니다.");
            navigate("/todos");
        },
    });
};
