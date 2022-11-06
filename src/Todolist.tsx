import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type TasksFilterType = 'All' | 'Active' | 'Completed';

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskID: string) => void;
    changeTaskFilter: (tasksFilterValue: TasksFilterType) => void;
    changeTaskStatus: (taskID: string, isDone: boolean) => void;
    addTask: (title: string) => void;
}

export const Todolist = (props: PropsType) => {

    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string>('');

    const removeTask = (taskID: string) => {
        props.removeTask(taskID);
    }

    const onClickChangeFilter = (tasksFilterValue: TasksFilterType) => {
        props.changeTaskFilter(tasksFilterValue);
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

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={inputValue} onChange={onChangeInputHandler} onKeyDown={onKeyPressEnter} onBlur={onBlurHandler}/>
                <button onClick={addTask}>+</button>
                <div style={{color: 'crimson'}}>{error}</div>
            </div>
            <ul>
                {props.tasks.map((task: TaskType) => {
                    return (
                        <li key={task.id}>
                            <button onClick={() => removeTask(task.id)}>x</button>
                            <input type="checkbox"
                                   checked={task.isDone}
                                   onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangeCheckBox(task.id, event.currentTarget.checked)}
                            /><span>{task.title}</span>
                        </li>
                    )
                })}
            </ul>
            {/*<ul>*/}
            {/*    <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span></li>*/}
            {/*    <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span></li>*/}
            {/*    <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>*/}
            {/*</ul>*/}
            <div>
                <button onClick={() => onClickChangeFilter('All')}>All</button>
                <button onClick={() => onClickChangeFilter('Active')}>Active</button>
                <button onClick={() => onClickChangeFilter('Completed')}>Completed</button>
            </div>
        </div>
    );
}
