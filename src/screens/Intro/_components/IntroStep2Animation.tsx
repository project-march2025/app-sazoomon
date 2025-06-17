import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import backgroundDoorSource from '@/assets/bg-cut-door.png';
import guem from '@/assets/characters/ddeokaru/geum.png';
import hwa from '@/assets/characters/ddeokaru/hwa.png';
import mok from '@/assets/characters/ddeokaru/mok.png';
import su from '@/assets/characters/ddeokaru/su.png';
import to from '@/assets/characters/ddeokaru/to.png';
import Floating from '@/components/animation/Floating';
import imgDobi from '@/assets/characters/dobi/dobi-with-pestle.png';
import imgDobiIdle from '@/assets/characters/dobi/dobi-idle.png';
import imgMortar from '@/assets/characters/dobi/mortar.png';
import { Text } from '@/components/Text';
import { SafeArea } from '@/components/SafeArea';
import { DialogSequence } from '@/components/DialogSequence';

const DIALOG_LIST = [
  {
    name: '의문의 도깨비불',
    avatarImage: imgDobiIdle,
    dialog: '히히! 드디어 왔구나?',
  },
  {
    name: '의문의 도깨비불',
    avatarImage: imgDobiIdle,
    dialog: '내 소개가 늦었지?',
  },
  {
    name: '도비',
    avatarImage: imgDobiIdle,
    dialog: '나는 이곳에서 수백 년간 사람들의 일상 속 소소한 행복을 모아온 떡방아 도깨비불 도비야!',
  },
  {
    name: '도비',
    avatarImage: imgDobiIdle,
    dialog: '사람들의 행복한 순간순간이 모이면 잠든 운명의 친구를 깨울 수 있는 힘이 된다구~',
  },
  {
    name: '도비',
    avatarImage: imgDobiIdle,
    dialog: '오늘은 네가 태어나던 그 순간부터 함께 존재해온 또 다른 네가 너를 여기로 이끌었어.',
  },
  {
    name: '도비',
    avatarImage: imgDobiIdle,
    dialog:
      '오늘 밤은 특별한 날이 될거야! 평생 너와 함께였지만 만나지 못했던 진짜 친구를 깨워줄게.',
  },
];

function IntroStep2Animation({ onFinish }: { onFinish: () => void }) {
  const handleSkip = () => {
    onFinish();
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
              <DialogSequence dialogList={DIALOG_LIST} onComplete={handleSkip} />
            </View>
          </View>
        </View>
      </SafeArea>
    </ImageBackground>
  );
}

export default IntroStep2Animation;
