import {AddTodolistType} from '../reducers/todolist-reducer';
import {TasksStateType} from './../App';
import {TaskType} from '../Todolist';
import {v1} from 'uuid';

export const tasksReducer = (state: TasksStateType, action: AddTodolistType | ChangeTaskTitleType | AddTaskActionType | changeTaskStatusActionType): TasksStateType => {
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
                [action.payload.todolistId1]: [...state[action.payload.todolistId1], {
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

export const addTaskAC = (title: string, todolistId1: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            title,
            todolistId1,
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

type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;

