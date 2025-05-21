import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  if (req.headers['x-wix-secret'] !== process.env.DATABASE_SECRET) {
    return res.status(403).json({ error: 'Unauthorized: Invalid Secret' });
  }
  
  const { itemId } = req.query;

  const { data, error } = await supabase
    .from('WixTest')
    .select('*')
    .eq('uid', itemId)
    .single();

  if (error || !data) return res.status(404).json({ error: 'Item not found' });

  res.json({ item: { _id: data.uid, ...data } });
}