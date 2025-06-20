import { useNavigation } from '@react-navigation/native';
import IntroSequence from './_components/IntroSequence';

export default function Intro() {
  const navigation = useNavigation();

  const handleFinish = () => {
    navigation.navigate('EnterInformation' as never);
  };

  return <IntroSequence onFinish={handleFinish} />;
}
