import {v1} from 'uuid';
import {TodolistType} from './../App';

export const todolistReducer = (state: TodolistType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(td => td.id !== action.payload.todolistId1)
        case 'ADD_TODOLIST':
            const newTodolist: TodolistType = {id: action.payload.todolistID, title: action.payload.title, filter: 'all'};
            return [...state, newTodolist]
        default:
            return state
    }
}
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            todolistID: v1(),
            title,
        }
    } as const
}

export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            todolistId1,
        }
    } as const
}

export const changeTodolistTitleAc = (todolistId1: string, title: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            todolistId1,
            title,
        }
    } as const
}

type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAc>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type ActionType = RemoveTodolistType | ChangeTodolistTitleType | AddTodolistType;