import * as dotenv from 'dotenv';
dotenv.config();

import { Telegraf } from 'telegraf';

export const bot = new Telegraf(process.env.BOT_TOKEN);
