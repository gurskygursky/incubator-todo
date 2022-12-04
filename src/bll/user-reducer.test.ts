import {
    UserStateType,
    userReducer,
    IncrementUserAgeAC,
    IncrementUserChildrenCountAC,
    ChangeUserNameAC
} from './user-reducer';

test('user reducer should increment only age', () => {

   const startState: UserStateType = {age: 20, name: 'Dimych', childrenCount: 0};

   // const endState = userReducer(startState, {type: 'INCREMENT_AGE'});
   const endState = userReducer(startState, IncrementUserAgeAC(startState.age + 1));

   expect(endState.age).toBe(21);
   expect(endState.name).toEqual('Dimych');
   expect(endState.childrenCount).toBe(0);
});

test('user reducer should increment only childrenCount', () => {

    const startState: UserStateType = {age: 20, name: 'Dimych', childrenCount: 0};

    // const endState = userReducer(startState, {type: 'INCREMENT_CHILDREN_COUNT'});
    const endState = userReducer(startState, IncrementUserChildrenCountAC(startState.childrenCount + 1));

    expect(endState.age).toBe(20);
    expect(endState.name).toEqual('Dimych');
    expect(endState.childrenCount).toBe(1);
});

test('user reducer should change name of user', () => {

    const startState: UserStateType = {age: 20, name: 'Dimych', childrenCount: 0};

    // const endState = userReducer(startState, {type: 'CHANGE_USER_NAME', name: 'Petya'});
    const endState = userReducer(startState, ChangeUserNameAC('Petya'));

    expect(endState.age).toBe(20);
    expect(endState.name).toEqual('Petya');
    expect(endState.childrenCount).toBe(0);
});

