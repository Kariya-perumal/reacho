import { createClient } from '@supabase/supabase-js';
import { triggerRestore } from './db-wake.js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

if (url && key) {
  try {
    supabase = createClient(url, key, {
      global: {
        fetch: async (fetchUrl, options) => {
          try {
            const res = await fetch(fetchUrl, options);
            if (!res.ok && res.status >= 500) triggerRestore();
            return res;
          } catch (err) {
            triggerRestore();
            throw err;
          }
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
  }
}

export default supabase;
