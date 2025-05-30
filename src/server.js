// src/server.js
import { externalDatabase } from '@wix/data/service-plugins';
import { handlers } from './handlers.js';

const plugin = externalDatabase.provideHandlers(handlers);

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      await plugin.process(req, res);
    } else {
      res.status(405).send('Method Not Allowed');
    }
  } catch (err) {
    console.error('Handler error:', err);
    res.status(500).send('Internal Server Error');
  }
}
