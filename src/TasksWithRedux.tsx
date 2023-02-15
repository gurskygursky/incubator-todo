import React, {ChangeEvent} from "react";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";

type PropsType = {
    tasks: Array<TaskType>;
    todolistId: string;
}
export const TasksWithRedux = ({tasks, todolistId}: PropsType) => {

    const dispatch = useDispatch();

    return (
        <ul style={{listStyle: 'none', padding: 0}} key={todolistId}>
            {
                tasks.map((t: TaskType) => {
                    const onClickHandler = () => dispatch(removeTaskAC(todolistId, t.id));
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeTaskStatusAC(todolistId, t.id, e.currentTarget.checked));
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title}
                                      callback={(title) => dispatch(changeTaskTitleAC(todolistId, t.id, title))}/>
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
    );
};
