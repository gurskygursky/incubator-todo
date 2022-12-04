import { v1 } from 'uuid'
import {TasksFilterType, TodolistType} from './../../Todolist';
import {listsReducer} from './lists-reducer';

test('correct todolist should be removed', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState = listsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
});

test('correct todolist should be added', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const newTodolistTitle = 'New Todolist';

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const endState = listsReducer(startState, {type: 'ADD_TODOLIST', title: newTodolistTitle});

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe('New Todolist');
    expect(endState[0].title).toEqual('What to learn');
    expect(endState[1].title).toEqual('What to buy');
});

test('correct todolist should change its name', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const newTodolistTitle = 'New Todolist';

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ]

    const action = {
        type: 'CHANGE_TODOLIST_TITLE',
        id: todolistId2,
        title: newTodolistTitle
    }

    const endState = listsReducer(startState, action);

    expect(endState[0].title).toEqual('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const newFilter: TasksFilterType = 'Completed'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ]

    const action = {
        type: 'CHANGE_TODOLIST_FILTER',
        id: todolistId2,
        filter: newFilter
    }

    const endState = listsReducer(startState, action);

    expect(endState[0].filter).toBe('All');
    expect(endState[1].filter).toBe(newFilter);
    expect(endState[1].title).toEqual('What to buy');
});
