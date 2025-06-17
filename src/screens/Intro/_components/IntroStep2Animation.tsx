import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import backgroundDoorSource from '@/assets/bg-cut-door.png';
import guem from '@/assets/characters/ddeokaru/geum.png';
import hwa from '@/assets/characters/ddeokaru/hwa.png';
import mok from '@/assets/characters/ddeokaru/mok.png';
import su from '@/assets/characters/ddeokaru/su.png';
import to from '@/assets/characters/ddeokaru/to.png';
import Floating from '@/components/animation/Floating';
import SpeechBubble from '@/components/SpeechBubble';
import imgDobi from '@/assets/characters/dobi/dobi-with-pestle.png';
import imgDobiIdle from '@/assets/characters/dobi/dobi-idle.png';
import imgMortar from '@/assets/characters/dobi/mortar.png';
import { Text } from '@/components/Text';
import { SafeArea } from '@/components/SafeArea';
import { useNavigation } from '@react-navigation/native';

function IntroStep2Animation() {
  const navigation = useNavigation();

  const handleSkip = () => {
    navigation.navigate('MainTab' as never);
  };

  return (
    <ImageBackground
      source={backgroundDoorSource}
      style={StyleSheet.absoluteFill}
      blurRadius={10}
      resizeMode="cover"
    >
      <SafeArea>
        <TouchableOpacity
          className="flex justify-end items-end px-6"
          onPress={handleSkip}
          activeOpacity={0.7}
        >
          <Text className="text-white text-body-strong">건너뛰기</Text>
        </TouchableOpacity>
        <View className="flex-1 justify-center items-center">
          <View className="relative">
            <View className="flex-row gap-2">
              <Floating value={10} style={{ position: 'relative' }}>
                <Image className="w-20 h-20 absolute top-0 left-0" source={hwa} />
              </Floating>
              <Image className="w-20 h-20 absolute top-[-40px] left-[60px]" source={guem} />
              <Image className="w-20 h-20 absolute top-[-80px] left-[125px]" source={mok} />
              <Image className="w-20 h-20 absolute top-[-40px] right-[60px]" source={su} />
              <Image className="w-20 h-20 absolute top-0 right-0" source={to} />
            </View>

            <View className="flex flex-col w-full items-center">
              <Floating value={5} style={{ position: 'relative' }}>
                <Image
                  source={imgMortar}
                  className="w-20 h-20 absolute bottom-0 left-0 translate-x-1/2 translate-y-1/2"
                  resizeMode="contain"
                />
                <Image source={imgDobi} className="w-40 h-40 " resizeMode="contain" />
              </Floating>
              <SpeechBubble
                avatarImage={imgDobiIdle}
                name="의문의 도깨비불"
                highlightText="*"
                highlightStyle={{ color: '#FF0000' }}
              >
                {'운명다방에 온 걸 환영해!\n입장 전에 이용 규칙을 확인해줄래? \n(필수항목)*'}
              </SpeechBubble>
            </View>
          </View>
        </View>
      </SafeArea>
    </ImageBackground>
  );
}

export default IntroStep2Animation;
