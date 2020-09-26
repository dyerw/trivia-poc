import React from 'react';
import './App.css';
import Lobby from './components/Lobby';
import { connect, ConnectedProps } from "react-redux";
import { registerUser, RootState } from "./reducers";
import { LoguxDispatch } from '@logux/redux/create-logux-creator';
import { Action } from 'redux';

const mapStateToProps = (state: RootState) => {
  return {
    users: state.game.users
  }
};

const mapDispatchToProps = (dispatch: LoguxDispatch<Action>) => ({ 
  registerUser: ({ name }: { name: string }) => dispatch.sync(registerUser({ name })) 
});

const connector = connect(mapStateToProps, mapDispatchToProps as any)
type Props = ConnectedProps<typeof connector>;

const App: React.FunctionComponent<Props> = (props) => {
  return (
     <Lobby 
        users={props.users} 
        onRegister={(name) => name ? props.registerUser({ name }) : null } />
  );
}


export default connector(App);
