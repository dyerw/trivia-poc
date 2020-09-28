import React from "react";

import { useSubscription } from "@logux/redux";

type Props = {
  gameId: string;
};

const ConnectedGame: React.FunctionComponent<Props> = (props) => {
  const isSubscribing = useSubscription([`game/${props.gameId}`]);
  if (isSubscribing) {
    return <div>Connecting to game...</div>;
  }
  return <>{props.children}</>;
};

export default ConnectedGame;
