export default async function handler(req, res) {
    const receivedSecret = req.headers['x-wix-secret'];
    if (receivedSecret !== process.env.DATABASE_SECRET) {
      return res.status(403).json({ error: 'Unauthorized: Invalid Secret' });
    }
  
    const { _id } = req.body;
    const { data, error } = await supabase.from('WixTest_1').select('*').eq('uid', _id).maybeSingle();
    if (error || !data) return res.status(404).json({ error: 'Item not found' });
  
    res.json({ _id: data.uid, ...data });
  }