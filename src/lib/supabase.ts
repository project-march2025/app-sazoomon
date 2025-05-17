import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';
import Config from 'react-native-config';

console.log('Config.SUPABASE_URL', Config.SUPABASE_URL);
console.log('Config.SUPABASE_ANON_KEY', Config.SUPABASE_ANON_KEY);
export const createSupabase = () =>
  createClient(Config.SUPABASE_URL, Config.SUPABASE_ANON_KEY, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });

export const supabase = createSupabase();
// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state: string) => {
  console.log('change');
  console.log('SUPABASE_URL', Config.SUPABASE_URL);
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
