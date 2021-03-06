import { combineReducers, Reducer } from "redux";
import actionCreatorFactory, { isType } from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export type Question = {
  text: string;
  a: string;
  b: string;
  c: string;
  d: string;
  answer: "a" | "b" | "c" | "d";
};

export const registerUser = actionCreator<User>("REGISTER_USER");
export type RegisterUserAction = ReturnType<typeof registerUser>;

export const setLocalUser = actionCreator<User>("SET_LOCAL_USER");
export type SetLocalUserAction = ReturnType<typeof setLocalUser>;

export const joinGame = actionCreator<{ gameId: string }>("JOIN_GAME");
export type JoinGameAction = ReturnType<typeof joinGame>;

export const createGame = actionCreator<{}>("CREATE_GAME");
export type CreateGameAction = ReturnType<typeof createGame>;

export const loadGame = actionCreator<{ game: { users: User[] } }>("LOAD_GAME");
export type LoadGameAction = ReturnType<typeof loadGame>;

export const startGame = actionCreator<{ gameId: string }>("START_GAME");
export type StartGameAction = ReturnType<typeof startGame>;

export const askQuestion = actionCreator<{ question: Question }>(
  "ASK_QUESTION"
);
export type AskQuestionAction = ReturnType<typeof askQuestion>;

export type SubscribeAction = { type: "logux/subscribe"; channel: string };
export const subscribe = (channel: string): SubscribeAction => ({
  type: "logux/subscribe",
  channel,
});

type Actions =
  | RegisterUserAction
  | SubscribeAction
  | JoinGameAction
  | SetLocalUserAction
  | StartGameAction
  | CreateGameAction;

export type User = { name: string };

export type State = {
  gameId: string | null;
  inGame: boolean;
  users: User[];
  localUser: User | null;
  currentQuestion: Question | null;
};

const initialState = {
  gameId: null,
  users: [],
  localUser: null,
  inGame: false,
  currentQuestion: null,
};

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const generateGameName = (length: number): string =>
  length === 0
    ? ""
    : generateGameName(length - 1) +
      letters.split("")[Math.floor(Math.random() * letters.length)];

const reducer: Reducer<State, Actions> = (state = initialState, action) => {
  if (isType(action, registerUser)) {
    return {
      ...state,
      users: [...state.users, action.payload],
    };
  }
  if (isType(action, joinGame)) {
    return {
      ...state,
      gameId: action.payload.gameId.toUpperCase(),
    };
  }
  if (isType(action, createGame)) {
    return {
      ...state,
      gameId: generateGameName(4),
    };
  }
  if (isType(action, setLocalUser)) {
    return {
      ...state,
      localUser: action.payload,
    };
  }
  if (isType(action, loadGame)) {
    return {
      ...state,
      users: action.payload.game.users,
    };
  }
  if (isType(action, startGame)) {
    return {
      ...state,
      inGame: true,
    };
  }
  if (isType(action, askQuestion)) {
    return {
      ...state,
      currentQuestion: action.payload.question,
    };
  }
  return state;
};

const combinedReducers = combineReducers({
  game: reducer,
});
export default combinedReducers;

export type RootState = ReturnType<typeof combinedReducers>;
