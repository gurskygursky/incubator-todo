import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {ButtonAppBar} from './components/app-bar/ButtonAppBar';
import {AddItemForm} from './components/AddItemForm';
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    });

    function removeTask(todolistId: string, id: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[todolistId] = [task, ...todolistTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function changeStatus(todolistId: string, id: string, isDone: boolean) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === id);
        //изменим таску, если она нашлась
        if (task) {
            task.isDone = isDone;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
        // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        setTodolists(todolists.filter(tl => tl.id != id));
        // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    const changeTaskTitle = (todolistID: string, taskID: string, title: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(task => task.id === taskID ? {...task, title} : task)})
    }

    const addTodolist = (title: string) => {
        const newTodolistID = v1();
        setTodolists([{id: newTodolistID, title: title, filter: 'all'}, ...todolists]);
        setTasks({...tasks, [newTodolistID]: []});
    }

    const changeTodolistTitle = (todolistID: string, title: string) => {
        setTodolists(todolists.map((todolist: TodolistType) => todolist.id === todolistID ? {...todolist, title: title} : todolist));
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
                                tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
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
                                        changeTodolistTitle={changeTodolistTitle}
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
