import { Server } from "@logux/server";
import { getQuestion } from "./questions";
// import { MemoryStore, Log } from "@logux/core";

// const log = new Log({
//     nodeId: 'server',
//     store: new MemoryStore()
// })

type User = { name: string };
type Game = {
  users: User[];
};
type Games = Record<string, Game>;
const games: Games = {};
const initialGame = (): Game => ({
  users: [],
});

const server = new Server(
  Server.loadOptions(process, {
    subprotocol: "1.0.0",
    supports: "1.x",
    root: __dirname,
  })
);

server.auth(({ userId, token }) => {
  return true;
});

server.channel("game/:id", {
  async access(ctx, action, meta) {
    return true;
  },
  async load(ctx, action, meta) {
    const params: any = ctx.params;
    const game: Game = games[params.id] || initialGame();
    return { type: "LOAD_GAME", payload: { game } };
  },
});

server.type("REGISTER_USER", {
  process(ctx, action, meta) {
    const gameId = action.meta.gameId;
    if (!games[gameId]) {
      games[gameId] = initialGame();
    }
    games[gameId].users.push(action.payload);
  },
  access(ctx, action, meta) {
    return true;
  },
  resend(ctx, action, meta) {
    return { channel: `game/${action.meta.gameId}` };
  },
});

const askQuestion = (gameId: string) => {
  server.log.add({
    type: "ASK_QUESTION",
    payload: { question: getQuestion() },
    meta: { gameId },
  });
  setTimeout(() => askQuestion(gameId), 5000);
};

server.type("ASK_QUESTION", {
  access(ctx, action, meta) {
    return true;
  },
  resend(ctx, action, meta) {
    return { channel: `game/${action.meta.gameId}` };
  },
});

server.type("START_GAME", {
  process(ctx, action, meta) {
    askQuestion(action.meta.gameId);
  },
  access(ctx, action, meta) {
    return true;
  },
  resend(ctx, action, meta) {
    return { channel: `game/${action.meta.gameId}` };
  },
});

server.listen();
