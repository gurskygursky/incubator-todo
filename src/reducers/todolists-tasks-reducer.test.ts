import {tasksReducer} from "./tasks-reducer"
import {addTodolistAC, todolistReducer} from "./todolist-reducer"
import {TasksStateType} from "../types";
import {TodolistEntityType} from "./../api/types";

test('ids should be equals', () => {

    const startTasksState: TasksStateType = {};
    const startTodolistsState: TodolistEntityType[] = [];

    const action = addTodolistAC('new todolist');

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolistID);
    expect(idFromTodolists).toBe(action.payload.todolistID);
    expect(idFromTasks).toEqual(idFromTodolists);
});
