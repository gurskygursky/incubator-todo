import {AppRootStateType} from "../reducers/store";
import { TaskType } from "../types";
export const tasksSelector = (state: AppRootStateType, id: string): TaskType[] => state.tasksReducer[id];
