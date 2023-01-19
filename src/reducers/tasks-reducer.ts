import {AddTodolistType} from '../reducers/todolist-reducer';
import {TasksStateType} from './../App';
import {TaskType} from '../Todolist';

export const tasksReducer = (state: TasksStateType, action: AddTodolistType | ChangeTaskTitleType): TasksStateType => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return {...state, [action.payload.todolistID]: []}
        case 'CHANGE_TASK_TITLE':
            return {
                ...state,
                [action.payload.todolistId1]: state[action.payload.todolistId1].map((task: TaskType) =>
                    task.id === action.payload.taskID
                        ? {...task, title: action.payload.title} : task)
            }
        default:
            return state
    }
}

export const changeTaskTitleAC = (todolistId1: string, taskID: string, title: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        payload: {
            todolistId1,
            taskID,
            title,
        }
    } as const
}

type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>;

