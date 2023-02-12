import {v1} from 'uuid';
import {TasksStateType, TodolistType} from '../AppWithRedux';
import {
    addTodolistAC,
    changeTasksFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from './todolist-reducer';
import {tasksReducer} from "../reducers/tasks-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistType>;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ];
});

test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, removeTodolistAC(todolistId1));

    expect(endState[0].id).toBe(todolistId2);
    expect(endState[0].title).toBe('What to buy');
    expect(endState[0].filter).toBe('all');
    expect(endState).toEqual([{id: todolistId2, title: 'What to buy', filter: 'all'}]);
});

test('correct todolist should be added', () => {

    const endState = todolistReducer(startState, addTodolistAC('1234'));

    expect(endState.length).toBe(3);
    expect(endState[0].id).toBe(todolistId1);
    expect(endState[1].id).toBe(todolistId2);
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe('What to buy');
    expect(endState[2].title).toBe('1234');
    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe('all');
    expect(endState[2].filter).toBe('completed');
});

test('filtration tasks should be changed', () => {

    const endState = todolistReducer(startState, changeTasksFilterAC(todolistId1, 'completed'));

    expect(endState[0].id).toBe(todolistId1);
    expect(endState[1].id).toBe(todolistId2);
    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe('What to buy');
    expect(endState[0].filter).toBe('completed');
    expect(endState[1].filter).toBe('all');
});

test('correct todolist should be change its name', () => {

    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId1, 'xxx'));

    expect(endState.length).toBe(2);
    expect(endState[0].id).toBe(todolistId1);
    expect(endState[1].id).toBe(todolistId2);
    expect(endState[0].title).toBe('xxx');
    expect(endState[1].title).toBe('What to buy');
    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe('all');
});
test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
