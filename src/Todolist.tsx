import React, {memo} from 'react';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button/Button';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {changeTasksFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./reducers/todolist-reducer";
import {addTaskAC} from "./reducers/tasks-reducer";
import {tasksSelector} from "./selectors";
import {Task} from "./Task";
import {FilterValuesType, TaskType} from "./types";
import {TodolistType} from "./types";
import {TaskResponseType, TasksResponseType, TodolistEntityType} from "./api/types";

type PropsType = {
    todolist: TodolistEntityType;
}

export const Todolist: React.FC<PropsType> = memo(({todolist}) => {
    const {id, title, filter, addedDate, order} = todolist;

    let todolistTasks = useSelector<AppRootStateType, TaskResponseType[]>(state => tasksSelector(state, todolist.id));
    const dispatch = useDispatch();

    if (filter === 'active') {
        todolistTasks = todolistTasks.filter(task => !task.isDone);
    }
    if (filter === 'completed') {
        todolistTasks = todolistTasks.filter(task => task.isDone);
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(id, title));
    }

    const removeTodolist = () => {
        dispatch(removeTodolistAC(id));
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(id, title));
    }

    const onAllClickHandler = () => dispatch(changeTasksFilterAC(id, 'all'));
    const onActiveClickHandler = () => dispatch(changeTasksFilterAC(id, 'active'));
    const onCompletedClickHandler = () => dispatch(changeTasksFilterAC(id, 'completed'));

    return <div>
        <h3>
            <EditableSpan title={title} callback={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <DeleteIcon/>
            </IconButton>
        </h3>
        <AddItemForm callback={addTask}/>
        <ul style={{listStyle: 'none', padding: 0}} key={todolist.id}>
            {
                todolistTasks.map((task: TasksResponseType) => {
                    return (
                        <Task task={task}
                              todolistId={todolist.id}
                              key={task.id}
                        />
                    )
                })
            }
        </ul>
        <div>
            <Button variant={filter === 'all' ? 'contained' : 'outlined'}
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={filter === 'active' ? 'contained' : 'outlined'}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={filter === 'completed' ? 'contained' : 'outlined'}
                    onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
});
