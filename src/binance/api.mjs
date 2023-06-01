import axios from 'axios';

import { createSignature, objectToQuerystring } from './utils.mjs';

import { URLS } from './urls.mjs';
import { ORDER_TYPES } from './constants.mjs';

export class BinanceP2P {
  constructor(config) {
    this.baseUrl = config.baseUrl || URLS.BASE_URL;
    this.accessKey = config.accessKey;
    this.secretKey = config.secretKey;
    this.http = axios.create({
      headers: {
        'X-MBX-APIKEY': config.accessKey
      }
    });
  }

  _createRequestPayload(endpoint, rawData) {
    const data = rawData;
    data.signature = createSignature(this.secretKey, objectToQuerystring(data));
    const url = `${this.baseUrl}${endpoint}?${objectToQuerystring(data)}`;

    return { url, data };
  }

  async fetchTradeHistory(params) {
    const { url } = this._createRequestPayload(URLS.TRADE_HISTORY, {
      tradeType: params?.tradeType || ORDER_TYPES.BUY,
      timestamp: Date.now()
    });

    const result = await this.http.get(url).then((response) => response.data);

    return result;
  }
}
