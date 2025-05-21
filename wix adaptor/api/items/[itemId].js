import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  const { itemId } = req.query;

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', itemId)
    .single();

  if (error) return res.status(500).json({ error });
  res.json({ item: { _id: data.id, ...data } });
}
