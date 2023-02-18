import {AddTodolistType, RemoveTodolistType} from '../reducers/todolist-reducer';
import {v1} from 'uuid';
import {TaskType} from './../types';
import {TasksStateType} from "../types/";

const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: ActionsType | AddTodolistType | RemoveTodolistType): TasksStateType => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return {...state, [action.payload.todolistID]: []}
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((task: TaskType) =>
                    task.id === action.payload.taskID
                        ? {...task, title: action.payload.title} : task)
            }
        case 'ADD_TASK':
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId], {
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }]
            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map((task: TaskType) => task.id === action.payload.taskID
                        ? {...task, isDone: action.payload.isDone}
                        : task)
            }
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((task: TaskType) => task.id !== action.payload.taskID)
            }
        case 'REMOVE_TODOLIST': {
            let copyState = {...state};
            delete copyState[action.payload.todolistId];
            return copyState;

            // let {[action.payload.todolistId]: [], ...rest} = {...state}
            //     return rest
        }
        default:
            return state
    }
}

export const changeTaskTitleAC = (todolistId: string, taskID: string, title: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            todolistId,
            taskID,
            title,
        }
    } as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todolistId,
            title,
        }
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskID: string, isDone: boolean) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            todolistId,
            taskID,
            isDone,
        }
    } as const
}

export const removeTaskAC = (todolistId: string, taskID: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            todolistId,
            taskID,
        }
    } as const
}


type ActionsType = ChangeTaskTitleType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | RemoveTaskActionType

type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
