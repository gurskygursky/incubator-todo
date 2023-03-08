import {FilterValuesType} from "./../types";

export type TodolistResponseType = {
    id: string;
    title: string;
    addedDate: Nullable<string>;
    order: Nullable<number>;
}
export type TodolistEntityType = TodolistResponseType & {filter: FilterValuesType};

export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

export type Nullable<T> = T | null;

export enum TaskStatuses {
    New ,
    InProgress,
    Completed,
    Draft,
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later,

}

export type TaskResponseType = {
    description: Nullable<string>;
    title: string;
    completed: boolean;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: Nullable<number>;
    addedDate: string;
}

export type TasksResponseType = {
    items: Array<TaskResponseType>;
    totalCount: Nullable<number>;
    error: Nullable<string>;
};