import { createClient } from '@supabase/supabase-js';
import { verifyRequestToken } from '../../lib/verifyJwt';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  try {
    const token = req.body;  // Wix 发送的 JWT
    const decoded = await verifyRequestToken(token);

    const { request } = decoded.data;
    const { filter = {} } = request;

    let query = supabase.from('WixTest_1').select('*');
    if (filter._id) query = query.eq('uid', filter._id);

    const { data, error } = await query;
    if (error) return res.status(500).json({ error });

    const items = data.map(item => ({
      _id: item.uid,
      ...item
    }));

    res.json({ items });

  } catch (err) {
    console.error('JWT verification failed:', err);
    return res.status(401).json({ error: 'Unauthorized: Invalid JWT' });
  }
}
