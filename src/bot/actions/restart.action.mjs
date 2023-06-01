import { mainEc2Id, proxyEc2Ids } from '../../aws/data.mjs';
import { rebootInst } from '../../aws/index.mjs';

export function restartAction(ctx) {
  rebootInst({ InstanceIds: [mainEc2Id, ...proxyEc2Ids] });
  ctx.editMessageText('Restarting...');
}
