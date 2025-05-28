import { createClient } from '@supabase/supabase-js';
import { verifyRequestToken } from '../../lib/verifyJwt';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  try {
    const token = req.body;
    const decoded = await verifyRequestToken(token);
    const { request } = decoded.data;
    const item = request.item;

    const { error } = await supabase.from('WixTest_1').insert({
      uid: item._id,
      username: item.username,
      follower_count: item.follower_count,
      gmv_amount: item.gmv_amount,
      _createdDate: new Date().toISOString(),
      _updatedDate: new Date().toISOString(),
      _owner: item._owner || null
    });

    if (error) return res.status(500).json({ error });
    res.status(201).json({ inserted: true });
  } catch (err) {
    console.error('JWT verification failed:', err);
    return res.status(401).json({ error: 'Unauthorized: Invalid JWT' });
  }
}