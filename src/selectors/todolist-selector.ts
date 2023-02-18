import {AppRootStateType} from "../reducers/store";
import {TodolistType} from "../types";

export const todolistSelector = (state: AppRootStateType): TodolistType[] => state.todolistReducer;
