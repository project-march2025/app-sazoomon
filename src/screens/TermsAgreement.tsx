import { Image, Text, View, TouchableOpacity, Modal, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SpeechBubble from '@/components/SpeechBubble';
import SvgIcon from '@/components/SvgIcon';
import NormalButton from '@/components/NormalButton';
import CheckBox from '@/components/CheckBox';
import { useCallback, useState } from 'react';
import WebView from 'react-native-webview';
import kyubiSrc from '../../assets/img-kyubi.png';
import privacyPolicy from '@/webview/privacyPolicy.html';
import termsOfService from '@/webview/termsOfService.html';
import { updateConsentTermsAndMarketing } from '@/lib/api/profile';
import { useAtom } from 'jotai';
import { userProfileAtom } from '@/atoms/auth';

import { requestNotifications } from 'react-native-permissions';

export default function TermsAgreement() {
  const navigation = useNavigation();
  const [profile, setProfile] = useAtom(userProfileAtom);

  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [marketingAgreed, setMarketingAgreed] = useState(false);
  const [selectedTerms, setSelectedTerms] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isAllAgreed = termsAgreed && privacyAgreed;

  const handleTermsAgreed = () => {
    setTermsAgreed(!termsAgreed);
  };

  const handlePrivacyAgreed = () => {
    setPrivacyAgreed(!privacyAgreed);
  };

  const handleMarketingAgreed = () => {
    setMarketingAgreed((prev) => !prev);
    requestNotifications(['alert', 'badge', 'sound']).then((res) => {
      console.log(res);
    });
  };

  const handleAllAgreedAndRoute = () => {
    setPrivacyAgreed(true);
    setTermsAgreed(true);
    setMarketingAgreed(true);
    handleComplete({
      marketingAgreed: true,
      termsAgreed: true,
    });
  };

  const showTerms = (type: string) => {
    setSelectedTerms(type);
    setIsModalVisible(true);
  };

  const handleComplete = useCallback(
    async ({
      marketingAgreed,
      termsAgreed,
    }: {
      marketingAgreed: boolean;
      termsAgreed: boolean;
    }) => {
      const res = await updateConsentTermsAndMarketing({
        channel: 'push',
        channelConsent: marketingAgreed,
        termsAgreed: termsAgreed,
      });

      if (res.success) {
        setProfile({ ...profile, terms_agreed: termsAgreed });

        navigation.navigate('OnboardingSetting' as never);
      }
    },
    [navigation, profile, setProfile]
  );

  const getTermsSource = (type: string) => {
    const isAndroid = Platform.OS === 'android';
    if (type === 'privacy') {
      return isAndroid ? 'file:///android_asset/privacyPolicy.html' : privacyPolicy;
    } else if (type === 'terms') {
      return isAndroid ? 'file:///android_asset/termsOfService.html' : termsOfService;
    }
  };
  return (
    <View className="flex-1 bg-blue10 items-center justify-center px-6">
      <View className="w-full items-center mt-8 mb-10">
        {/* 큐비 일러스트 */}
        <View className="relative flex flex-col items-center">
          <SpeechBubble>
            사주몬을 이용하려면 아래 약관을 잘 읽어보고{'\n'}체크박스를 눌러 동의해주세요!
          </SpeechBubble>

          <Image source={kyubiSrc} className="w-40 h-40 mb-8" resizeMode="contain" />
          <View className="absolute bottom-0 left-12">
            <SvgIcon name="LogoSazoomon" width={80} height={80} />
          </View>
        </View>
      </View>

      {/* 버튼 영역 */}
      <View className="w-full">
        <View className="flex-row items-center justify-between mb-2 bg-white px-4 py-3 rounded-3xl">
          <View className="flex-row items-center">
            <CheckBox checked={privacyAgreed} onChange={handlePrivacyAgreed} />
            <Text className="ml-2 text-black text-sm">
              개인정보 취급방침
              <Text className="text-red100">*</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => showTerms('privacy')} className="ml-2">
            <Text className="text-grey50 text-sm underline">약관확인</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between mb-2 bg-white px-4 py-3 rounded-3xl">
          <View className="flex-row items-center">
            <CheckBox checked={termsAgreed} onChange={handleTermsAgreed} />
            <Text className="ml-2 text-black text-sm">
              서비스 이용약관
              <Text className="text-red100">*</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => showTerms('terms')} className="ml-2">
            <Text className="text-grey50 text-sm underline">약관확인</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between mb-2 bg-white px-4 py-3 rounded-3xl">
          <View className="flex-row items-center">
            <CheckBox checked={marketingAgreed} onChange={handleMarketingAgreed} />
            <Text className="ml-2 text-black text-sm">마케팅 정보 수신 동의</Text>
          </View>
        </View>

        <NormalButton label="전체 동의하고 진행하기" onPress={handleAllAgreedAndRoute} />
        <NormalButton
          label="다음"
          disabled={!isAllAgreed}
          onPress={() => handleComplete({ marketingAgreed, termsAgreed })}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 bg-white m-4 rounded-3xl">
          <View className="flex-row justify-between p-4 border-b border-gray-200">
            <Text className="text-lg font-bold">개인정보 취급방침</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text className="text-blue-500">닫기</Text>
            </TouchableOpacity>
          </View>
          <WebView source={getTermsSource(selectedTerms)} style={{ flex: 1 }} />
        </View>
      </Modal>
    </View>
  );
}
