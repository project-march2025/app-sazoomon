import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import BackgroundSrc from '@/assets/splash/splash-full.png';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const IMAGE_RATIO = 4320 / 1440;
const IMAGE_HEIGHT = SCREEN_WIDTH * IMAGE_RATIO;

export const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 정적 스플래시 제거
    RNBootSplash.hide({ fade: false });

    // 화면 하단에 땅이 오도록 이동할 거리 계산
    const moveDistance = SCREEN_HEIGHT - IMAGE_HEIGHT;

    // 애니메이션 실행
    Animated.timing(translateY, {
      toValue: moveDistance,
      delay: 400,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      onFinish(); // 애니메이션 완료 후 메인 앱으로 전환
    });
  }, [onFinish, translateY]);

  return (
    <View style={[styles.container, StyleSheet.absoluteFillObject]}>
      <Animated.Image
        // source={require('@/assets/splash-full.png')} // 세로로 긴 이미지 (하늘-땅 연결)
        source={BackgroundSrc}
        style={[styles.image, { transform: [{ translateY }] }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: SCREEN_WIDTH,
    height: IMAGE_HEIGHT,
  },
});
