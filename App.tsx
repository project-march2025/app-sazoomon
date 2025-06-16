/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';

import './global.css';
import { AppNavigator } from './src/navigators/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// App.tsx 또는 초기화 파일 상단에 추가
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';

import { decode, encode } from 'base-64';
import { Provider } from 'jotai';
import { AuthProvider } from '@/providers/AuthProvider';
import { SplashScreen } from '@/components/SplashScreen';
import { StyleSheet, View } from 'react-native';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

export default function App(): React.JSX.Element {
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  return (
    <Provider>
      <AuthProvider>
        <SafeAreaProvider>
          <View style={styles.container}>
            <SplashScreen onFinish={() => setIsSplashFinished(true)} />
            {isSplashFinished && (
              <View style={styles.navigatorContainer}>
                <AppNavigator />
              </View>
            )}
          </View>
        </SafeAreaProvider>
      </AuthProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigatorContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
