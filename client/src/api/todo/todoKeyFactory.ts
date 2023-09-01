import { GetReqAllTodos, GetReqDetailTodo, GetReqTodoOwnerUser } from "@type/todo/todo.req.dto";

export const todoKeyFactory = {
    all: ({ limit, skip }: GetReqAllTodos): [string, GetReqAllTodos] => ["todos", { limit, skip }],
    detail: ({ todoId }: GetReqDetailTodo): [string, GetReqDetailTodo] => ["todos", { todoId }],
    ownerUser: ({ userId }: GetReqTodoOwnerUser): [string, GetReqTodoOwnerUser] => ["todoOwner", { userId }],
    allOfUser: ({ userId }: GetReqTodoOwnerUser): [string, GetReqTodoOwnerUser] => ["todoOfUser", { userId }],
};
