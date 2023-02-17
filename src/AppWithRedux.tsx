import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {ButtonAppBar} from './components/app-bar/ButtonAppBar';
import {AddItemForm} from './components/AddItemForm';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import {addTodolistAC, changeTasksFilterAC, changeTodolistTitleAC, removeTodolistAC} from './reducers/todolist-reducer';
import {useDispatch, useSelector} from "react-redux";
import {todolistSelector} from "./reducers/selectors";
import {AppRootStateType} from "./reducers/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {TodolistWithRedux} from "./TodolistWithRedux";

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export const AppWithRedux = () => {

    console.log('AppWithRedux is rendered');

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolistReducer);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasksReducer);
    const dispatch = useDispatch();

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
    }, [dispatch]);

    const removeTask = useCallback((todolistId: string, id: string) => {
        dispatch(removeTaskAC(todolistId, id));
    }, [dispatch]);

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(todolistId, title));
    }, [dispatch]);

    const changeStatus = useCallback((todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, id, isDone));
    }, [dispatch]);

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeTasksFilterAC(todolistId, value));
    }, [dispatch]);

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistAC(id));
    }, [dispatch]);

    const changeTaskTitle = useCallback((todolistID: string, taskID: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, title));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((todolistID: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistID, title));
    }, [dispatch]);

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
                            // let tasksForTodolist = allTodolistTasks;
                            //
                            // if (tl.filter === 'active') {
                            //     tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            // }
                            // if (tl.filter === 'completed') {
                            //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
                            // }

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}} elevation={12}>
                                    <TodolistWithRedux todolist={tl} tasks={allTodolistTasks}/>
                                    {/*<Todolist id={tl.id}*/}
                                    {/*          title={tl.title}*/}
                                    {/*          tasks={allTodolistTasks}*/}
                                    {/*          removeTask={removeTask}*/}
                                    {/*          changeFilter={changeFilter}*/}
                                    {/*          addTask={addTask}*/}
                                    {/*          changeTaskStatus={changeStatus}*/}
                                    {/*          removeTodolist={removeTodolist}*/}
                                    {/*          filter={tl.filter}*/}
                                    {/*          changeTaskTitle={changeTaskTitle}*/}
                                    {/*          changeTodolistTitle={changeTodolistTitle}*/}
                                    {/*/>*/}
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}
