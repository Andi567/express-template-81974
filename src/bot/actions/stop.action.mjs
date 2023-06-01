import { mainEc2Id, proxyEc2Ids } from '../../aws/data.mjs';
import { stopEBSInst } from '../../aws/index.mjs';

export function stopAction(ctx) {
  stopEBSInst({ InstanceIds: [mainEc2Id, ...proxyEc2Ids] });
  ctx.editMessageText('Stoping...');
}
