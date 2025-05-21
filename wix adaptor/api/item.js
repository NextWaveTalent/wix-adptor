import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('products').select('*');
    if (error) return res.status(500).json({ error });
    const items = data.map(item => ({ _id: item.id, ...item }));
    return res.json({ items });
  }

  if (req.method === 'POST') {
    const { filter } = req.body;
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .ilike('name', `%${filter?.name || ''}%`); // 示例：模糊查询 name 字段

    if (error) return res.status(500).json({ error });
    const items = data.map(item => ({ _id: item.id, ...item }));
    return res.json({ items });
  }

  res.status(405).end();
}
