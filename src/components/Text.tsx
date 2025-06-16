// src/components/common/Text.tsx
import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

interface TextProps extends RNTextProps {
  // 추가적인 props가 필요한 경우 여기에 정의
}

export const Text = ({ style, ...props }: TextProps) => {
  return (
    <RNText
      style={[
        {
          fontFamily: 'Eulyoo1945',
        },
        style,
      ]}
      {...props}
    />
  );
};
