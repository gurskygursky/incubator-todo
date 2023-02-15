import React from 'react';
import './App.css';
import {TaskType} from './Todolist';
import {ButtonAppBar} from './components/app-bar/ButtonAppBar';
import {AddItemForm} from './components/AddItemForm';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import {addTodolistAC} from './reducers/todolist-reducer';
import {useDispatch, useSelector} from "react-redux";
import {TodolistWithRedux} from "./TodolistWithRedux";
import {todolistSelector} from "./reducers/selectors";

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

    const todolists = useSelector(todolistSelector);
    const dispatch = useDispatch();

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
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}} elevation={12}>
                                    <TodolistWithRedux todolist={tl}/>
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}
