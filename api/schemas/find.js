export default async function handler(req, res) {
    return res.json([
      {
        id: "WixTest",
        displayName: "WixTest",
        fields: [
          { key: "_id", type: "text", isPrimary: true },
          { key: "username", type: "text" },
          { key: "follower_count", type: "number" },
          { key: "gmv_amount", type: "number" },
          { key: "_createdDate", type: "datetime" },
          { key: "_updatedDate", type: "datetime" }
        ]
      }
    ]);
  }