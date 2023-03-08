import React, {ChangeEvent, memo} from "react";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import { TaskType } from "./types";
import {TaskResponseType} from "./api/types";

type PropsType = {
    todolistId: string;
    task: TaskResponseType;
}
export const Task: React.FC<PropsType> = memo(({todolistId, task}) => {

    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(removeTaskAC(todolistId, task.id));
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(todolistId, task.id, e.currentTarget.checked));
    };
    const callbackHandler = (title: string) => {
        dispatch(changeTaskTitleAC(todolistId, task.id, title));
    };

    return (
        <li key={task.id} className={task.status ? 'is-done' : ''}>
            <Checkbox onChange={onChangeHandler} checked={task.status}/>
            <EditableSpan title={task.title}
                          callback={callbackHandler}/>
            <IconButton aria-label="delete" onClick={onClickHandler}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
});
