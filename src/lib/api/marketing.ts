// services/updateConsent.ts

import { supabase } from '../supabase';

interface UpdateConsentParams {
  channel: string;
  consent: boolean;
}

// services/updateConsent.ts

interface UpdateConsentParams {
  channel: string;
  consent: boolean;
}

export const updateMarketingConsent = async ({ channel, consent }: UpdateConsentParams) => {
  const session = await supabase.auth.getSession();
  const user_id = session.data.session?.user.id;

  if (!user_id) {
    throw new Error('로그인 정보가 없습니다.');
  }

  const now = new Date().toISOString();

  const updateFields: any = {
    user_id,
    channel,
    consent,
    updated_at: now,
    consented_at: consent ? now : null,
    withdrawn_at: consent ? null : now,
  };

  const { data, error } = await supabase
    .from('marketing_channel_consent')
    .upsert(updateFields, { onConflict: ['user_id', 'channel'] })
    .select();

  if (error) {
    console.error('❌ Error in updateMarketingConsent:', error);
    throw error;
  }

  return data;
};
