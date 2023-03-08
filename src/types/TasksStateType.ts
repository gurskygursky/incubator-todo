import {TaskType} from "../types/TaskType";
import {TasksResponseType} from "./../api/types";

export type TasksStateType = {
    [key: string]: TasksResponseType[]
}
