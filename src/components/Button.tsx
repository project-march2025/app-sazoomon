import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { cn } from '@/lib/utils/ShadcnUtil'; // 필요시
import PrimaryButtonM from '@/assets/components/buttons/primary-m.svg';
import PrimaryButtonS from '@/assets/components/buttons/primary-s.svg';
import PrimaryButtonDisabledM from '@/assets/components/buttons/primary-m-disabled.svg';
import PrimaryButtonDisabledS from '@/assets/components/buttons/primary-s-disabled.svg';
import SecondaryButtonM from '@/assets/components/buttons/secondary-m.svg';
import SecondaryButtonS from '@/assets/components/buttons/secondary-s.svg';
import SecondaryButtonDisabledM from '@/assets/components/buttons/secondary-m-disabled.svg';
import SecondaryButtonDisabledS from '@/assets/components/buttons/secondary-s-disabled.svg';
import { Text } from '@/components/Text';

interface ButtonProps {
  type?: 'primary' | 'secondary';
  size?: 'm' | 's';
  label: string;
  disabled?: boolean;
  onPress?: () => void;
  className?: string;
  leftItem?: React.ReactNode;
}

export function Button({
  type = 'primary',
  size = 'm',
  label,
  disabled = false,
  onPress,
  className = '',
  leftItem,
}: ButtonProps) {
  const getBgSvg = () => {
    if (type === 'primary') {
      if (size === 'm') {
        return disabled ? PrimaryButtonDisabledM : PrimaryButtonM;
      } else {
        return disabled ? PrimaryButtonDisabledS : PrimaryButtonS;
      }
    } else {
      if (size === 'm') {
        return disabled ? SecondaryButtonDisabledM : SecondaryButtonM;
      } else {
        return disabled ? SecondaryButtonDisabledS : SecondaryButtonS;
      }
    }
  };
  const BgSvg = getBgSvg();
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
      onPress={onPress}
      disabled={disabled}
      className={cn(
        'relative w-full  items-center justify-center overflow-hidden',
        size === 'm' ? 'h-12' : 'h-10',
        className
      )}
      activeOpacity={0.8}
    >
      {/* SVG 배경 */}
      <View className="absolute inset-0 w-full h-full">
        <BgSvg width="100%" height="100%" preserveAspectRatio="none" />
      </View>
      <View className="flex-row items-center justify-center w-full gap-2">
        {leftItem ? <View className="mr-2">{leftItem}</View> : null}
        <Text className={cn('text-body-strong', textStyle)}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}
