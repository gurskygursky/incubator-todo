import {AppRootStateType} from "./../../reducers/store";
import {TaskType} from "./../../TodolistWithRedux";

export const tasksSelector = (state: AppRootStateType, id: string): Array<TaskType> => state.tasksReducer[id];
