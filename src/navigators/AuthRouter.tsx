import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { sessionAtom, userProfileAtom, authLoadingAtom, appReadyAtom } from '@/atoms/auth';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  SignUp: undefined;
  TermsAgreement: undefined;
  OnboardingSetting: undefined;
  MainTab: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AuthRouter = () => {
  const session = useAtomValue(sessionAtom);
  const profile = useAtomValue(userProfileAtom);
  const loading = useAtomValue(authLoadingAtom);
  const navigation = useNavigation<NavigationProp>();
  const appReady = useAtomValue(appReadyAtom);

  useEffect(() => {
    if (!appReady) {
      // 스플래시 이미지 표시
      return;
    }
    if (!session || !profile) {
      console.log('SignUp');
      navigation.reset({ index: 0, routes: [{ name: 'SignUp' }] });
    } else if (profile?.terms_agreed === null) {
      console.log('TermsAgreement');
      navigation.reset({ index: 0, routes: [{ name: 'TermsAgreement' }] });
    } else if (!profile?.tableId) {
      console.log('OnboardingSetting');
      navigation.reset({ index: 0, routes: [{ name: 'OnboardingSetting' }] });
    } else {
      console.log('MainTab');
      navigation.reset({ index: 0, routes: [{ name: 'MainTab' }] });
    }
  }, [session, profile, loading, appReady, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};
