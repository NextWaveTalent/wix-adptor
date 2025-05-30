import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qiorojsrqguemncypfhs.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpb3JvanNycWd1ZW1uY3lwZmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MzA5NzksImV4cCI6MjA1NzMwNjk3OX0.s4YKc2n-LaBs3hmx7l2P75YCahRhMJN_YPn7nR4mfeA'
);

export default async function handler(req, res) {
  if (req.method === 'POST' && req.url.includes('listCollections')) {
    return res.json({
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
  }

  if (req.method === 'POST' && req.url.includes('queryDataItems')) {
    const { paging } = req.body?.request || {};
    const limit = paging?.limit || 50;
    const offset = paging?.offset || 0;

    const { data, error } = await supabase
      .from('WixTest_1')
      .select('*')
      .range(offset, offset + limit - 1);

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ items: data, pageToken: null });
  }

  return res.status(405).send('Method Not Allowed');
}
