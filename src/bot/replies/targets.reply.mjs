import { getTargetsByUserId } from '../../db/queries/index.mjs';

export async function targetsReply(ctx) {
  const targets = await getTargetsByUserId(ctx.from.id);

  const msg = targets
    .map(
      ({ tradeMethod, targetDiff, minAmount, maxAmount }) =>
        `${tradeMethod}: ${targetDiff}% ${minAmount}-${maxAmount}`
    )
    .join('\n');

  return ctx.reply(msg);
}
