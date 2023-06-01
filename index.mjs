import mongoose from "mongoose";

import { bot } from "./src/bot/index.mjs";

import "./src/server/index.mjs";

import { statusReply } from "./src/bot/replies/status.reply.mjs";
import {
    restartAction,
    startAction,
    stopAction,
} from "./src/bot/actions/index.mjs";
import { p2p } from "./src/binance/index.mjs";

// import { Targets, Users } from "./src/db/models/index.mjs";
// import { getTargetsByUserId } from "./src/db/queries/index.mjs";
import { targetsReply } from "./src/bot/replies/targets.reply.mjs";
import { startReply } from "./src/bot/replies/start.reply.mjs";

try {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log("MongoDB connected");
} catch (e) {
    console.log("MongoDB connection error", e);
}

bot.start((ctx) => startReply(ctx));

bot.hears("/status", (ctx) => statusReply(ctx));
bot.hears("/targets", (ctx) => targetsReply(ctx));

bot.hears("/orders", async (ctx) => {
    const orders = await p2p.fetchTradeHistory();
    return ctx.reply(JSON.stringify(orders));
});

bot.action("start", (ctx) => startAction(ctx));
bot.action("restart", (ctx) => restartAction(ctx));
bot.action("stop", (ctx) => stopAction(ctx));

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
