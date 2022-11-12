import React, {useState} from 'react';
import {v1} from 'uuid';
import './App.css';
import {TasksFilterType, TaskType, Todolist, TodolistType} from './Todolist';

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

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter((task: TaskType) => task.id !== taskID));
    }

    const changeTaskFilter = (todolistID: string, tasksFilterValue: TasksFilterType) => {
        let todolist = lists.find((td: TodolistType) => td.id === todolistID);
        if (todolist) {
            todolist.filter = tasksFilterValue;
            setLists([...lists]);
        }
    }

    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map((task: TaskType) => task.id === taskID ? {...task, isDone} : task));
    }

    const addTask = (title: string) => {
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
        </div>
    );
}
