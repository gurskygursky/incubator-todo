import React, {ChangeEvent} from "react";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";

type PropsType = {
    tasks: Array<TaskType>;
    todolistId: string
    removeTask: (todolistId: string, taskId: string) => void;
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void;
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
}
export const Tasks = (props: PropsType) => {

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasksReducer[props.todolistId]);

    return (
        <ul style={{listStyle: 'none', padding: 0}} key={props.todolistId}>
            {
                tasks.map((t: TaskType) => {
                    const onClickHandler = () => props.removeTask(props.todolistId, t.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(props.todolistId, t.id, newIsDoneValue);
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title}
                                      callback={(title) => props.changeTaskTitle(props.todolistId, t.id, title)}/>
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
    );
};
