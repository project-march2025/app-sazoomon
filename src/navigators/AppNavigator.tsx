// AppNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingSetting from '@screens/OnboardingSetting';
import SignUp from '@screens/SignUp';
import MainTab from '@components/tab/MainTab';
import TermsAgreement from '@/screens/TermsAgreement';

import { AuthRouter } from './AuthRouter';
import Intro from '@/screens/Intro/IntroScreen';
import { DevNavigationButton } from '@/components/DevNavigationButton';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="AuthRouter" component={AuthRouter} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="TermsAgreement" component={TermsAgreement} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="OnboardingSetting" component={OnboardingSetting} />
        <Stack.Screen name="MainTab" component={MainTab} />
      </Stack.Navigator>

      <DevNavigationButton />
    </NavigationContainer>
  );
};
