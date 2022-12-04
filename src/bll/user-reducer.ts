export type UserStateType = {
    age: number
    childrenCount: number
    name: string
}

type ActionType = {
    type: string
    [key: string]: any
}

enum USER_ACTION {
    INCREMENT_USER_AGE = 'INCREMENT_USER_AGE',
    INCREMENT_USER_CHILDREN_COUNT = 'INCREMENT_USER_CHILDREN_COUNT',
    CHANGE_USER_NAME = 'CHANGE_USER_NAME',
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const userReducer = (state: UserStateType, action: ActionsType): UserStateType => {
    switch (action.type) {
        case USER_ACTION.INCREMENT_USER_AGE: {
            // case 'INCREMENT_AGE': {
            return {
                // ...state, age: state.age + 1
                ...state, age: action.payload.age
            }
        }
        // state.age = state.age + 1
        // return state
        case USER_ACTION.INCREMENT_USER_CHILDREN_COUNT: {
            // case 'INCREMENT_CHILDREN_COUNT': {
            // return {...state, childrenCount: state.childrenCount + 1}
            return {
                ...state, childrenCount: action.payload.childrenCount
            }
        }
        // state.childrenCount = state.childrenCount + 1
        // return state
        case USER_ACTION.CHANGE_USER_NAME: {
            // case 'CHANGE_USER_NAME': {
            // return {...state, name: action.name}
            return {...state, name: action.payload.name}
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}

//actions
export const IncrementUserAgeAC = (age: number) => {
    return {
        type: USER_ACTION.INCREMENT_USER_AGE,
        payload: {
            age
        }
    } as const
}
export const IncrementUserChildrenCountAC = (childrenCount: number) => {
    return {
        type: USER_ACTION.INCREMENT_USER_CHILDREN_COUNT,
        payload: {
            childrenCount
        }
    } as const
}
export const ChangeUserNameAC = (name: string) => {
    return {
        type: USER_ACTION.CHANGE_USER_NAME,
        payload: {
            name
        }
    } as const
}

//types
export type ActionsType = ReturnType<typeof IncrementUserAgeAC>
    | ReturnType<typeof IncrementUserChildrenCountAC>
    | ReturnType<typeof ChangeUserNameAC>;


