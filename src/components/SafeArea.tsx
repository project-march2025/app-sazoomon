import { SafeAreaView } from 'react-native-safe-area-context';
import { View, ViewStyle } from 'react-native';

interface SafeAreaProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const SafeArea = ({ children, style }: SafeAreaProps) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>{children}</SafeAreaView>
  );
};
