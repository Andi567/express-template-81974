import mongoose from 'mongoose';
import { UsersSchema } from '../schemas/users.mjs';
import { TargetsSchema } from '../schemas/targets.mjs';

export const Users = mongoose.model('Users', UsersSchema);
export const Targets = mongoose.model('Targets', TargetsSchema);
