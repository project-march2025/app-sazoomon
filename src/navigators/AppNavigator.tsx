// AppNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OnboardingSetting from '@screens/OnboardingSetting';
import SignUp from '@screens/SignUp';
import MainTab from '@components/tab/MainTab';
import TermsAgreement from '@/screens/TermsAgreement';

import { AuthRouter } from './AuthRouter';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="AuthRouter" component={AuthRouter} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="TermsAgreement" component={TermsAgreement} />
        <Stack.Screen name="OnboardingSetting" component={OnboardingSetting} />
        <Stack.Screen name="MainTab" component={MainTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
