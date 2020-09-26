import { Server  } from "@logux/server";
// import { MemoryStore, Log } from "@logux/core";

// const log = new Log({
//     nodeId: 'server',
//     store: new MemoryStore()
// })

const server = new Server(
    Server.loadOptions(process, {
        subprotocol: '1.0.0',
        supports: '1.x',
        root: __dirname
    })
);

server.auth(({userId, token }) => {
    return true;
});

server.channel('game/:id', {
    async access (ctx, action, meta) {
        return true;
    },
    // async load (ctx, action, meta) {
    // }
});

server.type("REGISTER_USER", {
    access (ctx, action, meta) {
        return true;
    },
   resend (ctx, action, meta)  {
       return { channel: "game/1" };
   }
})

server.listen();