export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    return res.json({
      provider: "supabase-adaptor",
      capabilities: {
        insert: true,
        update: true,
        delete: true,
        count: true
      }
    });
  }
  