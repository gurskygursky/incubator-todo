import {v1} from 'uuid';
import {TodolistType} from './../AppWithReducers';
import {removeTodolistAC, todolistReducer} from './todolist-reducer';

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
