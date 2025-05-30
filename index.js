import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const app = express();
app.use(bodyParser.json());

// ✅ Supabase 客户端
const supabase = createSupabaseClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ✅ 明确注册 handler 映射
const handlers = {
  getCapabilities: async () => ({
    supportedFeatures: ['listCollections', 'queryDataItems'],
  }),

  listCollections: async () => {
    const { data, error } = await supabase.rpc('list_tables');
    if (error) throw new Error(error.message);
    return {
      collections: data.map((table) => ({
        name: table,
        displayName: table,
      })),
    };
  },

  queryDataItems: async ({ request }) => {
    const { collectionName, paging } = request;
    const { data, error } = await supabase
      .from(collectionName)
      .select('*')
      .range(paging.offset, paging.offset + paging.limit - 1);
    if (error) throw new Error(error.message);
    return {
      dataItems: data.map((item) => ({ data: item })),
    };
  },
};

// ✅ 自定义路由处理逻辑
app.post('/plugins-and-webhooks/:operation', async (req, res) => {
  const operation = req.params.operation;
  const handler = handlers[operation];

  if (!handler) {
    return res.status(404).json({ error: `No handler for ${operation}` });
  }

  try {
    const result = await handler({ request: req.body, metadata: {} });
    res.json(result);
  } catch (err) {
    console.error('❌ Handler error:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Plugin listening on http://localhost:${PORT}`)
);