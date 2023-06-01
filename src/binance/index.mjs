import * as dotenv from 'dotenv';
dotenv.config();

import { BinanceP2P } from './api.mjs';

if (!process.env.BINANCE_ACCESS_KEY)
  throw new Error('Please add a Binance access key');
if (!process.env.BINANCE_SECRET_KEY)
  throw new Error('Please add a Binance secret key');

export const p2p = new BinanceP2P({
  accessKey: process.env.BINANCE_ACCESS_KEY,
  secretKey: process.env.BINANCE_SECRET_KEY
});
