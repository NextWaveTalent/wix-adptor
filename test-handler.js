// test-server.js
import express from 'express';
import handler from './api/plugins-and-webhooks.js';

const app = express();
app.use(express.json());

app.post('/api/plugins-and-webhooks', (req, res) => {
  // 模拟 Vercel 传给 handler 的参数结构
  handler(req, res);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Local test server running on http://localhost:${PORT}`);
});
