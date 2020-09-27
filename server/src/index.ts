import { Server } from "@logux/server";
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
const initialGame: Game = { users: [] };

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
    const game = games[params.id];
    return { type: "LOAD_GAME", payload: { game } };
  },
});

server.type("REGISTER_USER", {
  process(ctx, action, meta) {
    const gameId = action.meta.gameId;
    if (!games[gameId]) {
      games[gameId] = initialGame;
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

server.listen();
