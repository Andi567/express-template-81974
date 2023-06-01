import { mainEc2Id, proxyEc2Ids } from '../../aws/data.mjs';
import { startEBSInst } from '../../aws/index.mjs';

export function startAction(ctx) {
  startEBSInst({ InstanceIds: [mainEc2Id, ...proxyEc2Ids] });
  ctx.editMessageText('Starting...');
}
