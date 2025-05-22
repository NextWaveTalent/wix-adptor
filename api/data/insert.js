export default async function handler(req, res) {
    const receivedSecret = req.headers['x-wix-secret'];
    if (receivedSecret !== process.env.DATABASE_SECRET) {
      return res.status(403).json({ error: 'Unauthorized: Invalid Secret' });
    }
  
    const item = req.body;
    const { error } = await supabase.from('WixTest').insert({
      uid: item._id,
      username: item.username,
      follower_count: item.follower_count,
      gmv_amount: item.gmv_amount,
      _createdDate: new Date().toISOString(),
      _updatedDate: new Date().toISOString()
    });
  
    if (error) return res.status(500).json({ error });
    res.status(201).json({ inserted: true });
  }
  