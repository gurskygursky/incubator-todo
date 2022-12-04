import {TodolistType} from './../../Todolist';
import {v1} from 'uuid';

type ActionType = {
    type: string
    [key: string]: any
}

export const listsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': {
            return state.filter((todolist: TodolistType) => todolist.id !== action.id)
        }
        case 'ADD_TODOLIST': {
            return [
                ...state, {id: v1(), title: action.title, filter: 'All'}
            ]
        }
        case 'CHANGE_TODOLIST_TITLE': {
            return state.map((todolist: TodolistType) => todolist.id === action.id ? {...todolist, title: action.title} : todolist)
        }
        case 'CHANGE_TODOLIST_FILTER': {
            return state.map((todolist: TodolistType) => todolist.id === action.id ? {...todolist, filter: action.filter} :todolist)
        }
        default:
            return state
    }
}