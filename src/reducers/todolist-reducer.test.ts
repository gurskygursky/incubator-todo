import {v1} from 'uuid';
import {TodolistType} from './../AppWithReducers';
import {addTodolistAC, changeTasksFilterAC, removeTodolistAC, todolistReducer} from './todolist-reducer';
import {text} from 'stream/consumers';

test('correct todolist should be removed', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ];

    const endState = todolistReducer(startState, removeTodolistAC(todolistId1));

    expect(endState[0].id).toBe(todolistId2);
    expect(endState[0].title).toBe('What to buy');
    expect(endState[0].filter).toBe('all');
    expect(endState).toEqual([{id: todolistId2, title: 'What to buy', filter: 'all'}]);
});

test('correct todolist should be added', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ];

    const endState = todolistReducer(startState, addTodolistAC('1234'));

    expect(endState[0].id).toBe(todolistId1);
    expect(endState[1].id).toBe(todolistId2);
    expect(endState[2].id).toBe('777');
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe('What to buy');
    expect(endState[1].filter).toBe('all');
    expect(endState).toEqual([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
        {id: '777', title: '1234', filter: 'all'},

    ]);
});

test('filtration tasks should be changed', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ];

    const endState = todolistReducer(startState, changeTasksFilterAC(todolistId1, 'completed'));

    expect(endState[0].id).toBe(todolistId1);
    expect(endState[1].id).toBe(todolistId2);
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe('What to buy');
    expect(endState[0].filter).toBe('completed');
    expect(endState[1].filter).toBe('all');
});
