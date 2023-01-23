import {v1} from 'uuid';
import {TasksStateType} from './../AppWithReducers';
import {removeTaskAC, tasksReducer} from './../reducers/tasks-reducer';

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
