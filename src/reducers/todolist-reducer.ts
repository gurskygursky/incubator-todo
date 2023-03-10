import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from "../types";
import {ResponseType, TodolistEntityType, TodolistResponseType} from "./../api/types";
import {AppRootStateType} from "./../reducers/store";
import {todolistAPI} from "./../api/API";
import { ThunkAction } from 'redux-thunk';

const initialState: TodolistEntityType[] = [];

export const todolistReducer = (state = initialState, action: ActionType): TodolistEntityType[] => {
    switch (action.type) {
        case 'REMOVE_TODOLIST':
            return state.filter(td => td.id !== action.payload.todolistId)
        case 'ADD_TODOLIST':
            const newTodolist: TodolistEntityType = {
                id: action.payload.todolistID,
                title: action.payload.title,
                filter: "all",
                addedDate: null,
                order: null,
            };
            return [...state, newTodolist]
        case 'CHANGE_TASKS_FILTER':
            return state.map(td => td.id === action.payload.todolistId ? {...td, filter: action.payload.filter} : td);
        case 'CHANGE_TODOLIST_TITLE':
            return state.map(td => td.id === action.payload.todolistId ? {...td, title: action.payload.title} : td);
        case 'GET_LISTS':
            return [...state]
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

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            todolistId,
        }
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            todolistId,
            title,
        }
    } as const
}
export const changeTasksFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE_TASKS_FILTER',
        payload: {
            todolistId,
            filter,
        }
    } as const
}
export const getListsAC = (items: TodolistResponseType[]) => {
    return {
        type: 'GET_LISTS',
        payload: {items}
    } as const
}

export const getListsThunk = (): ThunkAction<Promise<void>, AppRootStateType, unknown, ActionType> =>
    (dispatch) => {
        return todolistAPI.getLists()
            .then((data: ResponseType<TodolistResponseType[]>) => {
                if (data.resultCode === 0) {
                    console.log(data.data)
                    dispatch(getListsAC(data.data));
                }
            })

    }

export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
type ChangeTasksFilterActionType = ReturnType<typeof changeTasksFilterAC>;
type GetListsActionType = ReturnType<typeof getListsAC>;

export type ActionType = RemoveTodolistType | ChangeTodolistTitleType | AddTodolistType| ChangeTasksFilterActionType
    | GetListsActionType;
