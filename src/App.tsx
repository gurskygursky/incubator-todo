import React, {useState} from 'react';
import { v1 } from 'uuid';
import './App.css';
import {TasksFilterType, TaskType, Todolist} from './Todolist';

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

    const [filter, setFilter] = useState<TasksFilterType>('All');

    let filteredTasks = tasks;

    if (filter === 'Active') {
        filteredTasks = tasks.filter((task: TaskType) => !task.isDone);
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter((task: TaskType) => task.isDone);
    }


    const removeTask = (taskID: string) => {
        setTasks(tasks.filter((task: TaskType) => task.id !== taskID));
    }

    const changeTaskFilter = (tasksFilterValue: TasksFilterType) => {
        setFilter(tasksFilterValue);
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
            {/*<Todolist title={'What to learn'} tasks={tasks1}/>*/}
            {/*<Todolist title={'What to read'} tasks={tasks2}/>*/}
            <Todolist title={'What to learn'}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      changeTaskFilter={changeTaskFilter}
                      changeTaskStatus={changeTaskStatus}
                      addTask={addTask}
            />
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
