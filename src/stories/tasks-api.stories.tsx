import React, {useEffect, useState} from 'react'
import {todolistAPI} from './../api/API';
import {TaskResponseType, TaskStatuses, UpdateTaskModelType} from "./../api/types";

export default {
    title: 'TasksAPI'
}

const settings = {
    withCredentials: true
}

export const GetTasks = () => {
    const [state, setState] = useState<Array<TaskResponseType>>([])
    useEffect(() => {
        const todolistId = '836ce841-bc6c-45c9-809e-69a5dd7de1a6'
        todolistAPI.getTasks(todolistId)
            .then(response => {
                setState(response.data.items);
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '836ce841-bc6c-45c9-809e-69a5dd7de1a6'
        const title = '123123';

        todolistAPI.createTask(todolistId, title)
            .then(response => {
                if (response.data.resultCode === 0) {
                    setState(response.data);
                }
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const RemoveTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '836ce841-bc6c-45c9-809e-69a5dd7de1a6';
        const taskId = '310be298-43af-4b03-9c0a-764f6a3cd281';

        todolistAPI.removeTask(todolistId, taskId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    setState(response.data);
                }
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const UpdateTaskModel: UpdateTaskModelType = {
            title: 'qqqqq',
            description: 'required(string)',
            status: 2,
            priority: 2,
            startDate: '',
            deadline: '',
        }

        const todolistId = '836ce841-bc6c-45c9-809e-69a5dd7de1a6';
        const taskId = 'a692dbbf-e77f-4b22-b1d2-c601f93bfdc7';

        todolistAPI.updateTask(todolistId, taskId, UpdateTaskModel)
            .then(response => {
                console.log(response);
                setState(response.data);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
