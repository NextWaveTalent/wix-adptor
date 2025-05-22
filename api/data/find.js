// /api/data/find.js
import { createClient } from '@supabase/supabase-js';

// 初始化 Supabase 客户端
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

export default async function handler(req, res) {
  // 日志输出 headers，便于调试
  console.log('🧪 Headers:', req.headers);
  console.log('🧪 Received Secret:', req.headers['x-wix-secret']);
  console.log('🔐 Expected Secret:', process.env.DATABASE_SECRET);


  const receivedSecret = req.headers['x-wix-secret'] || req.headers['X-Wix-Secret'];

  if (receivedSecret !== process.env.DATABASE_SECRET) {
    console.log('⛔ Invalid secret:', receivedSecret, '| Expected:', process.env.DATABASE_SECRET);
    return res.status(403).json({ error: 'Unauthorized: Invalid Secret' });
  }

  // 获取过滤条件
  const { filter = {} } = req.body;

  // 查询表名应为 WixTest_1（你提供的表名）
  let query = supabase.from('WixTest_1').select('*');

  // 如果 filter 中传了 _id，则加上条件
  if (filter._id) {
    query = query.eq('uid', filter._id);
  }

  const { data, error } = await query;

  if (error) {
    console.error('❌ Supabase query error:', error);
    return res.status(500).json({ error });
  }

  // 返回符合 Wix 要求的结构（必须有 _id 字段）
  const items = data.map(item => ({
    _id: item.uid,
    ...item
  }));

  res.json({ items });
}
