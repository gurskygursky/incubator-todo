import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {ButtonAppBar} from './components/app-bar/ButtonAppBar';
import {AddItemForm} from './components/AddItemForm';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import {addTodolistAC, getListsThunkCreator} from './reducers/todolist-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";
import {TodolistEntityType} from "./api/types";

export const App = () => {
    const todolists = useSelector<AppRootStateType, TodolistEntityType[]>(state => state.todolistReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListsThunkCreator());
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
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
                        todolists.map((tl: TodolistEntityType) => {

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}} elevation={12}>
                                    <Todolist todolist={tl}/>
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}
