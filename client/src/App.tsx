import React from "react";
import "./App.css";
import Lobby from "./components/Lobby";
import GameEntry from "./components/GameEntry";
import { connect, ConnectedProps } from "react-redux";
import {
  registerUser,
  RootState,
  joinGame,
  createGame,
  setLocalUser,
  startGame,
} from "./reducers";
import { LoguxDispatch } from "@logux/redux/create-logux-creator";
import { Action } from "redux";
import ConnectedGame from "./components/ConnectedGame";
import Game from "./components/Game";

const mapStateToProps = (state: RootState) => {
  return {
    users: state.game.users,
    gameId: state.game.gameId,
    localUser: state.game.localUser,
    inGame: state.game.inGame,
    question: state.game.currentQuestion,
  };
};

const mapDispatchToProps = (dispatch: LoguxDispatch<Action>) => ({
  registerUser: (name: string, gameId: string) => {
    dispatch.sync(registerUser({ name }, { gameId }));
    dispatch(setLocalUser({ name }));
  },
  onJoinGame: (gameId: string) => dispatch(joinGame({ gameId })),
  onCreateGame: () => dispatch(createGame({})),
  onStart: (gameId: string) => dispatch.sync(startGame({ gameId }, { gameId })),
});

const connector = connect(mapStateToProps, mapDispatchToProps as any);
type Props = ConnectedProps<typeof connector>;

const App: React.FunctionComponent<Props> = (props) => {
  return props.gameId ? (
    <ConnectedGame gameId={props.gameId}>
      {props.inGame ? (
        <Game users={props.users} question={props.question} />
      ) : (
        <Lobby
          localUser={props.localUser}
          gameId={props.gameId}
          users={props.users}
          onRegister={(name, gameId) =>
            name ? props.registerUser(name, gameId) : null
          }
          onStart={(gameId: string) => props.onStart(gameId)}
        />
      )}
    </ConnectedGame>
  ) : (
    <GameEntry
      onJoinGame={props.onJoinGame}
      onCreateGame={props.onCreateGame}
    />
  );
};

export default connector(App);
