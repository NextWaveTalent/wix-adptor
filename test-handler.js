import fetch from 'node-fetch';

const test = async () => {
  const res = await fetch('http://localhost:3000/api/plugins-and-webhooks?op=listCollections', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });

  const json = await res.json();
  console.log('✅ 测试结果:', JSON.stringify(json, null, 2));
};

test();