import { combineReducers, Reducer } from "redux";
import actionCreatorFactory, { isType } from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const registerUser = actionCreator<{name: string}>('REGISTER_USER');
export type RegisterUserAction = ReturnType<typeof registerUser>;


export type SubscribeAction = { type: "logux/subscribe", channel: string }; 
export const subscribe = (channel: string): SubscribeAction => ({ type: "logux/subscribe", channel }); 

type Actions = RegisterUserAction | SubscribeAction;

export type User = { name: string };
export type State = {
    users: User[];
}

const initialState = {
    users: []
};

 const reducer: Reducer<State, Actions> = (state = initialState, action) => {
    if (isType(action, registerUser)) {
        return {
            ...state,
            users: [...state.users, { name: action.payload.name }]
        }
    }
    return state;
}

const combinedReducers = combineReducers({
    game: reducer
});
export default combinedReducers;

export type RootState = ReturnType<typeof combinedReducers>;