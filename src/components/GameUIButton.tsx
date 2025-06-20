import ButtonS from '@/assets/components/buttons/game-ui-s.svg';
import ButtonM from '@/assets/components/buttons/game-ui-m.svg';
import ButtonDisabledS from '@/assets/components/buttons/game-ui-s-disabled.svg';
import ButtonDisabledM from '@/assets/components/buttons/game-ui-m-disabled.svg';

import { TouchableOpacity, View } from 'react-native';
import { Text } from './Text';
import { cn } from '@/lib/utils/ShadcnUtil';
import SvgIcon from './SvgIcon';

interface GameUIButton {
  label: string;
  icon?: React.ReactNode;
  size?: 'm' | 's';
  disabled?: boolean;
  onPress?: () => void;
  className?: string;
}
export default function GameUIButton({
  label,
  icon,
  size = 'm',
  disabled = false,
  onPress,
  className = '',
}: ButtonProps) {
  const getBgSvg = () => {
    if (size === 'm') {
      return disabled ? ButtonDisabledM : ButtonM;
    } else {
      return disabled ? ButtonDisabledS : ButtonS;
    }
  };
  const BgSvg = getBgSvg();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={cn(
        'relative w-full  items-center justify-center overflow-hidden',
        size === 'm' ? 'h-12 w-[98px]' : 'h-10 w-[90px]',
        className
      )}
      activeOpacity={0.8}
    >
      {/* SVG 배경 */}
      <View className="absolute inset-0 w-full h-full">
        <BgSvg width="100%" height="100%" preserveAspectRatio="none" />
      </View>
      <View className="flex-row items-center justify-center w-full gap-2">
        <SvgIcon name={icon} />
        {label && <Text className={cn('text-body-strong')}>{label}</Text>}
      </View>
    </TouchableOpacity>
  );
}
