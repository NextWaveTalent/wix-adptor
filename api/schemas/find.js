import { verifyRequestToken } from '../../lib/verifyJwt';

export default async function handler(req, res) {
  console.log('🔥 schemas/find called');

  try {
    const token = req.body; // Wix sends the JWT in POST body
    const decoded = await verifyRequestToken(token);

    return res.json([
      {
        id: "@nextwavehostcenter/supabase.WixTest_1",
        displayName: "WixTest_1",
        fields: [
          { key: "_id", type: "text", isPrimary: true },
          { key: "username", type: "text" },
          { key: "follower_count", type: "number" },
          { key: "gmv_amount", type: "number" },
          { key: "_createdDate", type: "datetime" },
          { key: "_updatedDate", type: "datetime" },
          { key: "_owner", type: "text" }
        ]
      }
    ]);
  } catch (err) {
    console.error("❌ JWT verify failed in /schemas/find", err);
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
