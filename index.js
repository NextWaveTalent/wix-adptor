import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const app = express();
app.use(bodyParser.json());

const supabase = createSupabaseClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ✅ 仅支持 WixTest_1 的 handler 映射
const handlers = {
  getCapabilities: async () => ({
    supportedFeatures: ['listCollections', 'queryDataItems'],
  }),

  listCollections: async () => {
    return {
      collections: [
        {
          name: 'WixTest_1',
          displayName: 'WixTest_1',
        },
      ],
    };
  },

  queryDataItems: async ({ request }) => {
    const { collectionName, paging = {} } = request;
    if (collectionName !== 'WixTest_1') {
      throw new Error(`Unsupported collection: ${collectionName}`);
    }

    const offset = paging.offset ?? 0;
    const limit = paging.limit ?? 50;

    const { data, error } = await supabase
      .from('WixTest_1')
      .select('*')
      .range(offset, offset + limit - 1);

    if (error) throw new Error(error.message);
    return {
      dataItems: data.map((item) => ({ data: item })),
    };
  },
};

// ✅ v2 路由（基础调用）
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

// ✅ v3 路由（Wix CMS 使用）
const v3ToHandler = {
  capabilities: 'getCapabilities',
  collections: 'listCollections',
  items: 'queryDataItems',
};

app.post('/plugins-and-webhooks/v3/:type/:action', async (req, res) => {
  const type = req.params.type;
  const action = req.params.action;
  const operation = v3ToHandler[type];

  if (!operation || !handlers[operation]) {
    return res.status(404).json({ error: `No handler for v3/${type}/${action}` });
  }

  try {
    const result = await handlers[operation]({ request: req.body, metadata: {} });
    res.json(result);
  } catch (err) {
    console.error('❌ v3 route error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ 健康检查
app.get('/ping', (req, res) => {
  res.send('pong');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Plugin listening on http://localhost:${PORT}`)
);

