import { handlers } from './src/handlers.js';

// 可选：模拟 payload
const mockQueryPayload = {
  request: {
    paging: {
      limit: 10,
      offset: 0
    }
  }
};

(async () => {
  console.log('➡️ Testing getCapabilities...');
  const cap = await handlers.getCapabilities();
  console.log(cap);

  console.log('\n➡️ Testing listCollections...');
  const cols = await handlers.listCollections();
  console.log(cols);

  console.log('\n➡️ Testing queryDataItems...');
  const data = await handlers.queryDataItems(mockQueryPayload);
  console.log(JSON.stringify(data, null, 2));
})();
