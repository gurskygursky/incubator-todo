import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTasksFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from './todolist-reducer';
import {tasksReducer} from "../reducers/tasks-reducer";
import {TaskPriorities, TaskStatuses, TodolistEntityType} from "./../api/types";
import {TasksStateType} from './../types';

let todolistId1: string;
let todolistId2: string;
let startState: TodolistEntityType[];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: null, order: null},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: null, order: null},
    ];
});

test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, removeTodolistAC(todolistId1));

    expect(endState[0].id).toBe(todolistId2);
    expect(endState[0].title).toBe('What to buy');
    expect(endState[0].filter).toBe('all');
    expect(endState).toEqual([{id: todolistId2, title: 'What to buy', filter: 'all', addedDate: null, order: null}]);
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
    expect(endState[2].filter).toBe('all');
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
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                completed: true,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: 'todolistId1',
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                completed: true,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: 'todolistId1',
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                completed: true,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: 'todolistId1',
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                completed: true,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: 'todolistId2',
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                completed: true,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: 'todolistId2',
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                completed: true,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: 'todolistId2',
            }
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
