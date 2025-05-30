import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://qiorojsrqguemncypfhs.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpb3JvanNycWd1ZW1uY3lwZmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MzA5NzksImV4cCI6MjA1NzMwNjk3OX0.s4YKc2n-LaBs3hmx7l2P75YCahRhMJN_YPn7nR4mfeA'
);

export const handlers = {
  getCapabilities: async () => {
    return {
      capabilities: {
        query: true,
        listCollections: true,
        filtering: true,
        sorting: true,
        paging: true
      }
    };
  },

  listCollections: async () => {
    return {
      collections: [
        {
          name: 'WixTest_1',
          displayName: 'WixTest_1',
          fields: [
            { key: 'uid', type: 'text', isPrimary: true },
            { key: 'username', type: 'text' },
            { key: 'follower_count', type: 'number' },
            { key: 'gmv_amount', type: 'number' },
            { key: '_createddate', type: 'datetime' },
            { key: '_updateddate', type: 'datetime' },
            { key: '_owner', type: 'text' }
          ]
        }
      ]
    };
  },

  queryDataItems: async ({ request }) => {
    const { paging } = request;
    const limit = paging?.limit || 50;
    const offset = paging?.offset || 0;

    const { data, error } = await supabase
      .from('WixTest_1')
      .select('*')
      .range(offset, offset + limit - 1);

    if (error) throw new Error(error.message);

    return {
      items: data,
      pageToken: null
    };
  }
};
