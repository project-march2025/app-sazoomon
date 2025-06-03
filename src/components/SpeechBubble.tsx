import React from 'react';
import { View, Text } from 'react-native';
import SvgIcon from './SvgIcon';

interface SpeechBubbleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SpeechBubble({ children, className = '' }: SpeechBubbleProps) {
  return (
    <>
      <View
        className={
          'bg-green10 rounded-3xl px-6 py-4 items-center justify-center shadow-lg ' + className
        }
        style={{
          shadowColor: '#EEEDFF',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 1,
          shadowRadius: 24,
          elevation: 8,
        }}
      >
        <Text className="text-black text-base font-normal text-center leading-tight">
          {children}
        </Text>
      </View>
      <View className="-mt-1">
        <SvgIcon name="Rectangle12" width={28} height={12} />
      </View>
    </>
  );
}
