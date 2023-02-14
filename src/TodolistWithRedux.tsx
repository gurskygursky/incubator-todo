import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType, TodolistType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button/Button';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import Grid from '@mui/material/Grid/Grid';
import {Tasks} from "./Tasks";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {changeTasksFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./reducers/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";
import {TasksWithRedux} from "./TasksWithRedux";
import {tasksSelector} from "./reducers/selectors/tasks-selector";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType;
}

export const TodolistWithRedux = ({todolist}: PropsType) => {
    // let [title, setTitle] = useState("")
    // let [error, setError] = useState<string | null>(null)

    const {id, title, filter} = todolist;
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasksReducer[id]);
    const dispatch = useDispatch();


    if (filter === 'active') {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.isDone === true);
    }

    const addTask = (newTitle: string) => {
        dispatch(addTaskAC(id, newTitle));

        // props.addTask(newTitle, props.id);

    }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }
    //
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null);
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(id));
        // props.removeTodolist(props.id)
    }

    const changeTaskTitle = (taskID: string, title: string) => {
        dispatch(changeTaskTitleAC(id, taskID, title));
        // props.changeTaskTitle(props.id, taskID, title);
    }
    const changeTodolistTitle = (todolistID: string, title: string) => {
        dispatch(changeTodolistTitleAC(id, title));
        // props.changeTodolistTitle(todolistID, title);
    }

    const onAllClickHandler = () => dispatch(changeTasksFilterAC(id, 'all'));
    const onActiveClickHandler = () => dispatch(changeTasksFilterAC(id, 'active'));
    const onCompletedClickHandler = () => dispatch(changeTasksFilterAC(id, 'completed'));

    return <div>
        <h3>
            <EditableSpan title={title} callback={(title) => dispatch(changeTodolistTitleAC(id, title))}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
            {/*<button onClick={removeTodolist}>x</button>*/}
        </h3>
        <AddItemForm callback={addTask}/>
        {/*<div>*/}
        {/*    <input value={title}*/}
        {/*           onChange={onChangeHandler}*/}
        {/*           onKeyPress={onKeyPressHandler}*/}
        {/*           className={error ? "error" : ""}*/}
        {/*    />*/}
        {/*    <button onClick={addTask}>+</button>*/}
        {/*    {error && <div className="error-message">{error}</div>}*/}
        {/*</div>*/}
        <TasksWithRedux todolistId={id} tasks={tasks}/>
        {/*<ul style={{listStyle: 'none', padding: 0}} key={id}>*/}
        {/*    {*/}
        {/*        tasks.map((t: TaskType) => {*/}
        {/*            const onClickHandler = () => dispatch(removeTaskAC(id, t.id));*/}
        {/*            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {*/}
        {/*                let newIsDoneValue = e.currentTarget.checked;*/}
        {/*                dispatch(changeTaskStatusAC(id, t.id, newIsDoneValue));*/}
        {/*                // props.changeTaskStatus(props.id, t.id, newIsDoneValue);*/}
        {/*            }*/}

        {/*            return <li key={t.id} className={t.isDone ? 'is-done' : ''}>*/}
        {/*                <Checkbox onChange={onChangeHandler} checked={t.isDone}/>*/}
        {/*                /!*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*!/*/}
        {/*                <EditableSpan title={t.title} callback={(title) => dispatch(changeTaskTitleAC(id, t.id, title))}/>*/}
        {/*                /!*<span>{t.title}</span>*!/*/}
        {/*                /!*<button onClick={onClickHandler}>x</button>*!/*/}
        {/*                <IconButton aria-label="delete" onClick={onClickHandler}>*/}
        {/*                    <DeleteIcon/>*/}
        {/*                </IconButton>*/}
        {/*            </li>*/}
        {/*        })*/}
        {/*    }*/}
        {/*</ul>*/}
        <div>
            {/*<button className={props.filter === 'all' ? "active-filter" : ""}*/}
            {/*        onClick={onAllClickHandler}>All*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'active' ? "active-filter" : ""}*/}
            {/*        onClick={onActiveClickHandler}>Active*/}
            {/*</button>*/}
            {/*<button className={props.filter === 'completed' ? "active-filter" : ""}*/}
            {/*        onClick={onCompletedClickHandler}>Completed*/}
            {/*</button>*/}
            <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={filter === 'active' ? 'contained' : 'outlined'}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}
