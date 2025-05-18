import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { AppState } from 'react-native';
import Config from 'react-native-config';

const supabaseUrl = 'https://rykosgsoavrpqqkwstuu.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5a29zZ3NvYXZycHFxa3dzdHV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MjUwMjcsImV4cCI6MjA2MjAwMTAyN30.yOgKXU1zpuE9QbYpz7d3bj2SJ2MUeQSoLyuMkC__6dY';
export const createSupabase = () =>
  createClient(supabaseUrl, supabaseAnonKey, {
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
