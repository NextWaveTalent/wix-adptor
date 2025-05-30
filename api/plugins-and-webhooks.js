import { createClient } from '@supabase/supabase-js';
import { externalDatabase } from '@wix/data/service-plugins';

const supabase = createClient(
  'https://qiorojsrqguemncypfhs.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpb3JvanNycWd1ZW1uY3lwZmhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MzA5NzksImV4cCI6MjA1NzMwNjk3OX0.s4YKc2n-LaBs3hmx7l2P75YCahRhMJN_YPn7nR4mfeA'
);

const plugin = externalDatabase.provideHandlers({
  getCapabilities: async () => {
    return {
      capabilities: {
        query: true,
        listCollections: true,
        filtering: false,
        sorting: false,
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
    const limit = request?.paging?.limit || 50;
    const offset = request?.paging?.offset || 0;

    const { data, error } = await supabase
      .from('WixTest_1')
      .select('*')
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('❌ Supabase query error:', error);
      return { items: [], pageToken: null };
    }

    return {
      items: data,
      pageToken: null
    };
  }
});

export default async function handler(req, res) {
  return plugin.process(req, res);
}
