import {v1} from 'uuid';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from '../reducers/tasks-reducer';
import {removeTodolistAC} from "../reducers/todolist-reducer";
import {TasksStateType} from "../types";
import {TaskPriorities, TaskStatuses} from "./../api/types";

let todolistId1: string;
let todolistId2: string;
let startState: TasksStateType;

beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();

    startState = {
        [todolistId1]: [
            {
                id: '1',
                title: 'HTML&CSS',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                completed: true,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: todolistId1,
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
                todoListId: todolistId1,
            }
        ],
        [todolistId2]: [
            {
                id: '1',
                title: 'Milk',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                completed: true,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: todolistId2,
            },
            {
                id: '2',
                title: 'React Book',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                completed: true,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: todolistId2,
            }
        ]
    };
});
test('correct task should be removed', () => {

    const endState = tasksReducer(startState, removeTaskAC(todolistId1, '1'));

    expect(endState[todolistId1].length).toBe(1);
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1][0].title).toEqual('JS');
    expect(endState).toEqual({
        [todolistId1]: [
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
                todoListId: todolistId1,
            }
        ],
        [todolistId2]: [
            {
                id: '1',
                title: 'Milk',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                completed: true,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: todolistId2,
            },
            {
                id: '2',
                title: 'React Book',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                completed: true,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: todolistId2,
            }
        ]
    });
});

test('correct task should be change its name', () => {

    const endState = tasksReducer(startState, changeTaskTitleAC(todolistId1, '1', 'xxx'));

    expect(endState[todolistId1][0].title).toBe('xxx');
    expect(endState[todolistId1][1].title).toBe('JS');
    expect(endState[todolistId2]).toEqual([
        {
            id: '1',
            title: 'Milk',
            status: TaskStatuses.New,
            addedDate: '',
            order: 0,
            completed: true,
            deadline: '',
            startDate: '',
            description: '',
            priority: TaskPriorities.Hi,
            todoListId: todolistId2,
        },
        {
            id: '2',
            title: 'React Book',
            status: TaskStatuses.New,
            addedDate: '',
            order: 0,
            completed: true,
            deadline: '',
            startDate: '',
            description: '',
            priority: TaskPriorities.Hi,
            todoListId: todolistId2,
        }
    ]);
});

test('correct task status should be changed', () => {

    const endState = tasksReducer(startState, changeTaskStatusAC(todolistId1, '1', TaskStatuses.Completed));

    expect(endState[todolistId1][0].status).toBe(TaskStatuses.Completed);
    expect(endState[todolistId1][1].status).toBe(TaskStatuses.New);
    expect(endState[todolistId2]).toEqual([
        {
            id: '1',
            title: 'Milk',
            status: TaskStatuses.New,
            addedDate: '',
            order: 0,
            completed: true,
            deadline: '',
            startDate: '',
            description: '',
            priority: TaskPriorities.Hi,
            todoListId: todolistId2,
        },
        {
            id: '2',
            title: 'React Book',
            status: TaskStatuses.New,
            addedDate: '',
            order: 0,
            completed: true,
            deadline: '',
            startDate: '',
            description: '',
            priority: TaskPriorities.Hi,
            todoListId: todolistId2,
        }
    ]);
});

test('correct task should be added', () => {

    const endState = tasksReducer(startState, addTaskAC(todolistId1, 'xxxx'));

    expect(endState[todolistId1][0].title).toBe('HTML&CSS');
    expect(endState[todolistId1][1].title).toBe('JS');
    expect(endState[todolistId1][2].title).toBe('xxxx');
    expect(endState[todolistId2]).toEqual([
        {
            id: '1',
            title: 'Milk',
            status: TaskStatuses.New,
            addedDate: '',
            order: 0,
            completed: true,
            deadline: '',
            startDate: '',
            description: '',
            priority: TaskPriorities.Hi,
            todoListId: todolistId2,
        },
        {
            id: '2',
            title: 'React Book',
            status: TaskStatuses.New,
            addedDate: '',
            order: 0,
            completed: true,
            deadline: '',
            startDate: '',
            description: '',
            priority: TaskPriorities.Hi,
            todoListId: todolistId2,
        }
    ]);
});

test('property with todolistId should be deleted', () => {

    const startState: TasksStateType = {
        [todolistId1]: [
            {
                id: '1',
                title: 'HTML&CSS',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                completed: true,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: todolistId1,
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
                todoListId: todolistId1,
            }
        ],
        [todolistId2]: [
            {
                id: '1',
                title: 'Milk',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                completed: true,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: todolistId2,
            },
            {
                id: '2',
                title: 'React Book',
                status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                completed: true,
                deadline: '',
                startDate: '',
                description: '',
                priority: TaskPriorities.Hi,
                todoListId: todolistId2,
            }
        ]
    };

    const action = removeTodolistAC(todolistId2);

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});
