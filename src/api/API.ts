import axios from "axios";
import {TodolistResponseType, ResponseType} from "./types";

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
}
