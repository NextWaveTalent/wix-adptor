import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  const { itemId } = req.query;

  const { data, error } = await supabase
    .from('WixTest')
    .select('*')
    .eq('uid', itemId)
    .single();

  if (error || !data) return res.status(404).json({ error: 'Item not found' });

  res.json({ item: { _id: data.uid, ...data } });
}