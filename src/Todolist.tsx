import React, {ChangeEvent} from 'react';

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

export type TasksFilterType = 'All' | 'Active' | 'Completed';

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskID: number) => void;
    changeTaskFilter: (tasksFilterValue: TasksFilterType ) => void;
    changeTaskStatus: (taskID: number, isDone: boolean) => void;
}

export const Todolist = (props: PropsType) => {

    const removeTask = (taskID: number) => {
        props.removeTask(taskID);
    }

    const onClickChangeFilter = (tasksFilterValue: TasksFilterType) => {
        props.changeTaskFilter(tasksFilterValue);
    }
    
    const handleChangeCheckBox = (taskID: number, isDone: boolean) => {
        props.changeTaskStatus(taskID, isDone );
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
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
