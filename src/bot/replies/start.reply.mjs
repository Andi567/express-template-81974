import { Users } from '../../db/models/index.mjs';

export async function startReply(ctx) {
  const query = { id: ctx.from.id },
    update = ctx.from,
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  await Users.findOneAndUpdate(query, update, options);

  return ctx.reply('Welcome');
}
