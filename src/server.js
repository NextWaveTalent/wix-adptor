// src/server.js
import { externalDatabase } from '@wix/data/service-plugins';
import { handlers } from './handlers.js';

const plugin = externalDatabase.provideHandlers(handlers);

export default async function handler(req, res) {
  console.log('📥 Request received:', req.method, req.url);
  try {
    if (req.method === 'POST') {
      await plugin.process(req, res);  // ⬅️ 正确 await 让响应流写入
    } else {
      res.status(405).send('Method Not Allowed');
    }
  } catch (err) {
    console.error('❌ Handler error:', err);
    res.status(500).send('Internal Server Error');
  }
}
