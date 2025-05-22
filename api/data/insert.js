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
  
    const item = req.body;
    const { error } = await supabase.from('WixTest_1').insert({
      uid: item._id,
      username: item.username,
      follower_count: item.follower_count,
      gmv_amount: item.gmv_amount,
      _createdDate: new Date().toISOString(),
      _updatedDate: new Date().toISOString(),
      _owner: item._owner ?? null
    });
  
    if (error) return res.status(500).json({ error });
    res.status(201).json({ inserted: true });
  }