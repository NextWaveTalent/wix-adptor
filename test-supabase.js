import { createClient } from '@supabase/supabase-js';

// 替换为你自己的 Supabase 项目地址和 anon key
const supabase = createClient(
  'https://qiorojsrqguemncypfhs.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpb3JvanNycWd1ZW1uY3lwZmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MzA5NzksImV4cCI6MjA1NzMwNjk3OX0.s4YKc2n-LaBs3hmx7l2P75YCahRhMJN_YPn7nR4mfeA'

);

(async () => {
  const { data, error } = await supabase
    .from('WixTest_1')
    .select('*')
    .limit(10);

  if (error) {
    console.error('❌ 读取失败:', error.message);
  } else {
    console.log('✅ 成功读取数据:', data);
  }
})();
