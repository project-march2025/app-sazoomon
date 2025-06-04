import { createSupabase } from '@/lib/supabase';
import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { getProfile, login } from '@react-native-seoul/kakao-login';
import NormalButton from '@/components/NormalButton';
import SvgIcon from '@/components/SvgIcon';
import kyubiSrc from '../../assets/img-kyubi.png';
import SpeechBubble from '@/components/SpeechBubble';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleKakaoLogin = async () => {
    try {
      setLoading(true);

      // 카카오 로그인
      const token = await login();
      const supabase = createSupabase();
      const { data, error } = await supabase.auth.signInWithIdToken({
        token: token.idToken,
        provider: 'kakao',
      });

      const session = data.session;
      const user = session?.user;

      if (!user) {
        console.error('세션 없음');
        return;
      }
      const profile = await getProfile();

      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (!existingProfile) {
        const month = profile.birthday.substring(0, 2);
        const day = profile.birthday.substring(2, 4);
        const birthDate = `${profile.birthyear}-${month}-${day}`;
        await supabase.from('profiles').insert([
          {
            id: user.id,
            email: profile.email,
            name: profile?.name,
            created_at: new Date().toISOString(),
            gender: profile?.gender,
            birthdate: birthDate,
          },
        ]);
        navigation.navigate('TermsAgreement' as never);
      } else {
        if (existingProfile.terms_agreed === null) {
          navigation.navigate('TermsAgreement' as never);
        } else if (!existingProfile.tableId) {
          navigation.navigate('OnboardingSetting' as never);
        } else {
          navigation.navigate('MainTab' as never);
        }
      }
    } catch (error) {
      console.error('kakao login error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-blue10 items-center justify-center px-6">
      <View className="w-full items-center mt-8 mb-10">
        {/* 큐비 일러스트 */}
        <View className="relative flex flex-col items-center">
          <SpeechBubble>사주몬에서{'\n'}영혼의 단짝을 찾아봐!</SpeechBubble>

          <Image source={kyubiSrc} className="w-40 h-40 mb-8" resizeMode="contain" />
          <View className="absolute bottom-0 left-12">
            <SvgIcon name="LogoSazoomon" width={80} height={80} />
          </View>
        </View>
      </View>

      {/* 버튼 영역 */}
      <View className="w-full">
        <NormalButton
          label="Apple로 시작하기"
          onPress={() => {}}
          className="bg-white mb-3"
          leftItem={<SvgIcon name="AppleIcon" />}
        />
        <NormalButton
          label="카카오로 시작하기"
          onPress={handleKakaoLogin}
          className="bg-yellow100"
          leftItem={<SvgIcon name="KakaoIcon" />}
          loading={loading}
        />
      </View>

      {/* 유저 정보/로딩 */}
      {loading && <Text className="mt-4 text-black">Loading...</Text>}
    </View>
  );
}
