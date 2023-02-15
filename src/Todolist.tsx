import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button/Button';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import {Task} from "./Task";

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

export const Todolist = memo((props: PropsType) => {

    console.log('Todolist is rendered');

    const addTask = useCallback((newTitle: string) => {
        props.addTask(newTitle, props.id);
    }, [props.addTask, props.id]);

    const removeTodolist = useCallback(() => props.removeTodolist(props.id), [props.removeTodolist, props.id]);

    const changeTaskTitle = useCallback((taskID: string, title: string) => {
        props.changeTaskTitle(props.id, taskID, title);
    }, [props.changeTaskTitle, props.id]);

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle]);

    const onAllClickHandler = () => props.changeFilter(props.id, 'all');
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active');
    const onCompletedClickHandler = () => props.changeFilter(props.id, 'completed');

    let tasks = props.tasks

    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    const removeTask = useCallback((taskId: string) => props.removeTask(props.id, taskId), [props.removeTask, props.id]);

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => {
        props.changeTaskStatus(props.id, taskId, isDone);
    }, [props.changeTaskStatus, props.id]);


    return <div>
        <h3>
            <EditableSpan title={props.title} callback={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm callback={addTask}/>
        {/*<Tasks tasks={props.tasks}*/}
        {/*       todolistId={props.id}*/}
        {/*       removeTask={props.removeTask}*/}
        {/*       changeTaskStatus={props.changeTaskStatus}*/}
        {/*       changeTaskTitle={props.changeTaskTitle}/>*/}
        <ul style={{listStyle: 'none', padding: 0}} key={props.id}>
            {
                tasks.map((t: TaskType) => {
                    return (
                        <Task task={t}
                              key={t.id}
                              removeTask={removeTask}
                              changeTaskStatus={changeTaskStatus}
                              changeTaskTitle={changeTaskTitle}
                        />
                    )
                    // const onClickHandler = () => props.removeTask(props.id, t.id)
                    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    //     let newIsDoneValue = e.currentTarget.checked;
                    //     props.changeTaskStatus(props.id, t.id, newIsDoneValue);
                    // }
                    //
                    // return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                    //     <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                    //     <EditableSpan title={t.title} callback={(title) => changeTaskTitle(t.id, title)}/>
                    //     <IconButton aria-label="delete" onClick={onClickHandler}>
                    //         <DeleteIcon/>
                    //     </IconButton>
                    // </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
});
