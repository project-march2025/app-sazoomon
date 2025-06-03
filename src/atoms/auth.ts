import { atom } from 'jotai';
import type { Session } from '@supabase/supabase-js';

// 로그인 세션
export const sessionAtom = atom<Session | null>(null);
// 로딩 상태
export const authLoadingAtom = atom(true);
// 유저 캐릭터 생성 여부 등 프로필 정보
export const userProfileAtom = atom<any | null>(null);
// 앱 준비 완료 여부 (로딩 끝났고, 라우팅 결정 가능)
export const appReadyAtom = atom((get) => {
  return !get(authLoadingAtom);
});
