import { cn } from '@/lib/utils/ShadcnUtil';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

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
  const colorStyle = type === 'primary' ? 'bg-mint100' : 'bg-white border border-black';
  const sizeStyle = size === 'm' ? 'h-12 px-4 py-3' : 'h-10 px-4 py-2';
  const disabledStyle = disabled ? 'bg-grey10 border-grey25' : '';
  const textStyle = type === 'primary' || type === 'secondary' ? 'text-black' : '';

  return (
    <TouchableOpacity
      className={cn(
        'flex-row items-center justify-center rounded-3xl my-1 w-full',
        colorStyle,
        sizeStyle,
        disabledStyle,
        className
      )}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <View className="flex-row items-center justify-center w-full">
        leftItem && <View className="mr-2">{leftItem}</View>
        <Text className={`font-bold text-[14px] ${textStyle}`}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}
