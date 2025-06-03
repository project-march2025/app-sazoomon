// providers/AuthProvider.tsx
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useSetAtom } from 'jotai';
import { sessionAtom, authLoadingAtom, userProfileAtom } from '@/atoms/auth';
import { fetchUserProfile } from '@/lib/api/profile';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setSession = useSetAtom(sessionAtom);
  const setLoading = useSetAtom(authLoadingAtom);
  const setUserProfile = useSetAtom(userProfileAtom);

  /** ✅ 최초 앱 시작 시 세션 및 유저 프로필 복구 */
  useEffect(() => {
    const restoreSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      setSession(session);
      if (session) {
        const profile = await fetchUserProfile(session.user.id);
        setUserProfile(profile);
      }

      setLoading(false);
    };

    restoreSession();
  }, [setSession, setUserProfile, setLoading]);

  /** ✅ 로그인/로그아웃 등의 인증 상태 변화 처리 */
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);

      if (session) {
        const profile = await fetchUserProfile(session.user.id);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [setSession, setUserProfile]);

  return children;
};
