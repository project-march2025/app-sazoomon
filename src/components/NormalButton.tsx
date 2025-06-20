import { cn } from '@/lib/utils/ShadcnUtil';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from './Text';

// 타입 정의
interface NormalButtonProps {
  label: string;
  type?: 'primary' | 'secondary';
  size?: 'm' | 's';
  disabled?: boolean;
  onPress?: () => void;
  className?: string;
  loading?: boolean;
  leftItem?: React.ReactNode;
}

export default function NormalButton({
  label,
  leftItem,
  type = 'primary',
  size = 'm',
  disabled = false,
  onPress,
  className = '',
  loading = false,
}: NormalButtonProps) {
  // Figma 기준 Tailwind 색상 토큰 적용
  const baseStyle = 'flex-row items-center justify-center my-1 w-full text-body-strong gap-2';

  // 사이즈별 패딩 (Figma 기준)
  const sizeStyle = size === 'm' ? 'h-12 px-4 py-3' : 'h-10 px-4 py-2';

  // 상태별 색상
  const colorStyle =
    type === 'primary'
      ? disabled
        ? 'bg-buttonPrimaryDisabledBg'
        : 'bg-buttonPrimaryBg'
      : disabled
      ? 'bg-buttonSecondaryDisabledBg'
      : 'bg-buttonSecondaryBg';

  // 텍스트 색상
  const textStyle =
    type === 'primary'
      ? disabled
        ? 'text-buttonPrimaryDisabledText'
        : 'text-buttonPrimaryText'
      : disabled
      ? 'text-buttonSecondaryDisabledText'
      : 'text-buttonSecondaryText';

  return (
    <TouchableOpacity
      className={cn(baseStyle, colorStyle, sizeStyle, className)}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center justify-center w-full gap-2">
        {leftItem ? <View className="mr-2">{leftItem}</View> : null}
        <Text className={cn('font-bold text-[14px]', textStyle)}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}
