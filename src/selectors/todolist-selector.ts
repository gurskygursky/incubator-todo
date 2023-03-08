import {AppRootStateType} from "../reducers/store";
import {TodolistType} from "../types";
import {TodolistResponseType} from "./../api/types";

export const todolistSelector = (state: AppRootStateType): TodolistResponseType[] => state.todolistReducer;
