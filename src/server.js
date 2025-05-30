// ✅ 全面替代 Wix SDK 的自定义 REST API 实现
import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(express.json());

// 🔧 替换为你自己的 Supabase 项目信息
const supabase = createClient(
  'https://qiorojsrqguemncypfhs.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpb3JvanNycWd1ZW1uY3lwZmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MzA5NzksImV4cCI6MjA1NzMwNjk3OX0.s4YKc2n-LaBs3hmx7l2P75YCahRhMJN_YPn7nR4mfeA'
);

// ✅ listCollections handler
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

// ✅ queryDataItems handler
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
    console.error('❌ queryDataItems error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ 通用 fallback
app.all('/plugins-and-webhooks/*', (_, res) => {
  res.status(405).send('Method Not Allowed');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Wix-compatible API running on ${PORT}`));
