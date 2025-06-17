import { Image, ImageBackground, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import backgroundSource from '@/assets/bg-cut.png';
import backgroundDoorSource from '@/assets/bg-cut-door.png';
import doorLeftSource from '@/assets/door-left.png';
import doorRightSource from '@/assets/door-right.png';

const DOOR_WIDTH = 97;

export default function Intro() {
  // 각 문에 대한 회전값
  const leftDoorRotation = useSharedValue(0);
  const rightDoorRotation = useSharedValue(0);
  const leftDoorScale = useSharedValue(1);
  const rightDoorScale = useSharedValue(1);

  // FadeIn용 opacity 값
  const blurOpacity = useSharedValue(0);

  useEffect(() => {
    // 1초 후에 문 열기 애니메이션 시작
    const timer = setTimeout(() => {
      // width(=scaleX)가 줄었다가 다시 커지면서 문이 열림
      leftDoorScale.value = withSequence(
        withTiming(0.7, { duration: 300 }),
        withTiming(1, { duration: 300 })
      );
      rightDoorScale.value = withSequence(
        withTiming(0.7, { duration: 300 }),
        withTiming(1, { duration: 300 })
      );
      // 문 열림
      leftDoorRotation.value = withTiming(-90, { duration: 1500 });
      rightDoorRotation.value = withTiming(90, { duration: 1500 });

      // 문 열림 애니메이션이 끝난 후(1.5초 후) Blur + FadeIn 시작
      setTimeout(() => {
        blurOpacity.value = withTiming(1, { duration: 800 });
      }, 1600);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 왼쪽 문 애니메이션 스타일
  const leftDoorStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { translateX: -DOOR_WIDTH / 2 },
      { rotateY: `${leftDoorRotation.value}deg` },
      { translateX: DOOR_WIDTH / 2 },
      // { scaleX: leftDoorScale.value }, // 필요시 추가
    ],
  }));

  // 오른쪽 문 애니메이션 스타일
  const rightDoorStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 800 },
      { translateX: DOOR_WIDTH / 2 },
      { rotateY: `${rightDoorRotation.value}deg` },
      { translateX: -DOOR_WIDTH / 2 },
      // { scaleX: rightDoorScale.value }, // 필요시 추가
    ],
  }));

  // BlurView의 FadeIn 스타일
  const blurStyle = useAnimatedStyle(() => ({
    opacity: blurOpacity.value,
  }));

  return (
    <ImageBackground source={backgroundSource} style={{ flex: 1 }} resizeMode="cover">
      <ImageBackground source={backgroundDoorSource} style={{ flex: 1 }} resizeMode="cover">
        {/* 왼쪽 문 */}
        <Animated.Image
          source={doorLeftSource}
          style={[
            {
              width: 97,
              height: 192,
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -60,
              marginLeft: -97,
            },
            leftDoorStyle,
          ]}
        />

        {/* 오른쪽 문 */}
        <Animated.Image
          source={doorRightSource}
          style={[
            {
              width: 97,
              height: 192,
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -60,
            },
            rightDoorStyle,
          ]}
        />

        {/* Blur + FadeIn 오버레이 */}
        <Animated.View
          style={[StyleSheet.absoluteFill, { zIndex: 10 }, blurStyle]}
          pointerEvents="none"
        >
          <ImageBackground
            source={backgroundDoorSource}
            style={StyleSheet.absoluteFill}
            blurRadius={10}
            resizeMode="cover"
          />
        </Animated.View>
      </ImageBackground>
    </ImageBackground>
  );
}
