export default async function handler(req, res) {
    console.log('🔥 /schemas/find called')
    return res.json([
      {
        id: "WixTest_1",
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
  }