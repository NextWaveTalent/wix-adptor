// lib/verifyJwt.js
import { createRemoteJWKSet, jwtVerify } from 'jose';

const jwks = createRemoteJWKSet(new URL('https://www.wixapis.com/_api/app-jwks/discovery/keys'));

export async function verifyRequestToken(token) {
  const { payload } = await jwtVerify(token, jwks, {
    issuer: 'wix.com',
    audience: process.env.WIX_APP_ID, // ⚠️ 请设置为你 App 的 ID
  });
  return payload;
}
