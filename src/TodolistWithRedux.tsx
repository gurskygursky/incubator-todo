import React from 'react';
import {TodolistType} from './AppWithRedux';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button/Button';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {changeTasksFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./reducers/todolist-reducer";
import {addTaskAC} from "./reducers/tasks-reducer";
import {TasksWithRedux} from "./TasksWithRedux";
import {tasksSelector} from "./reducers/selectors";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType;
}

export const TodolistWithRedux = ({todolist}: PropsType) => {

    const {id, title, filter} = todolist;
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => tasksSelector(state, todolist.id));
    const dispatch = useDispatch();

    if (filter === 'active') {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.isDone);
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(id, title));
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(id));
    }
    const changeTodolistTitle = (todolistID: string, title: string) => {
        dispatch(changeTodolistTitleAC(id, title));
    }

    const onAllClickHandler = () => dispatch(changeTasksFilterAC(id, 'all'));
    const onActiveClickHandler = () => dispatch(changeTasksFilterAC(id, 'active'));
    const onCompletedClickHandler = () => dispatch(changeTasksFilterAC(id, 'completed'));

    return <div>
        <h3>
            <EditableSpan title={title} callback={(title) => changeTodolistTitle(todolist.id, title)}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm callback={addTask}/>
        <TasksWithRedux todolistId={id} tasks={tasks}/>
        <div>
            <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={filter === 'active' ? 'contained' : 'outlined'}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}
