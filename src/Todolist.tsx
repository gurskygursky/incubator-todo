import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button/Button';
import Checkbox from '@mui/material/Checkbox/Checkbox';

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
    const addTask = (newTitle: string) => {

        props.addTask(newTitle, props.id);

    }

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
        </h3>
        <AddItemForm callback={addTask}/>
        {/*<Tasks tasks={props.tasks}*/}
        {/*       todolistId={props.id}*/}
        {/*       removeTask={props.removeTask}*/}
        {/*       changeTaskStatus={props.changeTaskStatus}*/}
        {/*       changeTaskTitle={props.changeTaskTitle}/>*/}
        <ul style={{listStyle: 'none', padding: 0}} key={props.id}>
            {
                props.tasks.map((t: TaskType) => {
                    const onClickHandler = () => props.removeTask(props.id, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(props.id, t.id, newIsDoneValue);
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} callback={(title) => changeTaskTitle(t.id, title)}/>
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </li>
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
}
