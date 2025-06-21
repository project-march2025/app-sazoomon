import ButtonS from '@/assets/components/buttons/game-ui-s.svg';
import ButtonDisabledS from '@/assets/components/buttons/game-ui-s-disabled.svg';

import { TouchableOpacity, View } from 'react-native';
import { cn } from '@/lib/utils/ShadcnUtil';
import SvgIcon, { SvgIconProps } from './SvgIcon';

interface IconButtonProps {
  icon?: SvgIconProps['name'];

  disabled?: boolean;
  onPress?: () => void;
  className?: string;
}
export default function IconButton({
  icon,

  disabled = false,
  onPress,
  className = '',
}: IconButtonProps) {
  const getBgSvg = () => {
    return disabled ? ButtonDisabledS : ButtonS;
  };
  const BgSvg = getBgSvg();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={cn(
        'relative w-full items-center justify-center overflow-hidden',
        'h-10 w-10',
        className
      )}
      activeOpacity={0.8}
    >
      {/* SVG 배경 */}
      <View className="absolute inset-0 w-full h-full">
        <BgSvg width="100%" height="100%" preserveAspectRatio="none" />
      </View>
      <View className="flex-row items-center justify-center w-full gap-2">
        {icon && <SvgIcon name={icon} size={24} />}
      </View>
    </TouchableOpacity>
  );
}
