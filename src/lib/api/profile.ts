import { supabase } from '../supabase';

/** ✅ Supabase에서 유저 프로필을 가져오는 함수 */
export const fetchUserProfile = async (userId: string) => {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  return data;
};

interface ConsentAndTermsPayload {
  channel: string;
  channelConsent: boolean;
  termsAgreed: boolean;
}
/** ✅ 약관동의페이지에서 마케팅 수신 동의와 약관 동의를 업데이트하는 함수 */
export const updateConsentTermsAndMarketing = async ({
  channel,
  channelConsent,
  termsAgreed,
}: ConsentAndTermsPayload) => {
  const session = await supabase.auth.getSession();
  const user_id = session.data.session?.user.id;

  if (!user_id) {
    throw new Error('로그인 정보가 없습니다.');
  }

  const now = new Date().toISOString();

  // 1. 마케팅 수신 동의 upsert
  const consentFields = {
    user_id,
    channel,
    consent: channelConsent,
    updated_at: now,
    consented_at: channelConsent ? now : null,
    withdrawn_at: channelConsent ? null : now,
    source: 'termsPage',
  };

  const { error: consentError } = await supabase
    .from('marketing_channel_consent')
    .upsert([consentFields], { onConflict: 'user_id,channel' })
    .select();

  if (consentError) {
    console.error('❌ Consent update failed', consentError);
    throw consentError;
  }

  // 2. profile 테이블의 terms_agreed 업데이트
  const {
    data: profileData,
    error: profileError,
    status: profileStatus,
  } = await supabase
    .from('profiles')
    .update({ terms_agreed: termsAgreed })
    .eq('id', user_id)
    .select();
  console.log('profileData', profileData);
  if (profileError) {
    console.error('❌ Terms agreement update failed', profileError);
    throw profileError;
  }

  if (profileStatus === 200) {
    return { success: true };
  } else {
    return { success: false };
  }
};
