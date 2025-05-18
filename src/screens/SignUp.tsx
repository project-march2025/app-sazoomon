import { createSupabase } from '@/lib/supabase';
import { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { login } from '@react-native-seoul/kakao-login';
import { User } from '@supabase/supabase-js';

export default function SignUp() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const handleKakaoLogin = async () => {
    console.log('handleKakaoLogin');
    try {
      setLoading(true);

      // 카카오 로그인
      const token = await login();
      // 사용자 프로필 정보 가져오기
      const supabase = createSupabase();
      const { data, error } = await supabase.auth.signInWithIdToken({
        token: token.idToken,
        provider: 'kakao',
      });
      if (data) {
        console.log('data', data);
        setUser(data.user);
      }
      if (error) {
        console.log('error', error);
        Alert.alert(error.message);
      }
    } catch (error) {
      console.log('kakao login error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <TouchableOpacity className="bg-yellow-500 px-4 py-2 rounded-md" onPress={handleKakaoLogin}>
        <Text className="text-black text-lg font-bold">카카오로 로그인하기</Text>
      </TouchableOpacity>
      {loading && <Text>Loading...</Text>}
      {user && <Text>{user.email}</Text>}
    </View>
  );
}
