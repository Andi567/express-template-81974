import { Targets } from '../models/index.mjs';

export async function getAllTargets() {
  return await Targets.find({});
}

export async function getTargetsByUserId(id) {
  return await Targets.find({ userId: id }).exec();
}
