import {AddTodolistType, GetListsActionType, RemoveTodolistType} from '../reducers/todolist-reducer';
import {v1} from 'uuid';
import {TasksStateType} from "../types/";
import {TaskPriorities, TaskResponseType, TaskStatuses} from "./../api/types";

const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: ActionsType | AddTodolistType | RemoveTodolistType | GetListsActionType): TasksStateType => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return {...state, [action.payload.todolistID]: []}
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map((task: TaskResponseType) =>
                    task.id === action.payload.taskID
                        ? {...task, title: action.payload.title} : task)
            }
        case 'ADD_TASK':
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId], {
                    id: v1(),
                    title: action.payload.title,
                    status: TaskStatuses.New,
                    addedDate: '',
                    order: 0,
                    completed: true,
                    deadline: '',
                    startDate: '',
                    description: '',
                    priority: TaskPriorities.Hi,
                    todoListId: action.payload.todolistId,
                }]
            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state,
                [action.payload.todolistId]:
                    state[action.payload.todolistId].map((task: TaskResponseType) => task.id === action.payload.taskID
                        ? {...task, status: action.payload.status}
                        : task)
            }
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((task: TaskResponseType) => task.id !== action.payload.taskID)
            }
        case 'REMOVE_TODOLIST': {
            let copyState = {...state};
            delete copyState[action.payload.todolistId];
            return copyState;

            // let {[action.payload.todolistId]: [], ...rest} = {...state}
            //     return rest
        }
        case 'GET_LISTS': {
            const copyState = {...state};
            action.payload.items.forEach(todolist => {
                copyState[todolist.id] = [];
            })
            return copyState;
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

export const changeTaskStatusAC = (todolistId: string, taskID: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: {
            todolistId,
            taskID,
            status,
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
