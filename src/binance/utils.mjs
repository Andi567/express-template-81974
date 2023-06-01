import sha256 from 'js-sha256';

export function createSignature(secret, data) {
  return sha256.hmac.create(secret).update(data).hex();
}

export function objectToQuerystring(data) {
  return Object.keys(data)
    .map((key) => key + '=' + data[key])
    .join('&');
}
