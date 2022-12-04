import {v1} from 'uuid'
import {TodolistType} from './../../Todolist';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    listsReducer,
    removeTodolistAC
} from './lists-reducer';

test('correct todolist should be removed', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ];

    const endState = listsReducer(startState, removeTodolistAC(todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();


    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ];

    const endState = listsReducer(startState, addTodolistAC('New Todolist'));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe('New Todolist');
    expect(endState[0].title).toEqual('What to learn');
    expect(endState[1].title).toEqual('What to buy');
});

test('correct todolist should change its name', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'},
    ];

    const endState = listsReducer(startState, changeTodolistTitleAC(todolistId2, 'New Todolist'));

    expect(endState[0].title).toEqual('What to learn');
    expect(endState[1].title).toBe('New Todolist');
});

test('correct filter of todolist should be changed', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'All'},
        {id: todolistId2, title: 'What to buy', filter: 'All'}
    ];

    const endState = listsReducer(startState, changeTodolistFilterAC(todolistId2, 'Completed'));

    expect(endState[0].filter).toBe('All');
    expect(endState[1].filter).toBe('Completed');
    expect(endState[1].title).toEqual('What to buy');
});
