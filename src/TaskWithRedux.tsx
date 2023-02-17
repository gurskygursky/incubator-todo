import React, {ChangeEvent, memo, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import {EditableSpan} from "./components/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {tasksSelector} from "./reducers/selectors";
import {AppRootStateType} from "./reducers/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";

type PropsType = {
    todolistId: string;
    task: TaskType;
}
export const TaskWithRedux: React.FC<PropsType> = memo(({todolistId, task}: PropsType) => {

    console.log('Task is rendered');

    const dispatch = useDispatch();

    // const onClickHandler = useCallback(() => props.removeTask(task.id), [props.removeTask, task.id]);
    const onClickHandler = () => {
        dispatch(removeTaskAC(todolistId, task.id));
    }
    //
    // const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    //     props.changeTaskStatus(task.id, e.currentTarget.checked);
    // }, [props.changeTaskStatus, task.id]);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(todolistId, task.id, e.currentTarget.checked));
    };
    //
    // const callbackHandler = useCallback((title: string) => {
    //     props.changeTaskTitle(task.id, title)
    // }, [props.changeTaskTitle, task.id]);
    const callbackHandler = (title: string) => {
        dispatch(changeTaskTitleAC(todolistId, task.id, title));
    };

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
