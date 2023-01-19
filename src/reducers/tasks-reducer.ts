import {AddTodolistType} from '../reducers/todolist-reducer';
import {TasksStateType} from './../App';

export const tasksReducer = (state: TasksStateType, action: AddTodolistType): TasksStateType => {
    switch (action.type) {
        case 'ADD_TODOLIST':
            return {...state, [action.payload.todolistID]: []}
        default:
            return state
    }
}



