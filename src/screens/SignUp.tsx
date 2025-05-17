import { createSupabase } from '@/lib/supabase';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { login, getProfile } from '@react-native-seoul/kakao-login';

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const handleKakaoLogin = async () => {
    console.log('handleKakaoLogin');
    try {
      setLoading(true);

      // 카카오 로그인
      const token = await login();
      console.log('token', token);
      // 사용자 프로필 정보 가져오기
      const profile = await getProfile();

      console.log('profile', profile);
      const supabase = createSupabase();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          queryParams: {
            access_token: token.accessToken,
          },
        },
      });
      if (data) {
        console.log('data', data);
      }
      if (error) {
        Alert.alert(error.message);
      }
      if (!data) {
        Alert.alert('Please check your inbox for email verification!');
      }

      console.log('kakao logindata', data);
    } catch (error) {
      console.log('kakao login error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
        <Text style={styles.kakaoButtonText}>카카오로 로그인하기</Text>
      </TouchableOpacity>
      {loading && <Text>Loading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  kakaoButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },
});
