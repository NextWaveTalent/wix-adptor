// src/server.js
import express from 'express';
import { createClient } from '@supabase/supabase-js';
import { parse } from 'url';

const app = express();
app.use(express.json());

const supabase = createClient(
  'https://qiorojsrqguemncypfhs.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpb3JvanNycWd1ZW1uY3lwZmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MzA5NzksImV4cCI6MjA1NzMwNjk3OX0.s4YKc2n-LaBs3hmx7l2P75YCahRhMJN_YPn7nR4mfeA'
);

// your listCollections and queryDataItems handlers here
app.post('/plugins-and-webhooks/listCollections', (req, res) => {
  res.json({
    collections: [
      {
        name: 'WixTest_1',
        displayName: 'WixTest_1',
        fields: [
          { key: 'uid', type: 'text', isPrimary: true },
          { key: 'username', type: 'text' },
          { key: 'follower_count', type: 'number' },
          { key: 'gmv_amount', type: 'number' },
          { key: '_createddate', type: 'datetime' },
          { key: '_updateddate', type: 'datetime' },
          { key: '_owner', type: 'text' }
        ]
      }
    ]
  });
});

app.post('/plugins-and-webhooks/queryDataItems', async (req, res) => {
  const { paging } = req.body.request || {};
  const limit = paging?.limit || 50;
  const offset = paging?.offset || 0;

  try {
    const { data, error } = await supabase
      .from('WixTest_1')
      .select('*')
      .range(offset, offset + limit - 1);
    if (error) throw error;
    res.json({ items: data, pageToken: null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 正确的 Vercel Serverless 导出
export default function handler(req, res) {
  const parsedUrl = parse(req.url, true);
  app(req, res, parsedUrl);
}
