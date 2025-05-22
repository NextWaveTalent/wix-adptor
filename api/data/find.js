import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const receivedSecret = req.headers['x-wix-secret'];
  if (receivedSecret !== process.env.DATABASE_SECRET) {
    return res.status(403).json({ error: 'Unauthorized: Invalid Secret' });
  }

  const { filter = {} } = req.body;
  let query = supabase.from('WixTest').select('*');
  if (filter._id) query = query.eq('uid', filter._id);
  const { data, error } = await query;
  if (error) return res.status(500).json({ error });

  const items = data.map(item => ({ _id: item.uid, ...item }));
  res.json({ items });
}