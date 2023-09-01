export type GetResDetailTodo = {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
};

export type GetResAllTodos = {
    todos: Array<GetResDetailTodo>;
    limit: number;
    skip: number;
    total: number;
};

export type GetResTodoOwnerUser = {
    id: number;
    lastName: string;
    username: string;
    email: number;
    image: string;
};

export type PostResTodo = GetResDetailTodo;
export type PutResTodo = GetResDetailTodo;

export type DeleteResTodo = {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
    isDeleted: boolean;
};
