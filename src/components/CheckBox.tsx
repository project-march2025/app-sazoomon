import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import CheckedIcon from '../assets/checkbox/checkbox-checked.svg';
import UncheckedIcon from '../assets/checkbox/checkbox-unchecked.svg';

interface CheckBoxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: number;
  disabled?: boolean;
  className?: string;
}

export default function CheckBox({
  checked,
  onChange,
  size = 24,
  disabled = false,
  className = '',
}: CheckBoxProps) {
  const handlePress = () => {
    if (disabled) {
      return;
    }

    onChange && onChange(!checked);
  };

  const Icon = checked ? CheckedIcon : UncheckedIcon;

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={disabled}
      className={`rounded bg-white flex items-center justify-center w-[${size}px] h-[${size}px] ${
        disabled ? 'opacity-50' : ''
      } ${className}`}
    >
      <Icon width={size} height={size} />
    </TouchableOpacity>
  );
}
