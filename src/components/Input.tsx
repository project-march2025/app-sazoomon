import { forwardRef, useState } from 'react';
import { TextInput, View, Text, TextInputProps, TouchableOpacity } from 'react-native';

import { cn } from '@/lib/utils/ShadcnUtil';
import InputDefault from '@/assets/components/inputs/input-default-m.svg';
import InputFocused from '@/assets/components/inputs/input-focused-m.svg';
import InputError from '@/assets/components/inputs/input-error-m.svg';
import InputDisabled from '@/assets/components/inputs/input-disabled-m.svg';
import SvgIcon from './SvgIcon';

interface InputProps extends TextInputProps {
  label?: string;
  error?: boolean;
  disabled?: boolean;
  containerClassName?: string;
  placeholder?: string;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      disabled,
      className,
      containerClassName,
      onFocus,
      onBlur,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('');
    const getBgSvg = () => {
      if (disabled) {
        return InputDisabled;
      }
      if (error) {
        return InputError;
      }
      if (isFocused) {
        return InputFocused;
      }
      return InputDefault;
    };

    const BgSvg = getBgSvg();

    const handleClear = () => {
      setValue('');
    };

    return (
      <View className={cn('w-full', containerClassName)}>
        {label && <Text className="text-gray-700 text-sm font-bold mb-2">{label}</Text>}
        <View className="relative w-full h-14">
          <View className="absolute inset-0 w-full h-full">
            <BgSvg width="100%" height="100%" preserveAspectRatio="none" />
          </View>
          <TextInput
            ref={ref}
            value={value}
            onChangeText={setValue}
            className={cn(
              'w-full h-full px-4 text-base text-black',
              { 'text-gray-500': disabled },
              className
            )}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            editable={!disabled}
            placeholderTextColor="#A0A0A0"
            placeholder={placeholder}
            {...props}
          />
        </View>
        <TouchableOpacity className="absolute right-3 top-3" onPress={handleClear}>
          <SvgIcon name="CloseCircle" size={24} />
        </TouchableOpacity>
      </View>
    );
  }
);

Input.displayName = 'Input';

export default Input;
