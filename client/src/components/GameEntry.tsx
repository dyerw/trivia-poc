import React, { useRef } from "react";
import { Layout, Input, Button } from "antd";

type Props = {
  onJoinGame: (gameId: string) => void;
  onCreateGame: () => void;
};

const GameEntry: React.FunctionComponent<Props> = ({
  onCreateGame,
  onJoinGame,
}) => {
  const inputEl = useRef<Input>(null);
  const joinGame = () => {
    if (inputEl.current?.input) {
      onJoinGame(inputEl.current?.input.value);
    }
  };
  return (
    <Layout>
      <Layout.Content>
        <div>
          <Input ref={inputEl} placeholder="Enter game id" />
          <Button onClick={() => joinGame()}>Join Game</Button>
        </div>
        <div>
          <Button onClick={onCreateGame}>Create Game</Button>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default GameEntry;
