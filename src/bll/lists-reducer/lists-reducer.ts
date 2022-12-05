import {TasksFilterType, TodolistType} from './../../Todolist';
import {v1} from 'uuid';

// type ActionType = {
//     type: string
//     [key: string]: any
// }

export const listsReducer = (state: Array<TodolistType>, action: ListsReducerActionsType) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            // return state.filter((todolist: TodolistType) => todolist.id !== action.id)
            return state.filter((todolist: TodolistType) => todolist.id !== action.payload.todolistID)
        }
        case 'ADD_TODOLIST': {
            return [
                ...state, {id: v1(), title: action.payload.title, filter: 'All'}
            ]
        }
        case 'CHANGE_TODOLIST_TITLE': {
            // return state.map((todolist: TodolistType) => todolist.id === action.id ? {
            //     ...todolist,
            //     title: action.title
            // } : todolist)
            return state.map((todolist: TodolistType) => todolist.id === action.payload.todolistID ? {
                ...todolist,
                title: action.payload.title
            } : todolist)
        }
        case 'CHANGE_TODOLIST_FILTER': {
            // return state.map((todolist: TodolistType) => todolist.id === action.id ? {
            //     ...todolist,
            //     filter: action.filter
            // } : todolist)
            return state.map((todolist: TodolistType) => todolist.id === action.payload.todolistID ? {
                ...todolist,
                filter: action.payload.filter
            } : todolist)
        }
        default:
            return state
    }
}

//types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;
export type ListsReducerActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

//actions
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            todolistID,
        },
    } as const
}
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD_TODOLIST',
        payload: {
            title,
        },
    } as const
}
export const changeTodolistTitleAC = (todolistID: string, title: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            todolistID,
            title,
        },
    } as const
}
export const changeTodolistFilterAC = (todolistID: string, filter: TasksFilterType) => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            todolistID,
            filter,
        },
    } as const
}
