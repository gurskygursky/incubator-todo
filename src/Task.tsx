import React, {ChangeEvent, memo, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";

type PropsType = {
    task: TaskType;
    removeTask: (taskId: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean) => void;
    changeTaskTitle: (taskId: string, title: string) => void;
}
export const Task: React.FC<PropsType> = memo(({task, ...props}: PropsType) => {

    console.log('Task is rendered');

    const onClickHandler = useCallback(() => props.removeTask(task.id), [props.removeTask, task.id]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(task.id, e.currentTarget.checked);
    }, [props.changeTaskStatus, task.id]);

    const callbackHandler = useCallback((title: string) => {
        props.changeTaskTitle(task.id, title)
    }, [props.changeTaskTitle, task.id]);

    return (
        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox onChange={onChangeHandler} checked={task.isDone}/>
            <EditableSpan title={task.title}
                          callback={callbackHandler}/>
            <IconButton aria-label="delete" onClick={onClickHandler}>
                <DeleteIcon/>
            </IconButton>
        </li>
    );
});
