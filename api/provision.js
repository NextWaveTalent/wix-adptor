export default async function handler(req, res) {
    return res.json({
      provider: "supabase-adaptor",
      capabilities: {
        insert: true,
        update: true,
        delete: true,
        count: true,
        read: true
      }
    });
  }