import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
    const receivedSecret = req.headers['x-wix-secret'] || req.headers['X-Wix-Secret'];
  if (receivedSecret !== process.env.DATABASE_SECRET) {
    return res.status(403).json({ error: 'Unauthorized: Invalid Secret' });
  }

  const { _id } = req.body;
  const { error } = await supabase.from('WixTest_1').delete().eq('uid', _id);
  if (error) return res.status(500).json({ error });
  res.json({ deleted: true });
}
