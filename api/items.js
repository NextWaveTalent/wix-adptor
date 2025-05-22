import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {

  console.log('🧪 Incoming headers:', req.headers);
  
  const receivedSecret =
  req.headers['x-wix-secret'] || req.headers['X-Wix-Secret'];
  
  if (receivedSecret !== process.env.DATABASE_SECRET) {
    return res.status(403).json({ error: 'Unauthorized: Invalid Secret' });
  }
  
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('WixTest').select('*');
    if (error) return res.status(500).json({ error });

    const items = data.map(item => ({
      _id: item.uid, // Wix 要求唯一 _id 字段
      ...item
    }));

    return res.json({ items });
  }

  if (req.method === 'POST') {
    const { filter } = req.body;


    const { data, error } = await supabase.from('WixTest').select('*');
    if (error) return res.status(500).json({ error });

    const items = data.map(item => ({
      _id: item.uid,
      ...item
    }));

    return res.json({ items });
  }

  res.status(405).json({ error: 'Method not allowed' });
}