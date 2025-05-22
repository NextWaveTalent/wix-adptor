export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
    const receivedSecret = req.headers['x-wix-secret'];
    if (receivedSecret !== process.env.DATABASE_SECRET) {
      return res.status(403).json({ error: 'Unauthorized: Invalid Secret' });
    }
  
    const { _id } = req.body;
    const { error } = await supabase.from('WixTest').delete().eq('uid', _id);
    if (error) return res.status(500).json({ error });
    res.json({ deleted: true });
  }