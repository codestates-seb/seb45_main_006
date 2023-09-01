export const TODO_LIMIT_NUM = 10 as const;

export type GetReqAllTodos = {
    limit: number;
    skip: number;
};

export type GetReqDetailTodo = {
    todoId: number;
};

export type GetReqTodoOwnerUser = {
    userId?: number;
};

export type PostReqTodo = {
    todo: string;
    completed: boolean;
    userId: number;
};

export type PutReqTodo = {
    todoId: number;
    todo: string;
    completed: boolean;
};

export type DeleteReqTodo = {
    todoId: number;
};
