import {TodolistType} from './../App';

export const todolistReducer = (state: TodolistType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE_TODOLIST': return state.filter(td => td.id !== action.payload.todolistId1)
        default: return state
    }
}

export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: 'REMOVE_TODOLIST',
        payload: {
            todolistId1,
        }
    } as const
}

type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type ActionType = RemoveTodolistType;