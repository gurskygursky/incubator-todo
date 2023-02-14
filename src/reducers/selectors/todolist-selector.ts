import {AppRootStateType} from "./../../reducers/store";
import {TodolistType} from "./../../AppWithRedux";

export const todolistSelector = (state: AppRootStateType): TodolistType[] => state.todolistReducer;
