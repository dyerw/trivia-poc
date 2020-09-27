import React, { useRef } from "react";
import { User } from "../reducers";
import { useSubscription } from "@logux/redux";
import { Layout, Input, Button } from "antd";
const { Header, Content, Sider } = Layout;

export type Props = {
  gameId: string;
  users: readonly User[];
  onRegister: (name: string | undefined, gameId: string) => void;
  localUser: User | null;
};

const Lobby: React.FunctionComponent<Props> = ({
  users,
  gameId,
  onRegister,
  localUser,
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
        {users.map((u) => u.name)}
      </Content>
    </Layout>
  );
};

export default Lobby;
