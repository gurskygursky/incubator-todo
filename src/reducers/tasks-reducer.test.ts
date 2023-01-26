import {v1} from 'uuid';
import {TasksStateType} from './../AppWithReducers';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './../reducers/tasks-reducer';

test('correct task should be removed', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true}
        ],
        [todolistId2]: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'React Book', isDone: true}
        ]
    };

    const endState = tasksReducer(startState, removeTaskAC(todolistId1, '1' ));

    expect(endState[todolistId1].length).toBe(1);
    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1][0].title).toEqual('JS');
    expect(endState).toEqual({
        [todolistId1]: [
            {id: '2', title: 'JS', isDone: true}
        ],
        [todolistId2]: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'React Book', isDone: true}
        ]
    });
});

test('correct task should be change its name', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true}
        ],
        [todolistId2]: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'React Book', isDone: true}
        ]
    };

    const endState = tasksReducer(startState, changeTaskTitleAC(todolistId1, '1', 'xxx'));

    expect(endState[todolistId1][0].title).toBe('xxx');
    expect(endState[todolistId1][1].title).toBe('JS');
    expect(endState[todolistId2]).toEqual([
        {id: '1', title: 'Milk', isDone: true},
        {id: '2', title: 'React Book', isDone: true}
    ]);
});

test('correct task status should be changed', () => {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true}
        ],
        [todolistId2]: [
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'React Book', isDone: true}
        ]
    };

    const endState = tasksReducer(startState, changeTaskStatusAC(todolistId1, '1', false));

    expect(endState[todolistId1][0].isDone).toBe(false);
    expect(endState[todolistId1][1].isDone).toBe(true);
    expect(endState[todolistId2]).toEqual([
        {id: '1', title: 'Milk', isDone: true},
        {id: '2', title: 'React Book', isDone: true}
    ]);
});
