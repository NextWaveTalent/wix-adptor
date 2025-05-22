export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
    const receivedSecret = req.headers['x-wix-secret'];
    if (receivedSecret !== process.env.DATABASE_SECRET) {
      return res.status(403).json({ error: 'Unauthorized: Invalid Secret' });
    }
  
    const { filter = {} } = req.body;
    let query = supabase.from('WixTest').select('*', { count: 'exact', head: true });
    if (filter._id) query = query.eq('uid', filter._id);
  
    const { count, error } = await query;
    if (error) return res.status(500).json({ error });
  
    res.json({ totalCount: count });
  }