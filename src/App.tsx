import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TasksFilterType, TaskType, Todolist, TodolistType} from './Todolist';

// const tasks1 = [
//     { id: 1, title: "HTML&CSS", isDone: true },
//     { id: 2, title: "JS", isDone: true },
//     { id: 3, title: "ReactJS", isDone: false }
// ]
// const tasks2 = [
//     { id: 1, title: "Hello world", isDone: true },
//     { id: 2, title: "I am Happy", isDone: false },
//     { id: 3, title: "Yo", isDone: false }
// ]

export const App = () => {

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
    );

    const [lists, setLists] = useState<Array<TodolistType>>([
        {id: v1(), title: 'What to learn', filter: 'All'},
        {id: v1(), title: 'What to read', filter: 'All'}
    ]);

    // const [filter, setFilter] = useState<TasksFilterType>('All');

    // let filteredTasks = tasks;
    //
    // if (filter === 'Active') {
    //     filteredTasks = tasks.filter((task: TaskType) => !task.isDone);
    // }
    // if (filter === 'Completed') {
    //     filteredTasks = tasks.filter((task: TaskType) => task.isDone);
    // }


    const removeTask = (taskID: string) => {
        setTasks(tasks.filter((task: TaskType) => task.id !== taskID));
    }

    const changeTaskFilter = (todolistID: string, tasksFilterValue: TasksFilterType) => {
        let todolist = lists.find((td: TodolistType) => td.id === todolistID);
        if (todolist) {
            todolist.filter = tasksFilterValue;
            setLists([...lists]);
        }
        // setFilter(tasksFilterValue);
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        console.log(isDone)
        setTasks(tasks.map((task: TaskType) => task.id === taskID ? {...task, isDone} : task));
    }

    const addTask = (title: string) => {
        console.log(title);
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    return (
        <div className="App">
            {
                lists.map((todolist: TodolistType) => {

                    let filteredTasks = tasks;

                    if (todolist.filter === 'Active') {
                        filteredTasks = tasks.filter((task: TaskType) => !task.isDone);
                    }
                    if (todolist.filter === 'Completed') {
                        filteredTasks = tasks.filter((task: TaskType) => task.isDone);
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
                              taskFilterValue={todolist.filter}/>
                )
                }
            )}
            {/*<Todolist title={'What to learn'} tasks={tasks1}/>*/}
            {/*<Todolist title={'What to read'} tasks={tasks2}/>*/}
            {/*<Todolist title={'What to learn'}*/}
            {/*          tasks={filteredTasks}*/}
            {/*          removeTask={removeTask}*/}
            {/*          changeTaskFilter={changeTaskFilter}*/}
            {/*          changeTaskStatus={changeTaskStatus}*/}
            {/*          addTask={addTask}*/}
            {/*          taskFilterValue={filter}*/}
            {/*/>*/}
            {/*<Todolist title={'Movies'}/>*/}
            {/*<div>*/}
            {/*    <h3>What to learn</h3>*/}
            {/*    <div>*/}
            {/*        <input/>*/}
            {/*        <button>+</button>*/}
            {/*    </div>*/}
            {/*    <ul>*/}
            {/*        <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>*/}
            {/*        <li><input type="checkbox" checked={true}/> <span>JS</span></li>*/}
            {/*        <li><input type="checkbox" checked={false}/> <span>React</span></li>*/}
            {/*    </ul>*/}
            {/*    <div>*/}
            {/*        <button>All</button>*/}
            {/*        <button>Active</button>*/}
            {/*        <button>Completed</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}
