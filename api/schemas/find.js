export const config = {
  api: {
    bodyParser: true
  }
};

export default async function handler(req, res) {
  console.log('🔥 /schemas/find called');

  try {
    return res.json([
      {
        id: "@nextwavehostcenter/supabase.WixTest_1",  // 👈 确保与 extension namespace 一致
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
    console.error("❌ schemas/find error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
