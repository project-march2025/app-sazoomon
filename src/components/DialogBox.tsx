import React, { useEffect, useState } from 'react';
import { View, Image, ImageSourcePropType, TextStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { Text } from './Text';
import SvgIcon from './SvgIcon';

interface DialogBoxProps {
  children: string;
  className?: string;
  avatarImage: ImageSourcePropType;
  typingSpeed?: number;
  name: string;
  highlightText?: string;
  highlightStyle?: TextStyle;
  isNext?: boolean;
}

export default function DialogBox({
  children,
  className = '',
  avatarImage,
  typingSpeed = 50,
  name,
  highlightText,
  highlightStyle,
  isNext = false,
}: DialogBoxProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const textOpacity = useSharedValue(0);
  const bubbleScale = useSharedValue(0.8);

  useEffect(() => {
    const text = children || '';
    let currentIndex = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, typingSpeed);

    textOpacity.value = withSequence(
      withTiming(1, { duration: 300 }),
      withDelay(100, withTiming(1, { duration: 300 }))
    );
    bubbleScale.value = withTiming(1, { duration: 300 });

    return () => clearInterval(typingInterval);
  }, [children, typingSpeed, bubbleScale, textOpacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [{ scale: bubbleScale.value }],
    };
  });

  // 부분 스타일 적용 렌더링
  const renderStyledText = () => {
    if (!highlightText || !displayedText.includes(highlightText)) {
      return (
        <Text className="text-body text-black" style={{ fontFamily: 'Eulyoo1945' }}>
          {displayedText}
        </Text>
      );
    }
    const startIdx = displayedText.indexOf(highlightText);
    const endIdx = startIdx + highlightText.length;
    return (
      <Text className="text-body text-black">
        {displayedText.slice(0, startIdx)}
        <Text style={highlightStyle}>{displayedText.slice(startIdx, endIdx)}</Text>
        {displayedText.slice(endIdx)}
      </Text>
    );
  };

  return (
    <View
      className={`relative w-[327px] h-[120px] p-1 items-center justify-center border border-[#918491] bg-[#F1EBD8] ${className}`}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.16,
        shadowRadius: 0,
        elevation: 4,
      }}
    >
      <View className="flex-row items-center w-full h-full bg-[#F1EBD8] border border-[#ECDABB] p-3 gap-2">
        <Image source={avatarImage} className="w-16 h-16 rounded-full mr-2" resizeMode="cover" />
        <View className="flex-1 flex-col justify-center ">
          <Text
            className="text-[14px] leading-[20px] font-semibold text-[#463E53] text-left mb-0.5"
            style={{ fontFamily: 'Eulyoo1945' }}
          >
            {name}
          </Text>
          <Animated.View style={[{ width: '100%' }, animatedStyle]}>
            {renderStyledText()}
          </Animated.View>
          {isNext && isTypingComplete && (
            <View className="absolute bottom-0 right-0">
              <SvgIcon name="ChevronDown" />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
