import React, { useRef } from "react";
import { User } from "../reducers";
import { useSubscription } from "@logux/redux";
import { Layout, Input, Button, Row } from "antd";
const { Header, Content } = Layout;

export type Props = {
  gameId: string;
  users: readonly User[];
  onRegister: (name: string | undefined, gameId: string) => void;
  localUser: User | null;
  onStart: (gameId: string) => void;
};

const Lobby: React.FunctionComponent<Props> = ({
  users,
  gameId,
  onRegister,
  localUser,
  onStart,
}) => {
  const isSubscribing = useSubscription([`game/${gameId}`]);
  const inputEl = useRef<Input>(null);
  if (isSubscribing) {
    return <div>Connecting to game...</div>;
  }
  return (
    <Layout>
      <Header>Lobby</Header>
      <Content>
        Lobby Code: {gameId}
        {!localUser && (
          <>
            <Input ref={inputEl} />
            <Button
              type="primary"
              onClick={() =>
                inputEl && onRegister(inputEl.current?.input.value, gameId)
              }
            >
              Register
            </Button>
          </>
        )}
        {localUser && (
          <Button type="primary" onClick={() => onStart(gameId)}>
            Start Game
          </Button>
        )}
        <>
          {users.map((u) => (
            <Row key={u.name}>{u.name}</Row>
          ))}
        </>
      </Content>
    </Layout>
  );
};

export default Lobby;
