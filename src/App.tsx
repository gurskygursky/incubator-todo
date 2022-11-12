import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TasksFilterType, TaskType, Todolist, TodolistType} from './Todolist';

export const App = () => {

    // const [tasks, setTasks] = useState<Array<TaskType>>(
    //     [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //     ],
    // );

    // const [lists, setLists] = useState<Array<TodolistType>>([
    //     {id: v1(), title: 'What to learn', filter: 'All'},
    //     {id: v1(), title: 'What to read', filter: 'All'}
    // ]);

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [lists, setLists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ]);

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })


    const removeTask = (todolistID: string, taskID: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter((task: TaskType) => task.id !== taskID)});
    }

    const changeTaskFilter = (todolistID: string, tasksFilterValue: TasksFilterType) => {
        let todolist = lists.find((td: TodolistType) => td.id === todolistID);
        if (todolist) {
            todolist.filter = tasksFilterValue;
            setLists([...lists]);
        }
    }

    const changeTaskStatus = (todolistID: string, taskID: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map((task: TaskType) => task.id === taskID ? {...task, isDone} : task)
        });
    }

    const addTask = (todolistID: string, title: string) => {
        tasks[todolistID] = [{id: v1(), title, isDone: false}, ...tasks[todolistID]];
        setTasks({...tasks});
        // setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    const removeTodolist = (todolistID: string) => {
        setLists(lists.filter((todolist: TodolistType) => todolist.id !== todolistID));
        delete tasks[todolistID]
        setTasks({...tasks});
        console.log(tasks, todolistID1, todolistID2)
    }

    return (
        <div className="App">
            {
                lists.map((todolist: TodolistType) => {

                        let filteredTasks = tasks[todolist.id];

                        if (todolist.filter === 'Active') {
                            filteredTasks = tasks[todolist.id].filter((task: TaskType) => !task.isDone);
                        }
                        if (todolist.filter === 'Completed') {
                            filteredTasks = tasks[todolist.id].filter((task: TaskType) => task.isDone);
                        }

                        return (
                            <Todolist key={todolist.id}
                                      todolistID={todolist.id}
                                      title={todolist.title}
                                      tasks={filteredTasks}
                                      removeTask={removeTask}
                                      changeTaskFilter={changeTaskFilter}
                                      changeTaskStatus={changeTaskStatus}
                                      addTask={addTask}
                                      taskFilterValue={todolist.filter}
                                      removeTodolist={removeTodolist}
                            />
                        )
                    }
                )}
        </div>
    );
}
