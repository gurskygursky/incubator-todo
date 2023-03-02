import React, {useEffect, useState} from 'react'
import {todolistAPI} from './../api/API';

export default {
    title: 'API'
}

const settings = {
    withCredentials: true
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getLists()
            .then(response => {
                setState(response);
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const title = 'QWEQWEQW';

        todolistAPI.createList(title)
            .then(response => {
                if (response.resultCode === 0) {
                    setState(response.data);
                }
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '49456264-d981-46a6-a4b5-cf0de256ee4f'
        todolistAPI.deleteList(todolistId)
            .then(response => {
                if (response.resultCode === 0) {
                    setState(response);
                }
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b15e54e8-719f-4dbb-a709-941e811ded3c'
        const title = 'QQQQQ'
        todolistAPI.updateTitle(todolistId, title)
            .then(response => {
                setState(response);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
