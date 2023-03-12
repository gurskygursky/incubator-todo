import axios from "axios";
import {TodolistResponseType, ResponseType, TaskResponseType, UpdateTaskModelType, GetTasksResponseType} from "./types";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': '7933de6b-6016-40ed-bd74-54247c2003f2',
    },
});

export const todolistAPI = {
    getLists() {
        return instance.get<Array<TodolistResponseType>>(`todo-lists`)
            .then((response: any) => response.data)
    },
    createList(title: string) {
        return instance.post<ResponseType<{ item: TodolistResponseType }>>(`todo-lists`, {title})
            .then((response) => response.data)

    },
    deleteList(todolistId: string) {
        return instance.delete<ResponseType<{ item: TodolistResponseType }>>(`todo-lists/${todolistId}`)
            .then((response) => response.data)

    },
    updateTitle(todolistId: string, title: string) {
        return instance.put<ResponseType<{ item: TodolistResponseType }>>(`todo-lists/${todolistId}`, {title})
            .then((response) => response.data)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskResponseType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, tasksId: string, UpdateTaskModel: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskResponseType }>>(`todo-lists/${todolistId}/tasks/${tasksId}`, UpdateTaskModel)
    },
    removeTask(todolistId: string, tasksId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${tasksId}`)
    },
}
