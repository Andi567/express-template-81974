import { Markup } from 'telegraf';
import { mainEc2Id, proxyEc2Ids } from '../../aws/data.mjs';
import { getInstInfo } from '../../aws/index.mjs';
import { isAuth } from '../helpers.mjs';

const inlineMessageInstanceKeyboard = Markup.inlineKeyboard([
  Markup.button.callback('▶️ Start', 'start'),
  Markup.button.callback('🔃 Restart', 'restart'),
  Markup.button.callback('⏸️ Stop', 'stop')
]);

export async function statusReply(ctx) {
  const rows = [];

  const [mainData, proxiesData] = await Promise.all([
    getInstInfo({
      InstanceIds: [mainEc2Id]
    }),
    getInstInfo({
      InstanceIds: proxyEc2Ids
    })
  ]);

  rows.push(
    `${
      mainData[0].Instances[0].State.Name === 'running' ? '🟢' : '🔴'
    } Main VM: ${mainData[0].Instances[0].PublicIpAddress}`,
    `${mainData[0].Instances[0].PublicDnsName}\n`
  );

  rows.push(`Proxies`);
  proxiesData.forEach((record, i) => {
    rows.push(
      `${
        record.Instances[0].State.Name === 'running' ? '🟢' : '🔴'
      } Proxy ${i}: ${record.Instances[0].PublicIpAddress}`
    );
  });

  const msg = rows.join('\n');

  return isAuth(ctx)
    ? await ctx.telegram.sendMessage(
        ctx.from.id,
        msg,
        inlineMessageInstanceKeyboard
      )
    : await ctx.reply('Not authorized');
}
