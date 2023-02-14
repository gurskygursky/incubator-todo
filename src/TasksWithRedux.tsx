import React, {ChangeEvent} from "react";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {TasksStateType} from "./AppWithRedux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";

type PropsType = {
    tasks: Array<TaskType>;
    todolistId: string;
}
export const TasksWithRedux = ({tasks, todolistId}: PropsType) => {

    const dispatch = useDispatch();
    // let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasksReducer[props.todolistId]);

    return (
        <ul style={{listStyle: 'none', padding: 0}} key={todolistId}>
            {
                tasks.map((t: TaskType) => {
                    const onClickHandler = () => dispatch(removeTaskAC(todolistId, t.id));
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(todolistId, t.id, newIsDoneValue));
                        // props.changeTaskStatus(props.id, t.id, newIsDoneValue);
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                        {/*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*/}
                        <EditableSpan title={t.title} callback={(title) => dispatch(changeTaskTitleAC(todolistId, t.id, title))}/>
                        {/*<span>{t.title}</span>*/}
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
    )
};