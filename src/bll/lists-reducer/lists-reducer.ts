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
            return state.filter((todolist: TodolistType) => todolist.id !== action.todolistID)
        }
        case 'ADD_TODOLIST': {
            return [
                ...state, {id: v1(), title: action.title, filter: 'All'}
            ]
        }
        case 'CHANGE_TODOLIST_TITLE': {
            // return state.map((todolist: TodolistType) => todolist.id === action.id ? {
            //     ...todolist,
            //     title: action.title
            // } : todolist)
            return state.map((todolist: TodolistType) => todolist.id === action.todolistID ? {
                ...todolist,
                title: action.title
            } : todolist)
        }
        case 'CHANGE_TODOLIST_FILTER': {
            // return state.map((todolist: TodolistType) => todolist.id === action.id ? {
            //     ...todolist,
            //     filter: action.filter
            // } : todolist)
            return state.map((todolist: TodolistType) => todolist.id === action.todolistID ? {
                ...todolist,
                filter: action.filter
            } : todolist)
        }
        default:
            return state
    }
}

//types
export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST',
    todolistID: string,
}
export type AddTodolistActionType = {
    type: 'ADD_TODOLIST',
    title: string,
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE',
    todolistID: string,
    title: string,
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER',
    todolistID: string,
    filter: TasksFilterType,
}
export type ListsReducerActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;

//actions
export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE_TODOLIST',
        todolistID
    }
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD_TODOLIST',
        title,
    }
}
export const changeTodolistTitleAC = (todolistID: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        todolistID,
        title,
    }
}
export const changeTodolistFilterAC = (todolistID: string, filter: TasksFilterType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE_TODOLIST_FILTER',
        todolistID,
        filter,
    }
}
