import React, {ChangeEvent} from 'react';
import './App.css';
import {AddItem} from 'src/AddItem';
import {EditableSpan} from './EditableSpan';
import {Task} from 'src/Task';

export type TodolistType = {
    id: string;
    title: string;
    filter: TasksFilterType;
}
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export type TasksType = {
    [key: string]: Array<TaskType>;
}
export type TasksFilterType = 'All' | 'Active' | 'Completed';

type PropsType = {
    todolistID: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (todolistID: string, taskID: string) => void;
    changeTaskFilter: (todolistID: string, tasksFilterValue: TasksFilterType) => void;
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void;
    addTask: (todolistID: string, title: string) => void;
    removeTodolist: (todolistID: string) => void;
    taskFilterValue: TasksFilterType;
    editTaskTitle: (todolistID: string, taskID: string, title: string) => void;
    editTodolistTitle: (todolistID: string, title: string) => void;
}

export const Todolist = (props: PropsType) => {

    const removeTask = (todolistID: string, taskID: string) => {
        props.removeTask(todolistID, taskID);
    }

    const onClickChangeFilter = (todolistID: string, tasksFilterValue: TasksFilterType) => {
        props.changeTaskFilter(todolistID, tasksFilterValue);
    }

    const handleChangeCheckBox = (todolistID: string, taskID: string, isDone: boolean) => {
        props.changeTaskStatus(todolistID, taskID, isDone);
    }

    const addTask = (title: string) => {
        props.addTask(props.todolistID, title);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.todolistID);
    }

    const editTaskTitle = (taskID: string, title: string) => {
        props.editTaskTitle(props.todolistID, taskID, title);
    }

    const editTodolistTitle = (title: string) => {
        props.editTodolistTitle(props.todolistID, title);
    }

    return (

        <div>
            <h3>
                <EditableSpan value={props.title} callback={(value) => editTodolistTitle(value)}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItem callback={addTask}/>
            {props.tasks.map((task: TaskType) =>
                <Task task={task}
                      key={task.id}
                      todolistID={props.todolistID}
                      removeTask={removeTask}
                      changeTaskStatus={handleChangeCheckBox}
                      editTaskTitle={editTaskTitle}
                />
            )}
            {/*<ul>*/}
            {/*    {props.tasks.map((task: TaskType) => {*/}
            {/*        return (*/}
            {/*            <li key={task.id} className={task.isDone ? 'is-done' : ''}>*/}
            {/*                <button onClick={() => removeTask(props.todolistID, task.id)}>x</button>*/}
            {/*                <input type="checkbox"*/}
            {/*                       checked={task.isDone}*/}
            {/*                       onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangeCheckBox(props.todolistID, task.id, event.currentTarget.checked)}*/}
            {/*                />*/}
            {/*                <EditableSpan value={task.title} callback={(value) => editTaskTitle(task.id, value)}/>*/}
            {/*            </li>*/}
            {/*        )*/}
            {/*    })}*/}
            {/*</ul>*/}
            <div>
                <button className={props.taskFilterValue === 'All' ? 'active-filter' : ''}
                        onClick={() => onClickChangeFilter(props.todolistID, 'All')}>All
                </button>
                <button className={props.taskFilterValue === 'Active' ? 'active-filter' : ''}
                        onClick={() => onClickChangeFilter(props.todolistID, 'Active')}>Active
                </button>
                <button className={props.taskFilterValue === 'Completed' ? 'active-filter' : ''}
                        onClick={() => onClickChangeFilter(props.todolistID, 'Completed')}>Completed
                </button>
            </div>
        </div>
    );
}
