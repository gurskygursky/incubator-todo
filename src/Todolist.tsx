import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button/Button';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import Grid from '@mui/material/Grid/Grid';
import {Tasks} from "./Tasks";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export function Todolist(props: PropsType) {
    // let [title, setTitle] = useState("")
    // let [error, setError] = useState<string | null>(null)

    const addTask = (newTitle: string) => {

        props.addTask(newTitle, props.id);

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

    const removeTodolist = () => props.removeTodolist(props.id)

    const changeTaskTitle = (taskID: string, title: string) => {
        props.changeTaskTitle(props.id, taskID, title);
    }
    const changeTodolistTitle = (todolistID: string, title: string) => {
        props.changeTodolistTitle(todolistID, title);
    }

    const onAllClickHandler = () => props.changeFilter(props.id, 'all');
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active');
    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed');

    return <div>
        <h3>
            <EditableSpan title={props.title} callback={(title) => changeTodolistTitle(props.id, title)}/>
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
        <Tasks
            // tasks={props.tasks}
               todolistId={props.id}
               removeTask={props.removeTask}
               changeTaskStatus={props.changeTaskStatus}
               changeTaskTitle={props.changeTaskTitle}/>
        {/*<ul style={{listStyle: 'none', padding: 0}} key={props.id}>*/}
        {/*    {*/}
        {/*        props.tasks.map((t: TaskType) => {*/}
        {/*            const onClickHandler = () => props.removeTask(props.id, t.id)*/}
        {/*            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {*/}
        {/*                let newIsDoneValue = e.currentTarget.checked;*/}
        {/*                props.changeTaskStatus(props.id, t.id, newIsDoneValue);*/}
        {/*            }*/}

        {/*            return <li key={t.id} className={t.isDone ? 'is-done' : ''}>*/}
        {/*                <Checkbox onChange={onChangeHandler} checked={t.isDone}/>*/}
        {/*                /!*<input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>*!/*/}
        {/*                <EditableSpan title={t.title} callback={(title) => changeTaskTitle(t.id, title)}/>*/}
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
            <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}
