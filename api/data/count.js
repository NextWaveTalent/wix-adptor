export const config = {
    api: {
      bodyParser: true
    }
  };
  
export default async function handler(req, res) {
    const receivedSecret = req.headers['x-wix-secret'] || req.headers['X-Wix-Secret'];
    if (receivedSecret !== process.env.DATABASE_SECRET) {
      return res.status(403).json({ error: 'Unauthorized: Invalid Secret' });
    }
  
    const { filter = {} } = req.body;
    let query = supabase.from('WixTest_1').select('*', { count: 'exact', head: true });
    if (filter._id) query = query.eq('uid', filter._id);
  
    const { count, error } = await query;
    if (error) return res.status(500).json({ error });
  
    res.json({ totalCount: count });
  }