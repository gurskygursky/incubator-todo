import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import './App.css';

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

export type TasksFilterType = 'All' | 'Active' | 'Completed';

type PropsType = {
    todolistID: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskID: string) => void;
    changeTaskFilter: (todolistID: string, tasksFilterValue: TasksFilterType) => void;
    changeTaskStatus: (taskID: string, isDone: boolean) => void;
    addTask: (title: string) => void;
    taskFilterValue: TasksFilterType;
}

export const Todolist = (props: PropsType) => {

    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const removeTask = (taskID: string) => {
        props.removeTask(taskID);
    }

    const onClickChangeFilter = (todolistID: string, tasksFilterValue: TasksFilterType) => {
        props.changeTaskFilter(todolistID, tasksFilterValue);
    }

    const handleChangeCheckBox = (taskID: string, isDone: boolean) => {
        props.changeTaskStatus(taskID, isDone);
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value === '') {
            setError('Incorrect input values');
        }
        if (event.currentTarget.value !== '') {
            setError('');
        }
        setInputValue(event.currentTarget.value);
    }
    const onBlurHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.value === '') {
            setError('Incorrect input values');
        }
        if (event.currentTarget.value !== '') {
            setError('');
        }
    }

    const addTask = () => {
        if (inputValue.trim() !== '') {
            props.addTask(inputValue);
            setInputValue('');
            setError('');
        }
        if (inputValue.trim() === '') {
            setError('Incorrect input values');
        }
    }

    const onKeyPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        const {key} = event;

        if (key === 'Enter') {
            if (inputValue !== '') {
                addTask();
            }
        }
    }

    const styleError = error ? {outline: 'none', borderColor: 'crimson', borderRadius: '3px'} : {
        outline: 'none',
        borderColor: ''
    };

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input style={styleError} value={inputValue} onChange={onChangeInputHandler} onKeyDown={onKeyPressEnter}
                       onBlur={onBlurHandler}/>
                <button onClick={addTask} disabled={error ? true : false}>+</button>
                <div style={{color: 'crimson'}}>{error}</div>
            </div>
            <ul>
                {props.tasks.map((task: TaskType) => {
                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <button onClick={() => removeTask(task.id)}>x</button>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangeCheckBox(task.id, event.currentTarget.checked)}
                            /><span>{task.title}</span>
                        </li>
                    )
                })}
            </ul>
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
