import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {ButtonAppBar} from './ButtonAppBar';
import {AddItemForm} from './AddItemForm';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import {addTodolistAC, changeTasksFilterAC, removeTodolistAC} from './reducers/todolist-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/tasks-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolistReducer);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasksReducer);
    const dispatch = useDispatch();


    function removeTask(todolistId: string, id: string) {
        dispatch(removeTaskAC(todolistId, id));
    }

    function addTask(title: string, todolistId: string) {
        dispatch(addTaskAC(todolistId, title));
    }

    function changeStatus(todolistId: string, id: string, isDone: boolean) {
        dispatch(changeTaskStatusAC(todolistId, id, isDone));
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatch(changeTasksFilterAC(todolistId, value));
    }

    function removeTodolist(id: string) {
        dispatch(removeTodolistAC(id));
    }

    const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, title));
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title));
    }


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container padding={'20px'}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={10}>
                    {
                        todolists.map((tl: TodolistType) => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}} elevation={12}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}
