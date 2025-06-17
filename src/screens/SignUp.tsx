import { createSupabase } from '@/lib/supabase';
import { useState } from 'react';
import { View, ImageBackground, Image } from 'react-native';
import { getProfile, login } from '@react-native-seoul/kakao-login';
import NormalButton from '@/components/NormalButton';
import SvgIcon from '@/components/SvgIcon';
import imgDobiIdle from '../../assets/img-dobi-idle.png';
import { useNavigation } from '@react-navigation/native';
import introBackground from '../../assets/intro-background.png';
import DialogBox from '@/components/DialogBox';
import Floating from '@/components/animation/Floating';
import FadeIn from '@/components/animation/FadeIn';
import { Text } from '@/components/Text';
import { SafeArea } from '@/components/SafeArea';

export default function SignUp() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleKakaoLogin = async () => {
    try {
      setLoading(true);
      // 카카오 로그인
      const token = await login();
      const supabase = createSupabase();
      const { data } = await supabase.auth.signInWithIdToken({
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
    <ImageBackground source={introBackground} className="flex-1" resizeMode="cover">
      <SafeArea>
        <FadeIn duration={1200}>
          <Text className="text-white text-center text-base font-normal leading-tight mt-20">
            오늘 밤, 운명의 문이 열립니다
          </Text>
        </FadeIn>
        <View className="flex-1 justify-center items-center px-6">
          <View className="flex flex-col items-center">
            <View className="justify-center items-center ">
              <Floating value={5}>
                <Image source={imgDobiIdle} className="w-40 h-40" resizeMode="contain" />
              </Floating>
            </View>
            <DialogBox avatarImage={imgDobiIdle} name="의문의 도깨비불">
              처음 온 사람은 방명록에 서명해줘!
            </DialogBox>
          </View>
          {/* 버튼 영역을 하단에서 24px 위에 고정 */}
          <View className="w-full absolute bottom-6 px-6">
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
        </View>
      </SafeArea>
    </ImageBackground>
  );
}
