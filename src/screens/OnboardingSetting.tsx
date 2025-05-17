import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingSetting() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>OnboardingSetting</Text>
      <Button title="Go to MainTab" onPress={() => navigation.replace('MainTab')} />
    </View>
  );
}
