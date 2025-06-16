import { Image, View, TouchableOpacity, Modal, Platform, ImageBackground } from 'react-native';
import { Text } from '@/components/Text';

import { useNavigation } from '@react-navigation/native';
import SpeechBubble from '@/components/SpeechBubble';

import CheckBox from '@/components/CheckBox';
import { useCallback, useState } from 'react';
import WebView from 'react-native-webview';
import privacyPolicy from '@/webview/privacyPolicy.html';
import termsOfService from '@/webview/termsOfService.html';
import { updateConsentTermsAndMarketing } from '@/lib/api/profile';
import { useAtom } from 'jotai';
import { userProfileAtom } from '@/atoms/auth';
import introBackground from '../../assets/intro-background.png';
import imgDobiIdle from '../../assets/img-dobi-idle.png';
import Floating from '@/components/animation/Floating';
import { requestNotifications } from 'react-native-permissions';
import { Button } from '@/components/Button';

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
    <ImageBackground source={introBackground} className="flex-1" resizeMode="cover">
      <View className="w-full items-center mt-8  p-6 mb-6">
        <View className="flex justify-start  w-full">
          <View className="w-11 h-11 bg-purple-500" />
        </View>
        {/* 큐비 일러스트 */}
        <View className="relative flex flex-col items-center h-64 py-6">
          <Floating value={5}>
            <Image source={imgDobiIdle} className="w-40 h-40 " resizeMode="contain" />
          </Floating>
          <SpeechBubble
            className="absolute bottom-0"
            avatarImage={imgDobiIdle}
            name="의문의 도깨비불"
            highlightText="*"
            highlightStyle={{ color: '#FF0000' }}
          >
            {'운명다방에 온 걸 환영해!\n입장 전에 이용 규칙을 확인해줄래? \n(필수항목)*'}
          </SpeechBubble>
        </View>
      </View>

      {/* 버튼 영역 */}
      <View className="w-full bg-white p-6">
        {/* 개인정보 취급방침 */}
        <View className="flex-row items-center justify-between mb-3 px-4 py-[14px] ">
          <View className="flex-row items-center">
            <CheckBox checked={privacyAgreed} onChange={handlePrivacyAgreed} />
            <Text className="ml-2 text-body-strong text-black">
              개인정보 취급방침
              <Text className="text-red100">*</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => showTerms('privacy')}>
            <Text className="text-grey50 text-caption underline">자세히보기</Text>
          </TouchableOpacity>
        </View>

        {/* 서비스 이용약관 */}
        <View className="flex-row items-center justify-between mb-3 px-4 py-[14px] ">
          <View className="flex-row items-center">
            <CheckBox checked={termsAgreed} onChange={handleTermsAgreed} />
            <Text className="ml-2 text-body-strong text-black">
              서비스 이용약관
              <Text className="text-red100">*</Text>
            </Text>
          </View>
          <TouchableOpacity onPress={() => showTerms('terms')}>
            <Text className="text-grey50 text-caption underline">자세히보기</Text>
          </TouchableOpacity>
        </View>

        {/* 마케팅 정보 수신 동의 */}
        <View className="flex-row items-center justify-between mb-3 px-4 py-[14px] ">
          <View className="flex-row items-center">
            <CheckBox checked={marketingAgreed} onChange={handleMarketingAgreed} />
            <Text className="ml-2 text-body-strong text-black">마케팅 정보 수신 동의</Text>
          </View>
        </View>

        <View className="flex flex-col gap-3">
          <Button label="전체 동의하고 진행하기" onPress={handleAllAgreedAndRoute} />

          <Button
            label="다음"
            disabled={!isAllAgreed}
            onPress={() => handleComplete({ marketingAgreed, termsAgreed })}
          />
        </View>
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
    </ImageBackground>
  );
}
