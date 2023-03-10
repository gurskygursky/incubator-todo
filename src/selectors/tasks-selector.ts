import {AppRootStateType} from "../reducers/store";
import {TaskResponseType} from "./../api/types";

export const tasksSelector = (state: AppRootStateType, id: string): TaskResponseType[] => state.tasksReducer[id];
