import React, {ChangeEvent} from 'react';
import {TaskType} from './Todolist';
import {EditableSpan} from './EditableSpan';

type TaskPropsType = {
    task: TaskType;
    todolistID: string;
    removeTask: (todolistID: string, taskID: string) => void;
    changeTaskStatus: (todolistID: string, taskID: string, isDone: boolean) => void;
    editTaskTitle: (taskID: string, title: string) => void;
}


export const Task: React.FC<TaskPropsType> = (props) => {

    const removeTask = (todolistID: string, taskID: string) => {
        props.removeTask(todolistID, taskID);
    }

    const handleChangeCheckBox = (todolistID: string, taskID: string, isDone: boolean) => {
        props.changeTaskStatus(todolistID, taskID, isDone);
    }

    const editTaskTitle = (taskID: string, title: string) => {
        props.editTaskTitle(taskID, title);
    }

    return (
        <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <button onClick={() => removeTask(props.todolistID, props.task.id)}>x</button>
            <input type="checkbox"
                   checked={props.task.isDone}
                   onChange={(event: ChangeEvent<HTMLInputElement>) => handleChangeCheckBox(props.todolistID, props.task.id, event.currentTarget.checked)}
            />
            <EditableSpan value={props.task.title} callback={(value) => editTaskTitle(props.task.id, value)}/>
        </li>
    );
}